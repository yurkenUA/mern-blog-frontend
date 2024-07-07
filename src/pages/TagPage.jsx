import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPostsByTag, fetchTags } from '../redux/slices/posts';

export const TagPage = () => {
	const dispatch = useDispatch();
	const { tag } = useParams();
	const { posts, tags } = useSelector((state) => state.posts);
	const userData = useSelector((state) => state.auth.data);

	const arePostsLoading = posts.status === 'loading';
	const areTagsLoading = tags.status === 'loading';

	useEffect(() => {
		dispatch(fetchPostsByTag(tag));
		dispatch(fetchTags());
	}, [tag]);

	return (
		<>
			<h1>Filtered by #{tag}</h1>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(arePostsLoading ? [...Array(5)] : posts.items).map((obj, i) =>
						arePostsLoading ? (
							<Post key={i} isLoading={true} />
						) : (
							<Post
								key={obj._id}
								id={obj._id}
								title={obj.title}
								imageUrl={obj.imageUrl ? `https://blog-mern-ows8.onrender.com/${obj.imageUrl}` : ''}
								user={{
									avatarUrl: obj.user.avatarUrl,
									fullName: obj.user.fullName,
								}}
								createdAt={obj.createdAt}
								viewsCount={obj.viewsCount}
								commentsCount={3}
								tags={obj.tags}
								isEditable={userData ? userData._id === obj.user._id : false}
							/>
						),
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={areTagsLoading} />
				</Grid>
			</Grid>
		</>
	);
};
