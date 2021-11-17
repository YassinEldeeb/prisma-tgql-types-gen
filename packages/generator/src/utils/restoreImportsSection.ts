import fs from 'fs'

export const restoreImportsChanges = (writeLocation: string) => {
  const fileExists = fs.existsSync(writeLocation)
  if (!fileExists) return

  let customCode = ''
  let index = 0
  let exit = false

  fs.readFileSync(writeLocation, 'utf-8')
    .split('\n')
    .forEach((line) => {
      if (!exit) {
        if (!line.includes('export class')) {
          if (index > 0) customCode += '\n'
          customCode += line
          index++
        } else {
          exit = true
        }
      }
    })

  return customCode.replace(/\n$/, '')
}
