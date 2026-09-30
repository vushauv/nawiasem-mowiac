export type Level = 'easy' | 'medium' | 'hard'

export interface PNode {
  template: string // text with {childId} placeholders
  answer?: string // base form typed by the player (absent on root)
  shown?: string // inflected form inserted into the sentence
  aliases?: string[]
}

export interface Puzzle {
  id: string
  level: Level
  root: string
  source: { text: string; url: string }
  context: string
  nodes: Record<string, PNode>
}
