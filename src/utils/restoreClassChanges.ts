import fs from 'fs'

export const restoreClassChanges = (writeLocation: string) => {
  const fileExists = fs.existsSync(writeLocation)
  if (!fileExists) return

  let customCode = ''
  let index = 0

  fs.readFileSync(writeLocation, 'utf-8')
    .split('\n')
    .forEach((line) => {
      if (
        line.includes('// skip overwrite') ||
        (!line.includes('}') && customCode.length > 0)
      ) {
        if (index > 0) customCode += '\n'
        customCode += line
        index++
      }
    })

  return customCode !== '  // skip overwrite 👇'
    ? customCode.replace(/\n$/, '')
    : undefined
}
