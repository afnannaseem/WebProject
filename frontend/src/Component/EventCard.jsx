import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChairIcon from '@mui/icons-material/Chair';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
export default function EventCard() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <React.Fragment>
            <div style={{ height: "300px", width: "100%", padding: 20 }}>
                <img
                    src="https://ventic.dexignzone.com/react/demo/static/media/pic6.e76c4775d61fc8a37ffc.jpg"
                    alt="event"
                    style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 20 }}
                />
            </div>
            <div style={{ paddingLeft: 20 }}>
                <Typography component="div" sx={{ mt: 1, mb: 2, color: '#ffff', fontSize: 25 }}>
                    <b>{"Envato International Online Meetup 2023"}</b>
                </Typography>
            </div>
            <div style={{ paddingLeft: 20 }}>
                <Typography component="div" sx={{ mt: 1, mb: 2, color: '#adb5bd', fontSize: 14 }}>
                    repudiandae aperiam atque assumenda, asperiores consectetur. Est voluptates aut beatae libero quos magnam veritatis saepe sequi harum explicabo unde cupiditate, blanditiis tempore debitis officiis nam, deleniti ullam? Voluptatum, at eos error cum praesentium aspernatur repellat, cumque perspiciatis alias, autem debitis. Enim natus esse aspernatur fugiat doloremque sapiente pariatur corrupti mollitia dicta accusantium tenetur velit placeat, totam provident! Dicta ullam soluta optio illum, quos, itaque commodi deserunt quidem iure ipsa error non voluptatem corrupti. Quibusdam tenetur qui aspernatur quis aperiam velit fuga omnis commodi dolorem odio perspiciatis reiciendis sequi fugit explicabo ab, repudiandae unde sit recusandae atque doloribus? Perferendis laudantium numquam facere et voluptatum.
                </Typography>
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", paddingLeft: 15, paddingRight: 15, alignItems: "center", flexDirection: windowWidth < 1500 ? "column" : "row" }}>
                <div style={{
                    backgroundColor: "#444A52", width: "300px", padding: 10, borderRadius: 20, marginBottom: windowWidth < 1500 ? 20 : 0
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ paddingLeft: 50, display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                            <ChairIcon sx={{ height: 50, width: 50, color: "#ffff" }} />
                        </div>
                        <div style={{ paddingRight: 10, display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                            <Typography component="div" sx={{ mt: 1, mb: 2, color: '#ffff', fontSize: 16 }}>
                                <b>Total Seats</b>
                            </Typography>
                            <Typography component="div" sx={{
                                maxWidth: '150px',
                                height: '40px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis', mt: 1, mb: 2, color: '#adb5bd', fontSize: 16
                            }}>
                                {55}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div style={{
                    backgroundColor: "#444A52", width: "300px", padding: 10, borderRadius: 20, marginBottom: windowWidth < 1500 ? 20 : 0
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ paddingLeft: 50, display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                            <CalendarMonthIcon sx={{ height: 50, width: 50, color: "#ffff" }} />
                        </div>
                        <div style={{ paddingRight: 10, display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                            <Typography component="div" sx={{
                                maxWidth: '150px',
                                height: '40px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis', mt: 1, mb: 2, color: '#ffff', fontSize: 16
                            }}>
                                <b>Date</b>
                            </Typography>
                            <Typography component="div" sx={{ mt: 1, mb: 2, color: '#adb5bd', fontSize: 16 }}>
                                {"22-05-2023"}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div style={{
                    backgroundColor: "#444A52", width: "300px", padding: 10, borderRadius: 20, marginBottom: windowWidth < 1500 ? 20 : 0
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ paddingLeft: 50, display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                            <LocationOnIcon sx={{ height: 50, width: 50, color: "#ffff" }} />
                        </div>
                        <div style={{ paddingRight: 10, display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                            <Typography component="div" sx={{ mt: 1, mb: 2, color: '#ffff', fontSize: 16 }}>
                                <b>Location</b>
                            </Typography>
                            <Typography component="div" sx={{
                                maxWidth: '150px',
                                height: '40px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                mt: 1, mb: 2, color: '#adb5bd', fontSize: 16,
                            }}>
                                {"Bangkok Thailand Pakkred kjklsdjkljfkldsajlkjfdlkjklajldksjls "}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
