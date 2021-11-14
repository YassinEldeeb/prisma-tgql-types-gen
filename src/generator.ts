import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import fs from 'fs'
import path from 'path'
import { GENERATOR_NAME } from './constants'
import { INDEX_TEMPLATE } from './templates'
import { DECORATOR_TEMPLATE } from './templates/decorator'
import { FIELD_TEMPLATE } from './templates/field'
import { IMPORT_TEMPLATE } from './templates/import'
import { MODEL_TEMPLATE } from './templates/model'
import { convertType } from './utils/convertType'
import { ExtractFieldsModifications } from './utils/extractFieldsModifications'
import { HideOrPrivate } from './utils/hideOrPrivate'
import { mkdir } from './utils/mkdir'
import { modulesThatIsUsed } from './utils/modulesThatIsUsed'
import { objToString } from './utils/objectToString'
import { spawn } from 'child_process'
import { ENUM_TEMPLATE } from './templates/enum'
import { replaceAll } from './utils/replaceAll'
import { restoreClassChanges } from './utils/restoreClassChanges'
import { restoreImportsChanges } from './utils/restoreImportsSection'
import { restoreDecoratorObjects } from './utils/restoreDecoratorObjects'

const defaultModelsOutput = path.join(process.cwd(), './src/generated/models')
const defaultEnumsOutput = path.join(process.cwd(), './src/generated/enums')

const installPackage = (useYarn: string, pkgName: string) => {
  const packageManager = useYarn ? 'yarn add' : 'npm i'

  const hasGraphQLScalars = fs
    .readFileSync(path.join(process.cwd(), './package.json'), 'utf-8')
    .includes(`"${pkgName}"`)

  if (hasGraphQLScalars) return

  logger.info(`${GENERATOR_NAME}:Installing ${pkgName}`)
  spawn(`${packageManager} ${pkgName}`, [], {
    shell: true,
    stdio: 'inherit',
  })
}

