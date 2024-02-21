const { test, expect } = require('@jest/globals')
const { normalizeURL, extractURLsFromHTML } = require('./crawl.js')

test('Trailing / is removed from HTTPS URL', () => {
  expect(normalizeURL('https://google.com/path/')).toBe('google.com/path');
});

test('Trailing / is removed from HTTP URL', () => {
  expect(normalizeURL('https://google.com/path/')).toBe('google.com/path');
});

test('No changes on URL format we expect', () => {
  expect(normalizeURL('https://google.com/path')).toBe('google.com/path');
});


test('Extract single URL from HTML', () => {
  expect(extractURLsFromHTML(
`
<html>
  <body>
    <a href="https://google.com">google</a>
  </body>
</html>
`, 
      'https://test.com'
    )
  ).toStrictEqual(['https://google.com/']);
});

test('Extract multiple URLs from HTML', () => {
  expect(
    extractURLsFromHTML(
`
<html>
  <body>
    <a href="https://google.com">google</a>
    <a href="https://youtube.com">youtube</a>
  </body>
</html>
`, 
      'https://test.com'
    )
  ).toStrictEqual(['https://google.com/', 'https://youtube.com/']);
});

test('No URL in HTML', () => {
  expect(
    extractURLsFromHTML(
`
<html>
  <body>
  </body>
</html>
`, 
      'https://test.com'
    )
  ).toStrictEqual([]);
});

test('Parse relative links', () => {
  expect(
    extractURLsFromHTML(
`
<html>
  <body>
    <a href="/page">other local page</a>
  </body>
</html>
`,
      'https://test.com'
    )
  ).toStrictEqual(['https://test.com/page']);
});

test('Parse relative and absoloute links', () => {
  expect(
    extractURLsFromHTML(
`
<html>
  <body>
    <a href="/page">other local page</a>
    <a href="https://google.com/page">google</a>
  </body>
</html>
`,
      'https://test.com'
    )
  ).toStrictEqual(['https://test.com/page', 'https://google.com/page']);
});

