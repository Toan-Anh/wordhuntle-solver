import { Node } from './types'

export const buildTrie = (wordList: string[]) => {
  const head: Node = {
    isWord: false,
    next: {},
  }

  wordList.forEach(word => {
    let cur = head
    for (let i = 0; i < word.length; ++i) {
      const char = word[i]

      if (cur.next[char]) {
        if (i === word.length - 1) {
          cur.next[char].isWord = true
        }
      } else {
        cur.next[char] = {
          isWord: i === word.length - 1,
          next: {},
        }
      }

      cur = cur.next[char]
    }
  })

  return head
}

export const checkWord = (trieHead: Node) => (str: string) => {
  let cur = trieHead

  for (const char of str) {
    if (cur.next[char]) {
      cur = cur.next[char]
    } else {
      return false
    }
  }

  return cur.isWord
}
