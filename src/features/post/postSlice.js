import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

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
      return initialPost;
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      console.log(id);

      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (error) {
      // return error.message;
      return initialPost; //only for testing redux
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      if (response.status === 200) return initialPost;
      return `${response?.status}:${response?.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
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
    [updatePost.fulfilled]: (state, action) => {
      if (!action.payload?.id) {
        console.log("Could not update");
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      action.payload.date = new Date().toISOString();
      const posts = state.posts.filter((post) => post.id !== id);
      state.posts = [...posts, action.payload];
    },
    [deletePost.fulfilled]: (state, action) => {
      if (!action.payload?.id) {
        console.log("delete could not complete");
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const posts = state.posts.filter((post) => post.id !== id);
      state.posts = posts;
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
