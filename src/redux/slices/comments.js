import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
	const { data } = await axios.get(`/posts/${postId}/comments`);
	return data;
});

export const fetchLatestComments = createAsyncThunk('comments/fetchLatestComments', async () => {
	const { data } = await axios.get('/comments/latest');
	return data;
});

export const addComment = createAsyncThunk('comments/addComment', async ({ postId, text }) => {
	const { data } = await axios.post(`/posts/${postId}/comments`, { text });
	return data;
});

const initialState = {
	items: [],
	status: 'loading',
	latestItems: [],
	latestStatus: 'loading',
	commentsCount: 0,
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchComments.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'loaded';
				state.commentsCount = state.items.length;
			})
			.addCase(fetchComments.rejected, (state) => {
				state.status = 'error';
			})
			.addCase(fetchLatestComments.pending, (state) => {
				state.latestStatus = 'loading';
			})
			.addCase(fetchLatestComments.fulfilled, (state, action) => {
				state.latestItems = action.payload;
				state.latestStatus = 'loaded';
			})
			.addCase(fetchLatestComments.rejected, (state) => {
				state.latestStatus = 'error';
			})
			.addCase(addComment.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addComment.fulfilled, (state, action) => {
				state.items.push(action.payload);
				state.status = 'loaded';
			})
			.addCase(addComment.rejected, (state) => {
				state.status = 'error';
			});
	},
});

export const selectComments = (state) => state.comments.items;
export const selectCommentsStatus = (state) => state.comments.status;

export const commentsReducer = commentsSlice.reducer;
