import { createSlice } from "@reduxjs/toolkit"
import { Article } from "../../models/article"
export interface ArticleState  {
    listArticle: Article | unknown,
    isLoading: boolean,
    isSuccess: boolean,
    isFail: boolean
}
const initialArticleState: ArticleState = {
    isLoading: false,
    isSuccess: false,
    isFail: false,
    listArticle: {}
}

const SearchData = createSlice({
    name: "search",
    initialState: initialArticleState,
    reducers: {
        getSearchData(state) {
            state.isLoading = true
        },
        getSearchDataSuccess(state, action) {
            state.isLoading = false;
            state.isSuccess = true;
            state.listArticle = action.payload
        },
        getSearchDataFail(state) {
            state.isFail = true
        }
    }
})

export const {getSearchData, getSearchDataSuccess, getSearchDataFail} = SearchData.actions;
export default SearchData;