import { sum } from './math'

test('1+2=3', () => {
  const n = sum(1, 2)
  expect(n).toBe(3)
})
