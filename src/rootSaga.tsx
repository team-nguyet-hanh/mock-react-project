import { authSaga } from "./redux/authen/authSaga";
import { all } from "redux-saga/effects";
import { registerSaga } from "./redux/register/registerSaga";
import articleSaga  from "./redux/article/articleSaga";

export default function* rootSaga() {
    yield all([authSaga(), registerSaga(), articleSaga()])
}