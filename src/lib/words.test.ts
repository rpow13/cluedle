import {
  getIndex,
  getLastgameNumber,
  getNextgameNumber,
  getWordOfDay,
} from './words'

describe('solutionIndex', () => {
  test('last game index', () => {
    expect(getLastgameNumber()).toEqual(17)
  })

  test('next game date', () => {
    expect(getNextgameNumber(0)).toEqual(1)
    expect(getNextgameNumber(1)).toEqual(2)
  })

  test('index', () => {
    expect(getIndex(1)).toEqual(1)
  })

  test('word of the day', () => {
    expect(() => getWordOfDay(-1)).toThrowError('Invalid index')
    expect(getWordOfDay(0)).toEqual('UNDER')
    expect(getWordOfDay(1)).toEqual('COUCH')
    expect(getWordOfDay(27)).toEqual('BLIND')
  })
})
