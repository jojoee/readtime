# readtime

A lightweight, Medium-style reading-time estimator for plain text and HTML article fragments.

## Installation

```bash
npm install @jojoee/readtime
```

## Usage

### ESM / TypeScript

```typescript
import { readtime } from '@jojoee/readtime'

readtime('A short article') // 1
readtime('<p>An HTML article</p>') // 1
```

### CommonJS

```javascript
const { readtime } = require('@jojoee/readtime')

readtime('A short article') // 1
```

### Browser

```html
<script src="https://unpkg.com/@jojoee/readtime/dist/readtime.umd.js"></script>
<script>
  readtime.readtime('<p>An HTML article</p>') // 1
</script>
```

## API

### `readtime(input: string): number`

Returns an article's estimated reading time in whole minutes. The estimate uses
200 words per minute and rounds non-empty content up to the next minute.

```typescript
readtime('') // 0
readtime('One word') // 1
readtime('...200 words...') // 1
readtime('...201 words...') // 2
```

`input` may be plain text or an HTML fragment. HTML is parsed before counting:
tags and comments are ignored, entities are decoded, and `script`, `style`,
`template`, and `noscript` content is excluded. Word counting uses Unicode word
segmentation, which handles multilingual article text better than whitespace
splitting.

## Limitations

- Pass the article fragment itself. `readtime` does not identify the main article
  in a complete web page or exclude navigation, ads, and related content.
- Image, video, and code-block reading time are not weighted separately.
- The reading speed is fixed at 200 words per minute; the library intentionally
  provides no configuration or display-label formatter.

## Development

```bash
npm install
npm run lint
npx tsc --noEmit
npm test
npm run test:coverage
npm run build
```
