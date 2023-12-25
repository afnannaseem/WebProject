import PersonIcon from '@mui/icons-material/Person';
import { Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import CopyRight from '../Component/CopyRight';
import OrganizarTable from './OrganizarTable';
export default function Organizar() {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={10}>
                <Grid item xs={12} md={7} lg={4}>
                    <Grid item xs={12}>
                        <div>
                            <Typography component="div" sx={{ mt: 1, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                                <b>Total Organizar</b>
                            </Typography>
                        </div>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 150,
                                minHeight: 150,
                                maxHeight: 150,
                                // bgcolor: '#313844',
                                //bgcolor: '#FB3E7A',
                                bgcolor: '#444A52',
                                borderRadius: 5,
                                overflow: 'auto',
                            }}
                            className='scroll-smooth scrollbar-hide'
                        >
                            <div style={{ display: 'flex', justifyContent: 'start' }}>
                                <div style={{ paddingLeft: 50, display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                                    <PersonIcon sx={{ height: 50, width: 50, mr: 10, color: "#ffff" }} />
                                </div>
                                <div style={{ paddingRight: 10, display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                                    <Typography component="div" sx={{ mt: 1, mb: 2, color: '#ffff', fontSize: 16 }}>
                                        <b>{"Total Organizar"}</b>
                                    </Typography>
                                    <Typography component="div" sx={{
                                        maxWidth: '250px',
                                        height: '40px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        mt: 1, mb: 2, color: '#adb5bd', fontSize: 16,
                                    }}>
                                        {"300"}
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Typography component="div" sx={{ mb: 2, color: '#adb5bd', fontSize: 14 }}>
                            <b>Organizar Detail</b>
                        </Typography>
                    </div>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 3,
                            bgcolor: '#313844',
                            overflow: 'scroll',
                            minHeight: 1000,
                            maxHeight: 1000,
                            height: 1000,
                            maxWidth: '100%',
                        }}
                        className='scroll-smooth scrollbar-hide'
                    >
                        <OrganizarTable type={1} />
                    </Paper>
                </Grid>
            </Grid>
            <CopyRight sx={{ pt: 5, color: "#ffff" }} />
        </Container>
    )
}
