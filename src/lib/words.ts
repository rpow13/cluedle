import { default as GraphemeSplitter } from 'grapheme-splitter'
import queryString from 'query-string'

import { NOT_CONTAINED_MESSAGE, WRONG_SPOT_MESSAGE } from '../constants/strings'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WORDS } from '../constants/wordlist'
import { getGuessStatuses } from './statuses'

export const firstgameNumber = 1
export const lastgameNumber = 28
export const currentGameNumber = 1
export const periodInDays = 1

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(solution, guess)
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getLastgameNumber = () => {
  return lastgameNumber
}

export const getNextgameNumber = (current: number) => {
  return current + 1
}

export const isValidgameNumber = (number: number) => {
  if (number < firstgameNumber || number >= lastgameNumber) {
    return false
  }
  return true
}

export const getIndex = (gameNumber: number) => {
  return gameNumber
}

export const getWordOfGame = (index: number) => {
  if (index < 1) {
    throw new Error('Invalid index')
  }

  return localeAwareUpperCase(WORDS[(index-1) % WORDS.length])
}

export const getSolution = (gameNumber: number) => {
  const nextgameNumber = getNextgameNumber(gameNumber)
  const index = getIndex(gameNumber)
  const wordOfTheGame = getWordOfGame(index)
  return {
    solution: wordOfTheGame,
    solutionGameNumber: gameNumber,
    solutionIndex: index,
    followingGame: nextgameNumber.valueOf(),
  }
}

export const getGameNumber = () => {
  const parsed = queryString.parse(window.location.search)
  try {
    const d = parseInt(parsed.d!.toString(), 10)
    if (d < firstgameNumber || d > lastgameNumber) {
      setGameNumber(firstgameNumber)
      return firstgameNumber
    }
    return d
  } catch (e) {
    console.log(e)
  }
  return firstgameNumber
}

export const setGameNumber = (d: number) => {
  try {
    if (d <= lastgameNumber) {
      window.location.href = '/?d=' + d
      return
    }
  } catch (e) {
    console.log(e)
  }
  window.location.href = '/'
}

export const { solution, solutionGameNumber, solutionIndex, followingGame } =
  getSolution(getGameNumber())
