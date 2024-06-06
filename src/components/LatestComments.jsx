import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestComments } from '../redux/slices/comments';
import { CommentsBlock } from './CommentsBlock';

export default function LatestComments() {
	const dispatch = useDispatch();
	const { latestItems, latestStatus } = useSelector((state) => state.comments);

	useEffect(() => {
		dispatch(fetchLatestComments());
	}, [dispatch]);
	return <CommentsBlock items={latestItems} status={latestStatus} />;
}
