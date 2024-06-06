import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: 'Petro Vyshnevyi',
			email: 'petya@test.com',
			password: '12345',
		},
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		const data = await dispatch(fetchRegister(values));
		if (data.payload && 'token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token);
		} else {
			alert('Failed to register');
		}
	};
	if (isAuth) {
		return <Navigate to="/" />;
	}
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Создание аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="Full Name"
					fullWidth
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					{...register('fullName', { required: 'Enter your full name' })}
				/>
				<TextField
					className={styles.field}
					label="E-Mail"
					fullWidth
					type="email"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register('email', { required: 'Enter your email' })}
				/>
				<TextField
					className={styles.field}
					label="Password"
					fullWidth
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', { required: 'Enter your password' })}
				/>
				<Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
					Sign Up
				</Button>
			</form>
		</Paper>
	);
};
