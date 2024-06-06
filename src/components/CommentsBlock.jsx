import React, { useEffect } from 'react';

import { SideBlock } from './SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';

export const CommentsBlock = ({ children, status, items }) => {
	return (
		<SideBlock title="Comments">
			<List>
				{(status === 'loading' ? [...Array(5)] : items).map((obj, index) => (
					<React.Fragment key={index}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								{status === 'loading' ? (
									<Skeleton variant="circular" width={40} height={40} />
								) : (
									<Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
								)}
							</ListItemAvatar>
							{status === 'loading' ? (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<Skeleton variant="text" height={25} width={120} />
									<Skeleton variant="text" height={18} width={230} />
								</div>
							) : (
								<ListItemText primary={obj.user.fullName} secondary={obj.text} />
							)}
						</ListItem>
						<Divider variant="inset" component="li" />
					</React.Fragment>
				))}
			</List>
			{children}
		</SideBlock>
	);
};
