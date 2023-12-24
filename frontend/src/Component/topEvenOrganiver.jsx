import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function TopEvenOrganizer() {
    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', bgcolor: '#313844' }}>
            <Avatar sx={{ width: 70, height: 70 }} alt="Remy Sharp" src="https://coderthemes.com/adminto/layouts/assets/images/users/user-3.jpg" />
            <div>
                <Typography component="div" sx={{ ml: 3, mt: 1, color: '#fff', fontSize: 14 }}>
                    <b>John Doe</b>
                </Typography>
                <Typography component="div" sx={{ ml: 3, mt: 1, color: '#adb5bd', fontSize: 12 }}>
                    johndoe@gmail.com
                </Typography>
                <Typography component="div" sx={{
                    ml: 3, mt: 2, color: '#F9C851', fontSize: 12
                }}>
                    <b>10</b>
                </Typography>
            </div>
        </Paper>
    );
}