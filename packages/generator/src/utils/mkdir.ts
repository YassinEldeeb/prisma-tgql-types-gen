import fs from 'fs'
import path from 'path'

export const mkdir = (writeLocation: string, fileName: string) => {
  const folders = writeLocation
    .replace(fileName, '')
    .replace(process.cwd(), '')
    .split(path.sep)
    .filter((e) => e.length)

  folders.forEach((_, i) => {
    const folder = folders.slice(0, i + 1).join(path.sep)

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
  })
}
