import fs from 'fs-extra'

export const readDictionary = (path: string): string[] => {
  const file = fs.readFileSync(path, { encoding: 'utf-8' })
  return file.split('\n')
}
