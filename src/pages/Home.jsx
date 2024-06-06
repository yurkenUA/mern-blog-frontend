import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { fetchSortPosts, fetchTags } from '../redux/slices/posts';
import LatestComments from '../components/LatestComments';

export const Home = () => {
	const dispatch = useDispatch();
	const [sortType, setSortType] = useState('new');
	const userData = useSelector((state) => state.auth.data);
	const { posts, tags } = useSelector((state) => state.posts);

	const arePostsLoading = posts.status === 'loading';
	const areTagsLoading = tags.status === 'loading';

	const onSortPosts = (type) => {
		setSortType(type);
	};

	useEffect(() => {
		// dispatch(fetchPosts());
		dispatch(fetchTags());
		dispatch(fetchSortPosts(sortType));
	}, [sortType, dispatch]);

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={sortType === 'new' ? 0 : 1}
				aria-label="basic tabs example">
				<Tab label="Newest" onClick={() => onSortPosts('new')} />
				<Tab label="Popular" onClick={() => onSortPosts('popular')} />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(arePostsLoading ? [...Array(5)] : posts.items).map((obj, i) =>
						arePostsLoading ? (
							<Post key={i} isLoading={true} />
						) : (
							obj &&
							obj._id && (
								<Post
									key={obj._id}
									id={obj._id}
									title={obj.title}
									imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
									user={{
										avatarUrl: obj.user.avatarUrl,
										fullName: obj.user.fullName,
									}}
									createdAt={obj.createdAt}
									viewsCount={obj.viewsCount}
									commentsCount={obj.commentsCount}
									tags={obj.tags}
									isEditable={userData ? userData.userData?._id === obj.user._id : false}
								/>
							)
						),
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={areTagsLoading} />
					<LatestComments />
				</Grid>
			</Grid>
		</>
	);
};
