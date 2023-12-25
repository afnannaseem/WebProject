import { Avatar, Chip, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

function createData(pic, name, email, status) {
    return { pic, name, email, status };
}


const rows = [];

for (let i = 1; i <= 20; i++) {
    rows.push(
        createData(
            `Event ${i}`,
            i % 2 === 0 ? 'Organizer A' : 'Organizer B',
            `email${i}@example.com`,
            i % 2 === 0 ? 'VIP' : 'Regular',
        )
    );
}

const handleClick = () => {
    console.log('clicked');
    // Your handleClick logic here
};

const TicketHolder = (props) => {
    return (
        <>
            <Table aria-label="simple table" >
                <TableHead>
                    <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                        <TableCell>
                            <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 16 }}>
                                <b>ProfilePic</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                <b>Name</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                <b>Email</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                <b>Type</b>
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                        <TableCell colSpan={9} style={{ padding: 0 }}>
                            <Divider sx={{ mt: 2, mb: 1, height: '1px', backgroundColor: 'gray' }} />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <React.Fragment key={row.name + index}>
                            <TableRow sx={{
                                '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' }
                                , '&:hover': { backgroundColor: '#3D4551' }
                            }}
                                onClick={handleClick}
                            >
                                <TableCell >
                                    <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                        <Avatar sx={{ width: 50, height: 50, marginRight: 2 }} alt="Remy Sharp" src="https://coderthemes.com/adminto/layouts/assets/images/users/user-3.jpg" />
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography component="div" sx={{ color: '#adb5bd', fontSize: 12 }}>
                                        {row.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography component="div" sx={{
                                        color: '#ffff', fontSize: 12
                                    }}>
                                        {row.email}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                        <Chip size="small" component="div" sx={{
                                            color: '#ffff', fontSize: 10,
                                            bgcolor: row.status === "VIP" ? '#71B6F9' : row.status === "Regular" ? '#5B69BC' : row.status === "Below Average" ? '#FF5B5B' : '#5B69BC',
                                            textTransform: 'none', borderRadius: 2,
                                            padding: 0, margin: 0
                                        }} label={row.status} />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                                <TableCell colSpan={9} style={{ padding: 0 }}>
                                    <Divider sx={{ height: '1px', backgroundColor: 'gray' }} />
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
export default TicketHolder;
