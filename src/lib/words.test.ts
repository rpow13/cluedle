import {
  getIndex,
  getLastgameNumber,
  getNextgameNumber,
  getWordOfGame,
} from './words'

describe('solutionIndex', () => {
  test('last game index', () => {
    expect(getLastgameNumber()).toEqual(28)
  })

  test('next game date', () => {
    expect(getNextgameNumber(1)).toEqual(2)
    expect(getNextgameNumber(2)).toEqual(3)
  })

  test('index', () => {
    expect(getIndex(1)).toEqual(1)
  })

  test('word of the day', () => {
    expect(() => getWordOfGame(-1)).toThrowError('Invalid index')
    expect(getWordOfGame(0)).toEqual('UNDER')
    expect(getWordOfGame(1)).toEqual('COUCH')
    expect(getWordOfGame(27)).toEqual('BLIND')
  })
})