generatorHandler({
  onManifest: () => ({
    defaultOutput: '../src/generated/models',
    prettyName: GENERATOR_NAME,
    requiresGenerators: ['prisma-client-js'],
  }),
  onGenerate: async (options: GeneratorOptions) => {
    const extractedData = ExtractFieldsModifications(options.datamodel)

    const modelsWriteLocation =
      options.generator.config.modelsOutput || defaultModelsOutput
    const enumWriteLocation =
      options.generator.config.enumsOutput || defaultEnumsOutput

    // ?Models
    options.dmmf.datamodel.models.map((model) => {
      const fileName = model.name + '.ts'

      const writeLocation = path.join(modelsWriteLocation, fileName)

      const allFields: { field: string; type: string }[] = []

      model.fields.map((field) => {
        const optionalCondition = !field.isRequired
        const fieldName = `${field.name}${optionalCondition ? '?' : ''}`
        const fieldType = `${convertType(field.type)!}${
          field.isList ? '[]' : ''
        }`
        allFields.push({ field: fieldName, type: fieldType })
      })

      const decoratorObjects = restoreDecoratorObjects(
        writeLocation,
        allFields.map((e) => ({
          field: e.field.replace('?', ''),
          type: e.type,
        }))
      )

      const formattedFields = model.fields.map((field, index) => {
        const { isHide, isPrivate } = HideOrPrivate(
          extractedData,
          field.name,
          model.name
        )

        if (isHide) return { hide: true, type: field.type }

        const fieldType = `${convertType(field.type)!}${
          field.isList ? '[]' : ''
        }`
        const decoratorType = () => {
          // Special Cases
          const type = (type: string) => `(_type) => ${type}`
          const getEquavilentType = () => {
            if (field.isId) {
              return 'ID'
            } else if (convertType(field.type) === 'Prisma.JsonValue') {
              return 'GraphQLScalars.JSONResolver'
            } else if (convertType(field.type) === 'Buffer') {
              return 'GraphQLScalars.ByteResolver'
            } else {
              return field.type
            }
          }

          const typeGraphQLType = getEquavilentType()

          if (field.isList) {
            return type(`[${typeGraphQLType}]`)
          } else if (field.kind === 'object' && !field.isList) {
            return type(field.type)
          }

          if (
            typeGraphQLType.length === 0 ||
            (field.kind === 'scalar' && !field.isId)
          ) {
            return ''
          }

          return type(typeGraphQLType)
        }

        const optionalCondition = !field.isRequired
        const fieldName = `${field.name}${optionalCondition ? '?' : ''}`

        const decoratorObject = () => {
          let object: any = {}

          const editedOptions = decoratorObjects?.find(
            (e) => e.field === fieldName.replace('?', '')
          )

          if (editedOptions) {
            // Remove undefined keys
            Object.keys(editedOptions.decorator).forEach(
              (key) =>
                editedOptions.decorator[key] === undefined &&
                delete editedOptions.decorator[key]
            )
          }

          if (
            editedOptions &&
            Object.keys(editedOptions?.decorator || {}).length > 0
          ) {
            const value = editedOptions.decorator

            object = { ...object, ...value }
          }

          if (optionalCondition || isPrivate) {
            object.nullable = true
          } else {
            object.nullable = undefined
          }

          // Remove undefined keys
          Object.keys(object).forEach(
            (key) => object[key] === undefined && delete object[key]
          )

          if (Object.keys(object).length === 0) {
            return undefined
          }

          // console.log(object, objToString(object))
          return objToString(object)
        }

        const Decorator = DECORATOR_TEMPLATE(decoratorType(), decoratorObject())
        const Field = FIELD_TEMPLATE(Decorator, '\n  ' + fieldName, fieldType)

        return Field
      })

      const hidden = formattedFields.filter((e) => {
        if (typeof e !== 'string') return true
        else return false
      })

      const fields = formattedFields.filter((e) => {
        if (typeof e !== 'string') return false
        else return true
      })

      const dependsOn = modulesThatIsUsed(
        options.dmmf.datamodel.models,
        model.name
      )

      let imports: string[] = []

      // Import TypeGraphQL Stuff
      imports.push(IMPORT_TEMPLATE(`{ Field, ID, ObjectType }`, `type-graphql`))

      imports = [
        ...imports,
        ...(dependsOn
          .map(({ kind, name }) => {
            if (!hidden.find((e: any) => e.type === name)) {
              if (kind === 'object') {
                return IMPORT_TEMPLATE(`{ ${name} }`, `./${name}`)
              } else if (kind === 'enum') {
                const relativePathToEnums = replaceAll(
                  path.relative(
                    path.join(process.cwd(), modelsWriteLocation),
                    path.join(process.cwd(), enumWriteLocation)
                  ),
                  '\\',
                  '/'
                )
                return IMPORT_TEMPLATE(
                  `{ ${name} }`,
                  `${relativePathToEnums}/${name}`
                )
              }
            } else {
              return 'remove'
            }
          })
          .filter((e) => e !== 'remove') as string[]),
      ]

      if (fields.join('\n').includes('Prisma.')) {
        imports.push(IMPORT_TEMPLATE(`{ Prisma }`, `@prisma/client`))
      }

      // Install needed Packages
      if (fields.join('\n').includes('GraphQLScalars.')) {
        installPackage(options.generator.config.useYarn, 'graphql-scalars')
        imports.push(IMPORT_TEMPLATE(`GraphQLScalars`, `graphql-scalars`))
      }

      const classChanges = restoreClassChanges(writeLocation)
      const importsChanges = restoreImportsChanges(writeLocation)

      if (!importsChanges) {
        imports.push(`\n@ObjectType()`)
      }

      const actualImportsThatChanged = importsChanges
        ?.split('\n')
        .filter((e) => {
          return e.includes('import ') || e.includes('require(')
        })

      const otherCodeThatChanged = importsChanges
        ? '\n' +
          importsChanges
            ?.split('\n')
            .filter((e) => {
              return !e.includes('import ') && !e.includes('require(')
            })
            .join('\n')
        : ''

      let mergedImports = !importsChanges
        ? imports
        : [...new Set([...actualImportsThatChanged!, ...imports])]

      // Add empty line between imports and code
      const codeSplitted = (
        mergedImports.join('\n') + otherCodeThatChanged
      ).split('\n')

      const ObjectTypeIndex = codeSplitted.findIndex((e) =>
        e.includes('@ObjectType')
      )

      if (codeSplitted[ObjectTypeIndex - 1].length !== 0) {
        if (otherCodeThatChanged.length) {
          mergedImports.push('')
        }
      }

      const classes = MODEL_TEMPLATE(
        model.name,
        fields.join('\n'),
        classChanges
      )
      const generatedModel = INDEX_TEMPLATE(
        classes,
        mergedImports.join('\n') + otherCodeThatChanged
      )

      // Make Folders that doesn't exist
      mkdir(writeLocation, fileName)

      fs.writeFileSync(writeLocation, generatedModel)
    })

    // ?Enums
    options.dmmf.datamodel.enums.map((prismaEnum) => {
      const fileName = prismaEnum.name + '.ts'

      const writeLocation = path.join(enumWriteLocation, fileName)

      const generatedEnum = ENUM_TEMPLATE(
        prismaEnum.name,
        prismaEnum.values.map((e) => `  ${e.name} = '${e.name}'`).join(',\n')
      )

      // Make Folders that doesn't exist
      mkdir(writeLocation, fileName)

      fs.writeFileSync(writeLocation, generatedEnum)
    })

    logger.info(`${GENERATOR_NAME}:Generated Successfuly!`)
  },
})

logger.info(`${GENERATOR_NAME}:Registered`)
