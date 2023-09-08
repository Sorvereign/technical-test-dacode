import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import { gameState } from "../types";

const maxLetters = 5;

let initialState: z.infer<typeof gameState> = {
  answers: [],
  solution: "",
  boardState: ["", "", "", "", ""],
  evaluations: [],
  letterStatus: {},
  currentRowIndex: 0,
  status: "IN_PROGRESS",
  statistics: {
    wins: 0,
    lost: 0,
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<z.infer<typeof gameState>>) => {
      return action.payload;
    },
    setSolution: (state, action: PayloadAction<string>) => {
      state.solution = action.payload;
    },
    addLetter: (state, action: PayloadAction<string>) => {
      if (state.status !== "IN_PROGRESS") return;
      if (state.boardState[state.currentRowIndex].length === maxLetters) return;

      const letter = action.payload;
      state.boardState[state.currentRowIndex] += letter;
    },
    removeLetter: (state) => {
      if (state.status !== "IN_PROGRESS") return;
      if (!state.boardState[state.currentRowIndex].length) return;

      state.boardState[state.currentRowIndex] = state.boardState[
        state.currentRowIndex
      ].slice(0, -1);
    },
    evaluateRow: (state) => {
      const guess = state.boardState[state.currentRowIndex];
      if (guess.length < 5 || state.status !== "IN_PROGRESS") return;

      if (!state.answers.includes(guess) && typeof window !== "undefined") {
        toast("Not in word list");
        return;
      }

      state.status = "EVALUATE_IN_PROGRESS";

      state.evaluations.push(
        Array.from(guess).map((guessedLetter, guessedLetterIndex) => {
          if (state.solution.at(guessedLetterIndex) === guessedLetter) {
            state.letterStatus[guessedLetter] = "correct";
            return "correct";
          } else if (state.solution.includes(guessedLetter)) {
            if (!state.letterStatus[guessedLetter])
              state.letterStatus[guessedLetter] = "present";
            return "present";
          } else {
            if (!state.letterStatus[guessedLetter])
              state.letterStatus[guessedLetter] = "absent";
            return "absent";
          }
        })
      );
      state.currentRowIndex++;
    },
    lastTileReveal: (state) => {
      const guess = state.boardState[state.currentRowIndex - 1];
      if (guess === state.solution) state.status = "WIN";
      else if (state.currentRowIndex === state.boardState.length)
        state.status = "FAIL";
      else state.status = "IN_PROGRESS";
    },
    setStatistics: (
      state,
      action: PayloadAction<{ lost?: number; win?: number }>
    ) => {
      state.statistics = {
        wins: action.payload.win ?? 0,
        lost: action.payload.lost ?? 0,
      };
    },
    setAnswers: (state, action: PayloadAction<string[]>) => {
      state.answers = action.payload;
    },
  },
});

export const {
  setState,
  setSolution,
  addLetter,
  removeLetter,
  evaluateRow,
  lastTileReveal,
  setStatistics,
  setAnswers,
} = gameSlice.actions;
export default gameSlice.reducer;
