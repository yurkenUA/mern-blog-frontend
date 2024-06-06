import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();

	const onClickLogout = () => {
		if (window.confirm('Are you sure you want to logout?')) {
			dispatch(logOut());
			window.localStorage.removeItem('token');
		}
	};
	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/">
						<div>ZATOKA BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to="/add-post">
									<Button variant="contained">Write an article</Button>
								</Link>
								<Button onClick={onClickLogout} variant="contained" color="error">
									Log Out
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="outlined">Login</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Create an account</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
