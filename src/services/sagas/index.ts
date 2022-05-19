import { AxiosResponse } from "axios";
import { AnyAction } from "redux";
import { call, takeEvery, put, CallEffect, PutEffect } from "redux-saga/effects";

import { IData } from "../../@types";
import { getDataSuccess } from "../reducers";
import api from "../api";

export function* getDataSaga(): Generator<
  CallEffect | PutEffect<AnyAction>,
  void,
  AxiosResponse<IData>
> {
  try {
    const response: AxiosResponse<IData> = yield call(api.get, "/data");
    yield put(getDataSuccess(response.data));
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export const GET_DATA = "GET_DATA";

export default function* rootSaga() {
  yield takeEvery(GET_DATA, getDataSaga);
}
