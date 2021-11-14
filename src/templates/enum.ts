export const ENUM_TEMPLATE = (
  ENUM: string,
  ENUMVALUES: string
) => `import { registerEnumType } from 'type-graphql'

export enum ${ENUM} {
${ENUMVALUES}
}
registerEnumType(${ENUM}, {
    name: '${ENUM}',
})
`
