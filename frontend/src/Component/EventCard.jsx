import { Typography } from "@mui/material";
import React from "react";
export default function EventCard() {

    return (
        <React.Fragment>
            <div style={{ height: "300px", padding: 20 }}>
                <img
                    src="https://ventic.dexignzone.com/react/demo/static/media/pic6.e76c4775d61fc8a37ffc.jpg"
                    alt="event"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 20 }}
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
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <div style={{ backgroundColor: "#444A52" }}>
                    
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </React.Fragment>
    )
}
