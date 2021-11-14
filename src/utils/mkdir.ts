import fs from 'fs'

export const mkdir = (writeLocation: string, fileName: string) => {
  const folders = writeLocation
    .replace(fileName, '')
    .replace(process.cwd(), '')
    .split('\\')
    .filter((e) => e.length)

  folders.forEach((_, i) => {
    const folder = folders.slice(0, i + 1).join('\\')

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
  })
}
