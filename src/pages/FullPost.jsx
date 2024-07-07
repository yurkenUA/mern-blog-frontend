import React, { useEffect, useState } from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import ReactMarkdown from 'react-markdown';
import CommentsPost from '../components/CommentsPost';

export const FullPost = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`/posts/${id}`)
			.then((res) => {
				setData(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.warn(err);
			});
	}, []);

	if (isLoading) {
		return <Post isLoading={isLoading} isFullPost />;
	}

	return (
		<>
			<Post
				key={data._id}
				id={data._id}
				title={data.title}
				imageUrl={`https://blog-mern-ows8.onrender.com/${data.imageUrl}`}
				user={{
					avatarUrl: data.user.avatarUrl,
					fullName: data.user.fullName,
				}}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={data.commentsCount}
				tags={data.tags}
				isFullPost>
				<ReactMarkdown children={data.text} />
			</Post>
			<CommentsPost postId={id}>
				<Index />
			</CommentsPost>
		</>
	);
};
