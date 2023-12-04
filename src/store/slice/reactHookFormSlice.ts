import { createSlice } from "@reduxjs/toolkit";

const reactHookFormSlice = createSlice({
  name: "reactHookForm",
  initialState: {
    name: "",
    age: 0,
    email: "",
    gender: "",
    image: "",
    country: "",
    newInfo: false,
  },
  reducers: {
    setReactHookForm(state, { payload }) {
      state.name = payload.name;
      state.age = payload.age;
      state.email = payload.email;
      state.gender = payload.gender;
      state.image = payload.image;
      state.country = payload.country;
      state.newInfo = payload.newInfo;
    },
  },
});

export const { setReactHookForm } = reactHookFormSlice.actions;
export default reactHookFormSlice.reducer;
