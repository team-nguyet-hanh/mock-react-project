import { call, put, takeLeading } from "redux-saga/effects";
import { getSearchData, getSearchDataSuccess } from "./searchSlice";
import axios from "axios";

const fetchSearchData = () => {
    return axios.get("https://api.realworld.io/api/articles?limit=100")
}

function* handleSearchData(): unknown {
    try {
        const searchData = yield call(fetchSearchData);
        yield put(getSearchDataSuccess(searchData.data))
    } catch (error) {
        console.log(error.message)
    }
}

export function* SearchSaga() {
    yield takeLeading(getSearchData.type, handleSearchData)
}