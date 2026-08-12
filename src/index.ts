import { parseFragment } from 'parse5'
import type { DefaultTreeAdapterMap } from 'parse5'

const WORDS_PER_MINUTE = 200
const EXCLUDED_TAGS = new Set(['script', 'style', 'template', 'noscript'])

type Parse5Node = DefaultTreeAdapterMap['node']

interface WordSegment {
  isWordLike: boolean
}

interface WordSegmenter {
  segment: (input: string) => Iterable<WordSegment>
}

type SegmenterConstructor = new (locales: string | undefined, options: { granularity: 'word' }) => WordSegmenter

/**
 * Estimate the number of minutes required to read an article.
 *
 * The input may be plain text or an HTML fragment. HTML markup, comments, and
 * non-visible script, style, template, and noscript content are excluded.
 *
 * @param input - Plain article text or an article HTML fragment
 * @returns A whole-minute estimate, rounded up; `0` for empty content
 */
export function readtime (input: string): number {
  const words = countWords(extractVisibleText(input))
  return words === 0 ? 0 : Math.ceil(words / WORDS_PER_MINUTE)
}

function extractVisibleText (input: string): string {
  const fragment = parseFragment(input)
  const textNodes: string[] = []

  collectText(fragment, textNodes)
  return textNodes.join(' ')
}

function collectText (node: Parse5Node, textNodes: string[]): void {
  if (EXCLUDED_TAGS.has(node.nodeName)) return

  if ('value' in node) {
    textNodes.push(node.value)
    return
  }

  if ('childNodes' in node) {
    for (const child of node.childNodes) {
      collectText(child, textNodes)
    }
  }
}

function countWords (input: string): number {
  const Segmenter = (Intl as unknown as { Segmenter: SegmenterConstructor }).Segmenter
  const segmenter = new Segmenter(undefined, { granularity: 'word' })
  let words = 0

  for (const segment of segmenter.segment(input)) {
    if (segment.isWordLike) words += 1
  }

  return words
}
