import { buildTrie, readDictionary } from './utils'
import { getWords } from './wordhuntle'

console.log('Loading dictionary...')
const dictionary = readDictionary('./dictionaries/mieliestronk.txt')
const dictionaryTrie = buildTrie(dictionary)
console.log('Dictionary loaded.')

const board = 'guructtannoltnel'.split('')
console.log('Board', board)
const results = getWords(dictionaryTrie)(board, 9)
console.log(`Found ${results.length}`)
console.log(results)
