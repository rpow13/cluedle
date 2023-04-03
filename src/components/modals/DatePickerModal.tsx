import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { getValue } from '@testing-library/user-event/dist/utils';
import { addDays, format, startOfDay } from 'date-fns'
import { useState } from 'react'
import NumberPicker from "react-widgets/NumberPicker";

import {
  DATEPICKER_CHOOSE_TEXT,
  DATEPICKER_TITLE,
  DATEPICKER_TODAY_TEXT,
} from '../../constants/strings'
import {
  firstgameNumber,
  getLastgameNumber,
  isValidgameNumber,
} from '../../lib/words'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  initialGame?: number
  handleSelectGame: (number: number) => void
  handleClose: () => void
}

export const DatePickerModal = ({
  isOpen,
  initialGame,
  handleSelectGame,
  handleClose,
}: Props) => {
  const lastgameNumber = getLastgameNumber()
  const [selectedGame, setSelectedGame] = useState<number>(() => {
    if (initialGame == null || initialGame > lastgameNumber) {
      return 0
    }
    return initialGame
  })


  return (
    <BaseModal
      title={DATEPICKER_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-center space-x-4 py-5 text-left sm:w-48">
        <NumberPicker
          value={selectedGame}
          min={firstgameNumber}
          max={lastgameNumber}
          //onChange={value => setSelectedGame(value)}
          onChange={value => setSelectedGame(value==null ? firstgameNumber : value)}
        />
      </div>
      <div className="mt-5 flex columns-2 items-center items-stretch justify-center gap-2 text-center dark:text-white sm:mt-6">
        <button
          type="button"
          disabled={!isValidgameNumber(selectedGame)}
          className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-gray-200 disabled:bg-gray-500 disabled:bg-white disabled:text-gray-900
          disabled:focus:outline-none disabled:dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-400 sm:text-base sm:text-base"
          onClick={() => handleSelectGame(selectedGame)}
        >
          {DATEPICKER_CHOOSE_TEXT} {DATEPICKER_TODAY_TEXT}
        </button>
        <button
          type="button"
          className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
          disabled={selectedGame >= lastgameNumber}
          onClick={() => handleSelectGame(selectedGame)}
        >
          {DATEPICKER_CHOOSE_TEXT}
          <br />
          {selectedGame}
        </button>
      </div>
    </BaseModal>
  )
}
