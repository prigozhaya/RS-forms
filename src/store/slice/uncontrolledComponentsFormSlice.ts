import { createSlice } from "@reduxjs/toolkit";

const uncontrolledComponentsFormSlice = createSlice({
  name: "uncontrolledComponentsForm",
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
    setuncontrolledComponentsForm(state, { payload }) {
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

export const { setuncontrolledComponentsForm } =
  uncontrolledComponentsFormSlice.actions;
export default uncontrolledComponentsFormSlice.reducer;
