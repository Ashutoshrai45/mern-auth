import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Userslice from "./userstore";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootreducer = combineReducers({ user: Userslice });
const persistconfig = {
  key: "root",
  version: 1,
  storage,
};

const persistreducer = persistReducer(persistconfig, rootreducer);

const store = configureStore({
  reducer: persistreducer,
  middleware: (getdefaultmiddleware) =>
    getdefaultmiddleware({
      serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);
