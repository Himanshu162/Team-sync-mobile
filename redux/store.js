import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import demoReducer from "./features/demoSlice";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import darkModeReducer from "./features/darkMode";

export const store = configureStore({
  reducer: {
    demo: demoReducer,
    auth: authReducer,
    user: userReducer,
    darkMode: darkModeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

setupListeners(store.dispatch);
