import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
// const initialState = [
//   {
//     id: 1,
//     title: "Learning Redux Toolkit",
//     content: "I've heard good things",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
//   {
//     id: 2,
//     title: "Slices",
//     content: "The more I say slice the more I want pizza",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
// ];

const initialState = {
  posts: [],
  status: "idle", // "idle" | "loading" | "suceeded" | "failed"
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "post/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // addNewPost: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload);
    //   },
    //   prepare(title, body, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         body,
    //         date: new Date().toISOString(),
    //         userId,
    //         reactions: {
    //           thumbsUp: 0,
    //           wow: 0,
    //           heart: 0,
    //           rocket: 0,
    //           coffee: 0,
    //         },
    //       },
    //     };
    //   },
    // },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction] += 1;
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      //Add date and reactions
      let min = 1;
      const loadedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };

        return post;
      });
      //Add any fetched post to the post array
      state.posts = state.posts.concat(loadedPosts);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewPost.fulfilled]: (state, action) => {
      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };
      console.log(action.payload);
      state.posts.push(action.payload);
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
