const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('Trailing / is removed from HTTPS URL', () => {
  expect(normalizeURL('https://google.com/path/')).toBe('google.com/path');
});

test('Trailing / is removed from HTTP URL', () => {
  expect(normalizeURL('https://google.com/path/')).toBe('google.com/path');
});

test('No changes on URL format we expect', () => {
  expect(normalizeURL('https://google.com/path')).toBe('google.com/path');
});
