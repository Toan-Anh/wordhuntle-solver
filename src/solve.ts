import { buildTrie, readDictionary } from './utils'
import { getWords } from './wordhuntle'

export const solve = ({ board: boardString, cutOff }: { board: string; cutOff: number }) => {
  console.log('Loading dictionary...')
  const dictionary = readDictionary('./dictionaries/mieliestronk.txt')
  const dictionaryTrie = buildTrie(dictionary)
  console.log('Dictionary loaded.')

  const board = boardString.split('')
  console.log('Board', board)
  const results = getWords(dictionaryTrie)(board, cutOff)
  console.log(`Found: ${results.length}`)
  console.log(results)
}
