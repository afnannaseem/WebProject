import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
function createData(name, date, organizar, type, VIPTicket, RegualarTicket) {
    return { name, date, organizar, type, VIPTicket, RegualarTicket };
}
const rows = [];
for (let i = 1; i <= 20; i++) {
    rows.push(
        createData(
            `Event ${i}`,
            159 + i,
            i % 2 === 0 ? 'Organizer A' : 'Organizer B',
            i % 2 === 0 ? 'Type A' : 'Type B',
            `VIP${i}`,
            `Regular${i}`
        )
    );
}
const handleClick = () => {
    console.log('clicked');
    // const data = {
    //     user_name: 'Sami',
    //     user_email: 'samiirshad1103@gmail.com',
    //     message: 'hello Sami your request has been pending'
    // };
    // emailjs.send('service_k3xy0x6', 'template_35jf9qs', data, 'efxKy5_G-3fltRf1r')
    //     .then((result) => {
    //         console.log(result.text);
    //     }, (error) => {
    //         console.log(error.text);
    //     });
};
export default function EventRequest() {
    return (
        <>
            <Typography component="div" sx={{ ml: 3, mt: 1, mb: 1, color: '#fff', fontSize: 14 }}>
                <b>Event Request</b>
            </Typography>
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
                                <b>Organizar</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                <b>Type</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                <b>VIP Tickets</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography component="div" sx={{ color: '#fff', fontSize: 16 }}>
                                <b>Regular Tickets</b>
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                        <TableCell colSpan={7} style={{ padding: 0 }}>
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
                                <TableCell >
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
                                    <Typography component="div" sx={{
                                        color: '#ffff', fontSize: 12
                                    }}>
                                        {row.organizar}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                        {row.type}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                        {row.VIPTicket}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography component="div" sx={{ ml: 1, color: '#fff', fontSize: 12 }}>
                                        {row.RegualarTicket}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ '& td': { borderBottom: 'none' }, '& th': { borderBottom: 'none' } }}>
                                <TableCell colSpan={7} style={{ padding: 0 }}>
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
