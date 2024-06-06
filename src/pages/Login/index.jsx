import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

export const Login = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		const data = await dispatch(fetchAuth(values));
		if (data.payload && 'token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token);
		} else {
			alert('Something went wrong');
		}
	};

	if (isAuth) {
		return <Navigate to="/" />;
	}
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Login to account
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					type="email"
					{...register('email', { required: 'Enter your email' })}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="Password"
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', { required: 'Enter your password' })}
					fullWidth
				/>
				<Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
					Login
				</Button>
			</form>
		</Paper>
	);
};
