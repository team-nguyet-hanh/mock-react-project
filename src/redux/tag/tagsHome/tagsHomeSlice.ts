import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type TagsHomeState = {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  tags: string[];
};

const initialTagsHomeState: TagsHomeState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  tags: [],
};

const TagsSlice = createSlice({
  name: "tagsHome",
  initialState: initialTagsHomeState,
  reducers: {
    getTags(state, _action: PayloadAction) {
      state.isLoading = true;
      state.isSuccess = false;
    },

    getTagsSuccess(state, action: { payload: { tags: string[] } }) {
      state.isSuccess = true;
      state.isLoading = false;
      state.tags = action.payload.tags;
    },

    getTagsFail(state, _action: PayloadAction<string>) {
      state.isFail = true;
      state.isLoading = false;
    },
  },
});

export const { getTags, getTagsSuccess, getTagsFail } = TagsSlice.actions;
export default TagsSlice;
