import { Card, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import Chart from '../Component/Chart';
import CopyRight from '../Component/CopyRight';
import EventRequest from '../Component/EventRequest';
import EventStatus from '../Component/EventStatus';
import RevenueChart from '../Component/RevenueCart';
import PendingRequest from '../Component/pendingRequest';
import TopEvenOrganizer from '../Component/topEvenOrganiver';


export default function Dashboard() {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <div>
                        <Typography component="div" sx={{ mt: 1, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                            <b>Weekly Sale</b>
                        </Typography>
                    </div>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 290,
                            bgcolor: '#313844', overflow: 'scroll'
                        }}
                        className='scroll-smooth scrollbar-hide'
                    >
                        <Chart />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <div>
                        <Typography component="div" sx={{ mt: 1, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                            <b>Weekly Revenue</b>
                        </Typography>
                    </div>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 290,
                            bgcolor: '#313844', overflow: 'scroll'
                        }}
                        className='scroll-smooth scrollbar-hide'
                    >
                        <RevenueChart />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Typography component="div" sx={{ mt: 6, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                            <b>Event Request</b>
                        </Typography>
                    </div>
                    <Paper sx={{
                        p: 2, display: 'flex', flexDirection: 'column',
                        mb: 3
                        , bgcolor: '#313844', overflow: 'scroll',
                        minHeight: 400, maxHeight: 400,
                        maxWidth: "100%"
                    }}
                        className='scroll-smooth scrollbar-hide'
                    >
                        <EventRequest />
                    </Paper>
                </Grid>
            </Grid>
            <div>
                <Typography component="div" sx={{ mt: 5, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                    <b>Top Event Organizer</b>
                </Typography>
            </div>
            <Grid container spacing={2} >
                <Grid item xs={12} md={4} lg={3}  >
                    <TopEvenOrganizer />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <TopEvenOrganizer />              </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <TopEvenOrganizer />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <TopEvenOrganizer />
                </Grid>
            </Grid>
            <Grid container spacing={4} sx={{ mt: 5 }} >
                <Grid item xs={12} md={12} lg={5}  >
                    <div>
                        <Typography component="div" sx={{ mt: 1, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                            <b>Pending Request</b>
                        </Typography>
                    </div>
                    <Card className='scroll-smooth scrollbar-hide' sx={{ minHeight: 400, maxHeight: 400, pl: 2, pt: 2, pb: 2, pr: 2, display: 'flex', flexDirection: 'column', bgcolor: '#313844', overflow: 'scroll' }}>
                        <Typography component="div" sx={{ ml: 3, mt: 1, mb: 2, color: '#fff', fontSize: 14 }}>
                            <b>Pending Request</b>
                        </Typography>
                        <PendingRequest />
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={7}>
                    <div>
                        <Typography component="div" sx={{ mt: 1, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                            <b>Event Status</b>
                        </Typography>

                    </div>
                    <Card className='scroll-smooth scrollbar-hide' sx={{ minHeight: 400, maxHeight: 400, pl: 2, pt: 2, pb: 2, pr: 2, display: 'flex', flexDirection: 'column', bgcolor: '#313844', overflow: 'scroll' }}>
                        <Typography component="div" sx={{ ml: 3, mt: 1, mb: 1, color: '#fff', fontSize: 14 }}>
                            <b>Event Status</b>
                        </Typography>
                        <EventStatus />
                    </Card>
                </Grid>
            </Grid>
            <CopyRight sx={{ pt: 5, color: "#ffff" }} />
        </Container>
    )
}
