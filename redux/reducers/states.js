import { USER_FEED_STATE_CHANGE } from "../constants/index";

const initialState = {
  posts: [],
};

export const states = (state = initialState, action) => {
  switch (action.type) {
    case USER_FEED_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return {
        ...state,
      };
  }
};
