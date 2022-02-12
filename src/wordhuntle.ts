import { compose, filter, sortBy, uniqBy } from 'ramda'
import { checkWord, Node, Result } from './utils'

const BOARD_SIZE = 4

export const validateInput = (chars: string[]): boolean => {
  return chars.length === BOARD_SIZE * BOARD_SIZE
}

const getTileNW = (currentTileIdx: number): number | null => {
  return currentTileIdx % BOARD_SIZE === 0 ? null : currentTileIdx - (BOARD_SIZE + 1)
}
const getTileN = (currentTileIdx: number): number | null => {
  return currentTileIdx - BOARD_SIZE
}
const getTileNE = (currentTileIdx: number): number | null => {
  return (currentTileIdx + 1) % BOARD_SIZE === 0 ? null : currentTileIdx - (BOARD_SIZE - 1)
}
const getTileW = (currentTileIdx: number): number | null => {
  return currentTileIdx % BOARD_SIZE === 0 ? null : currentTileIdx - 1
}
const getTileE = (currentTileIdx: number): number | null => {
  return (currentTileIdx + 1) % BOARD_SIZE === 0 ? null : currentTileIdx + 1
}
const getTileSW = (currentTileIdx: number): number | null => {
  return currentTileIdx % BOARD_SIZE === 0 ? null : currentTileIdx + (BOARD_SIZE - 1)
}
const getTileS = (currentTileIdx: number): number | null => {
  return currentTileIdx + BOARD_SIZE
}
const getTileSE = (currentTileIdx: number): number | null => {
  return (currentTileIdx + 1) % BOARD_SIZE === 0 ? null : currentTileIdx + (BOARD_SIZE + 1)
}

export const getAdjacentTiles = (currentTileIdx: number): number[] => {
  const getters = [getTileNW, getTileN, getTileNE, getTileW, getTileE, getTileSW, getTileS, getTileSE]

  return getters
    .map(getter => getter(currentTileIdx))
    .filter((index): index is number => index != null && index >= 0 && index < BOARD_SIZE * BOARD_SIZE)
}

export const getWords =
  (dictionary: Node) =>
  (board: string[], cutOff = 9): Result[] => {
    if (!validateInput(board)) {
      throw Error('Invalid input for board!')
    }

    const results: Result[] = []

    const getWordsRecursive = ({
      curTileIdx,
      curString,
      curSequence,
      disabledChars,
    }: {
      curTileIdx: number
      curString: string
      curSequence: number[]
      disabledChars: Record<number, boolean>
    }) => {
      if (checkWord(dictionary)(curString)) {
        results.push({ word: curString, sequence: curSequence })
      }

      if (curString.length > cutOff) {
        return
      }

      const nextIndices = getAdjacentTiles(curTileIdx).filter(index => !disabledChars[index])

      if (nextIndices.length === 0) {
        return
      }

      nextIndices.forEach(index => {
        getWordsRecursive({
          curTileIdx: index,
          curString: curString + board[index],
          curSequence: [...curSequence, index],
          disabledChars: { ...disabledChars, [index]: true },
        })
      })
    }

    board.forEach((char, index) => {
      getWordsRecursive({
        curTileIdx: index,
        curString: char,
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
