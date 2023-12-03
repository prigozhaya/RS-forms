import { configureStore } from "@reduxjs/toolkit";
import reactHookFormReducer from "./slice/reactHookFormSlice";
import uncontrolledComponentsFormReducer from "./slice/uncontrolledComponentsFormSlice";
import countriesReducer from "./slice/countriesSlice";

export const store = configureStore({
  reducer: {
    reactHookForm: reactHookFormReducer,
    uncontrolledComponentsForm: uncontrolledComponentsFormReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
