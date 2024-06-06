import React, { useEffect, useState } from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addComment } from '../../redux/slices/comments';

export const Index = () => {
	const [text, setText] = useState('');
	const { id } = useParams();
	const dispatch = useDispatch();
	const { avatarUrl } = useSelector((state) => state.auth.data.userData);

	const navigate = useNavigate();

	const onSubmit = async () => {
		if (text.trim()) {
			try {
				await dispatch(addComment({ postId: id, text }));
				setText('');
				navigate(`/posts/${id}`);
			} catch (error) {
				console.warn(error);
				alert("Couldn't send the comment");
			}
		}
	};

	return (
		<>
			<div className={styles.root}>
				<Avatar classes={{ root: styles.avatar }} src={avatarUrl} />
				<div className={styles.form}>
					<TextField
						label="Write a comment"
						variant="outlined"
						maxRows={10}
						multiline
						fullWidth
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<Button onClick={onSubmit} variant="contained" disabled={text === ''}>
						Comment
					</Button>
				</div>
			</div>
		</>
	);
};
