import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/comments';
import { CommentsBlock } from './CommentsBlock';

export default function CommentsPost({ children, postId }) {
	const dispatch = useDispatch();
	const { items, status } = useSelector((state) => state.comments);

	useEffect(() => {
		dispatch(fetchComments(postId));
	}, [postId, dispatch]);
	return <CommentsBlock items={items} status={status} postId={postId} children={children} />;
}
