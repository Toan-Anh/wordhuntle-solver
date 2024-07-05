import { compose, filter, sortBy, uniqBy } from 'ramda'
import { Node, Result } from './utils'

const determineBoardSize = (chars: string[]): number => {
  const boardSize = Math.floor(Math.sqrt(chars.length))
  console.log(`Input has ${chars.length} characters, closest board size is ${boardSize}`)
  console.log('Final board considered:')
  for (let i = 0; i < boardSize; ++i) {
    console.log(chars.slice(i * boardSize, (i + 1) * boardSize).join(' '))
  }

  return boardSize
}

const getTileNW = (boardSize: number, currentTileIdx: number): number | null => {
  return currentTileIdx % boardSize === 0 ? null : currentTileIdx - (boardSize + 1)
}
const getTileN = (boardSize: number, currentTileIdx: number): number | null => {
  return currentTileIdx - boardSize
}
const getTileNE = (boardSize: number, currentTileIdx: number): number | null => {
  return (currentTileIdx + 1) % boardSize === 0 ? null : currentTileIdx - (boardSize - 1)
}
const getTileW = (boardSize: number, currentTileIdx: number): number | null => {
  return currentTileIdx % boardSize === 0 ? null : currentTileIdx - 1
}
const getTileE = (boardSize: number, currentTileIdx: number): number | null => {
  return (currentTileIdx + 1) % boardSize === 0 ? null : currentTileIdx + 1
}
const getTileSW = (boardSize: number, currentTileIdx: number): number | null => {
  return currentTileIdx % boardSize === 0 ? null : currentTileIdx + (boardSize - 1)
}
const getTileS = (boardSize: number, currentTileIdx: number): number | null => {
  return currentTileIdx + boardSize
}
const getTileSE = (boardSize: number, currentTileIdx: number): number | null => {
  return (currentTileIdx + 1) % boardSize === 0 ? null : currentTileIdx + (boardSize + 1)
}

const getAdjacentTiles = (boardSize: number, currentTileIdx: number, includeDiagonals: boolean): number[] => {
  const getters = includeDiagonals
    ? [getTileNW, getTileN, getTileNE, getTileW, getTileE, getTileSW, getTileS, getTileSE]
    : [getTileN, getTileW, getTileE, getTileS]

  return getters
    .map(getter => getter(boardSize, currentTileIdx))
    .filter((index): index is number => index != null && index >= 0 && index < boardSize * boardSize)
}

export const getWords =
  (dictionary: Node) =>
  (board: string[], cutOff: number, includeDiagonals: boolean): Result[] => {
    const boardSize = determineBoardSize(board)

    const results: Result[] = []

    const getWordsRecursive = ({
      curTrieNode,
      curTileIdx,
      curSequence,
      disabledChars,
    }: {
      curTrieNode: Node | undefined
      curTileIdx: number
      curSequence: number[]
      disabledChars: Record<number, boolean>
    }) => {
      if (!curTrieNode || curSequence.length > cutOff) {
        return
      }

      if (curTrieNode?.isWord) {
        results.push({ word: curSequence.map(idx => board[idx]).join(''), sequence: curSequence })
      }

      const nextIndices = getAdjacentTiles(boardSize, curTileIdx, includeDiagonals).filter(
        index => !disabledChars[index]
      )

      if (nextIndices.length === 0) {
        return
      }

      nextIndices.forEach(index => {
        const char = board[index]

        getWordsRecursive({
          curTrieNode: curTrieNode.next[char],
          curTileIdx: index,
          curSequence: [...curSequence, index],
          disabledChars: { ...disabledChars, [index]: true },
        })
      })
    }

    board.forEach((char, index) => {
      getWordsRecursive({
        curTrieNode: dictionary.next[char],
        curTileIdx: index,
        curSequence: [index],
        disabledChars: { [index]: true },
      })
    })

    return compose(
      sortBy<Result>(({ word }) => word),
      uniqBy<Result, string>(({ word }) => word),
      filter<Result>(({ word }) => word.length >= 4)
    )(results)
  }
