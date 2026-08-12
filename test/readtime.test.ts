import { describe, expect, it } from 'vitest'
import { readtime } from '../src/index.js'

function words (count: number): string {
  return Array.from({ length: count }, (_, index) => `word${index}`).join(' ')
}

describe('readtime', () => {
  it('returns zero for empty or whitespace-only input', () => {
    expect(readtime('')).toBe(0)
    expect(readtime(' \n\t ')).toBe(0)
  })

  it('rounds non-empty estimates up to a whole minute', () => {
    expect(readtime('hello')).toBe(1)
    expect(readtime(words(200))).toBe(1)
    expect(readtime(words(201))).toBe(2)
  })

  it('counts punctuation-separated words', () => {
    expect(readtime('Hello, world! This is an article.')).toBe(1)
  })

  it('counts Unicode word segments', () => {
    expect(readtime('ภาษาไทยภาษาไทย ภาษาไทย')).toBe(1)
  })

  it('counts visible text in an HTML fragment', () => {
    expect(readtime('<p>Hello &amp; welcome</p><p>to the article.</p>')).toBe(1)
  })

  it('does not count markup, comments, or excluded HTML content', () => {
    const input = '<p>Visible article text</p><!-- hidden --><script>ignored words</script><style>.article { color: red; }</style><template>hidden words</template><noscript>fallback words</noscript>'

    expect(readtime(input)).toBe(1)
  })

  it('keeps adjacent element text separate', () => {
    expect(readtime('<span>Hello</span><span>world</span>')).toBe(1)
  })

  it('accepts malformed HTML fragments', () => {
    expect(readtime('<p>Unclosed article text')).toBe(1)
  })
})
