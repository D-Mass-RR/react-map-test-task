import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import reducer from "./reducers/";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: { main: reducer },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);

export default store;
