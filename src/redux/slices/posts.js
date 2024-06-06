import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/posts');
	return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
	const { data } = await axios.get('posts/tags');
	return data;
});

export const fetchRemovePosts = createAsyncThunk(
	'posts/fetchRemovePosts',
	async (id) => await axios.delete(`posts/${id}`),
);

export const fetchSortPosts = createAsyncThunk('posts/fetchSortPosts', async (sortBy) => {
	const { data } = await axios.get(`/posts/sort`, { params: { sortBy } });
	return data;
});

export const fetchPostsByTag = createAsyncThunk('posts/fetchPostsByTag', async (tag) => {
	const { data } = await axios.get(`/posts/tags/${tag}`);
	return data;
});

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
	tags: {
		items: [],
		status: 'loading',
	},
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Recieved the posts
			.addCase(fetchPosts.pending, (state) => {
				state.posts.items = [];
				state.posts.status = 'loading';
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.posts.items = action.payload;
				state.posts.status = 'loaded';
			})
			.addCase(fetchPosts.rejected, (state) => {
				state.posts.items = [];
				state.posts.status = 'error';
			})
			// Recieved the tags
			.addCase(fetchTags.pending, (state) => {
				state.tags.items = [];
				state.tags.status = 'loading';
			})
			.addCase(fetchTags.fulfilled, (state, action) => {
				state.tags.items = action.payload;
				state.tags.status = 'loaded';
			})
			.addCase(fetchTags.rejected, (state) => {
				state.tags.items = [];
				state.tags.status = 'error';
			})
			// Deleted the posts
			.addCase(fetchRemovePosts.fulfilled, (state, action) => {
				state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
			})
			.addCase(fetchSortPosts.pending, (state) => {
				state.posts.items = [];
				state.posts.status = 'loading';
			})
			.addCase(fetchSortPosts.fulfilled, (state, action) => {
				state.posts.items = action.payload;
				state.posts.status = 'loaded';
			})
			.addCase(fetchSortPosts.rejected, (state) => {
				state.posts.items = [];
				state.posts.status = 'error';
			})
			.addCase(fetchPostsByTag.pending, (state) => {
				state.posts.status = 'loading';
			})
			.addCase(fetchPostsByTag.fulfilled, (state, action) => {
				state.posts.items = action.payload;
				state.posts.status = 'loaded';
			})
			.addCase(fetchPostsByTag.rejected, (state) => {
				state.posts.status = 'error';
			});
	},
});

export const postsReducer = postsSlice.reducer;
