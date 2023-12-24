import emailjs from '@emailjs/browser';
import { Chip, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
function createData(name, date, status, organizar) {
    return { name, date, status, organizar };
}

const rows = [
    createData('Frozen yoghurt', 159, "onGoing", 24),
    createData('Ice cream sandwich', 237, "onComing", 37),
    createData('Eclair', 262, "Cancel", 24),
    createData('Cupcake', 305, "Complete", 67),
    createData('Gingerbread', 356, "onComing", 49),
];

const handleClick = () => {
    // console.log('clicked');
    // const data = {
    //     to_name: 'Sami',
    //     from_name: 'Event Management',
    //     user_email: 'i211103@nu.edu.pk',
    //     message: 'hello Sami your request has been pending'
    // };
    // emailjs.send('service_k3xy0x6', 'template_35jf9qs', data, 'efxKy5_G-3fltRf1r')
    //     .then((result) => {
    //         console.log(result.text);
    //     }, (error) => {
    //         console.log(error.text);
    //     });
};
export default function EventStatus() {
    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                    <TableCell>
                        <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 16 }}>
                            <b>Name</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                            <b>Date</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                            <b>Status</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                            <b>Organizar</b>
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                    <TableCell colSpan={4} style={{ padding: 0 }}>
                        <Divider sx={{ mt: 2, mb: 1, height: '1px', backgroundColor: 'gray' }} />
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (

                    <React.Fragment key={row.name}>
                        <TableRow sx={{
                            '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' }
                            , '&:hover': { backgroundColor: '#3D4551' }
                        }}
                            onClick={handleClick}
                        >
                            <TableCell component="th" scope="row">
                                <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                    {row.name}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{ color: '#adb5bd', fontSize: 12 }}>
                                    {row.date}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Chip size="small" component="div" sx={{
                                    color: '#ffff', fontSize: 10,
                                    bgcolor: row.status === "onGoing" ? '#71B6F9' : row.status === "onComing" ? '#5B69BC' : row.status === "Cancel" ? '#FF5B5B' : '#4DFC4D',
                                    textTransform: 'none', borderRadius: 2,
                                    padding: 0, margin: 0
                                }} label={row.status} />
                            </TableCell>
                            <TableCell align="center">
                                <Typography component="div" sx={{
                                    color: '#ffff', fontSize: 12
                                }}>
                                    {row.organizar}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                            <TableCell colSpan={4} style={{ padding: 0 }}>
                                <Divider sx={{ height: '1px', backgroundColor: 'gray' }} />
                            </TableCell>
                        </TableRow>
                    </React.Fragment>
                ))}
            </TableBody>
        </Table>
    );
}
