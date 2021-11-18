import fs from 'fs'

export const restoreClassChanges = (writeLocation: string) => {
  const fileExists = fs.existsSync(writeLocation)
  if (!fileExists) return

  const customCode: string[] = []
  let index = 0

  let Stop = false

  fs.readFileSync(writeLocation, 'utf-8')
    .split('\n')
    .reverse()
    .forEach((line) => {
      if (line.length === 0) return
      if (
        !Stop &&
        (line.includes('// skip overwrite') ||
          (!line.includes('}') && customCode.length === 0) ||
          customCode.length > 0)
      ) {
        if (line.includes('// skip overwrite')) {
          Stop = true
        }
        customCode.push(line)
        index++
      }
    })

  return customCode.reverse().join('\n').replace(/\n$/, '')
}
