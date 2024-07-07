import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const isAuth = useSelector(selectIsAuth);

	const [isLoading, setIsLoading] = React.useState(false);
	const [text, setText] = React.useState('');
	const [title, setTitle] = React.useState('');
	const [tags, setTags] = React.useState('');
	const [imageUrl, setImageUrl] = React.useState('');

	const inputFileRef = useRef(null);

	const isEditing = !!id;

	const handleChangeFile = async (event) => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append('image', file);

			const { data } = await axios.post('/upload', formData);

			setImageUrl(data.url);
		} catch (error) {
			console.warn(error);
			alert('Something went wrong...');
		}
	};

	const onClickRemoveImage = () => {
		setImageUrl('');
	};

	const onChange = React.useCallback((text) => {
		setText(text);
	}, []);

	const onSubmit = async () => {
		try {
			setIsLoading(true);
			const fields = {
				title,
				imageUrl,
				tags: tags.split(',').map((tag) => tag.trim()),
				text,
			};
			const { data } = isEditing
				? await axios.patch(`/posts/${id}`, fields)
				: await axios.post('/posts', fields);

			const _id = isEditing ? id : data._id;
			navigate(`/posts/${_id}`);
		} catch (error) {
			console.warn(error);
			alert('Something went wrong 2...');
		}
	};

	useEffect(() => {
		if (id) {
			axios
				.get(`/posts/${id}`)
				.then(({ data }) => {
					setTitle(data.title);
					setText(data.text);
					setImageUrl(data.imageUrl);
					setTags(data.tags.join(', '));
				})
				.catch((err) => console.warn(err));
		}
	}, []);

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Enter the text...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[],
	);

	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
				Download the preview
			</Button>
			<input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
			{imageUrl && (
				<>
					<Button variant="contained" color="error" onClick={onClickRemoveImage}>
						Delete
					</Button>
					<img
						className={styles.image}
						src={`https://blog-mern-ows8.onrender.com${imageUrl}`}
						alt="Uploaded"
					/>
				</>
			)}

			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				placeholder="Title of the Article"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				fullWidth
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Tags"
				fullWidth
				value={tags}
				onChange={(e) => setTags(e.target.value)}
			/>
			<SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
			<div className={styles.buttons}>
				<Button onClick={onSubmit} size="large" variant="contained">
					{isEditing ? 'Save' : 'Publish'}
				</Button>
				<Link to="/">
					<Button size="large">Cancel</Button>
				</Link>
			</div>
		</Paper>
	);
};
