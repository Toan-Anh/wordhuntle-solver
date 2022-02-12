export interface Node {
  isWord: boolean
  next: Record<string, Node>
}

export type Result = { word: string; sequence: number[] }
