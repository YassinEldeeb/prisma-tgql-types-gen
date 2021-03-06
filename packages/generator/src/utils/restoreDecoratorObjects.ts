import fs from 'fs'
import { removeTheFirstChar } from './removeTheFirstChar'

export const restoreDecoratorObjects = (
  writeLocation: string,
  fields: { field: string; type: string }[],
  modelName: string,
) => {
  const fileExists = fs.existsSync(writeLocation)
  if (!fileExists) return

  let modelCodeBlock = false

  const lines = fs.readFileSync(writeLocation, 'utf-8').split('\n')
  const data: { field: string; decorator: any }[] = []

  lines.forEach((line, index) => {
    const lineIndex = index + 1

    if (line.includes(`export class ${modelName}`)) {
      modelCodeBlock = true
    }

    if (modelCodeBlock) {
      const fieldLine = fields.find((e) => {
        return (
          line
            .split(':')
            .map((e) => e.replace('?', '').trim())
            .includes(e.field) && line.includes(e.type)
        )
      })

      const fieldDecorator = []
      if (fieldLine) {
        let condition = true
        let index = lineIndex - 1

        while (condition) {
          index--
          fieldDecorator.push(lines[index])

          if (lines[index].includes('@Field(')) {
            condition = false
          }
        }

        const decoratorObject = removeTheFirstChar(
          fieldDecorator.reverse().join('').slice(0, -1),
          '{',
        )
          .replace(/\}$/, '')
          .split(/,+(?=[\w]+\:)/g)

        const cleanedStringObject = decoratorObject
          .join(',')
          .replace('@Field(', '')
          .replace('=>', '')
          .replace('(', '')
          .replace(')', '')

        let decorator: any = {}

        cleanedStringObject
          .split(',')
          .map((i) => {
            return i.split(':')
          })
          .forEach((j) => (decorator[j[0]?.trim()] = j[1]?.trim()))

        const trimAllValues = (input: any) =>
          Object.keys(input).reduce(
            (prev, next) =>
              Object.assign(prev, {
                [next]: input[next]?.trim(),
              }),
            {},
          )

        const trimmedDecorator = trimAllValues(decorator)

        data.push({
          field: fieldLine.field.replace(':', ''),
          decorator: trimmedDecorator,
        })
      }
    }

    if (
      line.includes(fields[fields.length - 1].field) &&
      line.includes(fields[fields.length - 1].type)
    ) {
      modelCodeBlock = false
    }
  })

  return data
}
