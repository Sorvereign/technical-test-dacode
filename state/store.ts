import { configureStore } from "@reduxjs/toolkit";
import game from "./gameSlice";
import settings from "./settingsSlice";

export const store = configureStore({
  reducer: { game, settings },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
