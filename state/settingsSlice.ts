import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  darkMode: boolean;
}

const initialState: SettingsState = {
  darkMode: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      if (
        action.payload &&
        !document.documentElement.classList.contains("dark")
      ) {
        document.documentElement.classList.add("dark");
        state.darkMode = true;
      } else if (
        !action.payload &&
        document.documentElement.classList.contains("dark")
      ) {
        state.darkMode = false;
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { setDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;
