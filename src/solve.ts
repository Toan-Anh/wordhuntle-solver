import { buildTrie, readDictionary } from './utils'
import { getWords } from './wordhuntle'

export const solve = ({ board: boardString, cutOff, dict }: { board: string; cutOff: number; dict: string }) => {
  console.log('Loading dictionary...')
  const dictionary = readDictionary(dict)
  const dictionaryTrie = buildTrie(dictionary)
  console.log('Dictionary loaded.')

  const board = boardString.split('')
  console.log('Board', board)
  const results = getWords(dictionaryTrie)(board, cutOff)
  console.log(`Found: ${results.length}`)
  console.log(results)
}
