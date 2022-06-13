import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Dude Liman" },
  { id: "1", name: "Al Bundy" },
  { id: "2", name: "Popey Smith" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllusers = (state) => state.users;

export default usersSlice.reducer;
