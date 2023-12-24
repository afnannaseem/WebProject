import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useBoard } from "../Hooks/useMainBoard";
const style = {
  color: "#ffff",
};
const style2 = {
  color: "#adb5bd",
};
const hover = {
  "&:hover": { backgroundColor: "#3D4551" },
};

export default function MainListItems() {
  const { setName } = useBoard();
  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          setName("Dashboard");
        }}
        sx={hover}
      >
        <ListItemIcon sx={style}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText sx={style2} primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setName("Events");
        }}
        sx={hover}
      >
        <ListItemIcon sx={style}>
          <EventIcon />
        </ListItemIcon>
        <ListItemText sx={style2} primary="Events" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setName("Organizer");
        }}
        sx={hover}
      >
        <ListItemIcon sx={style}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText sx={style2} primary="Organizer" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setName("Vendors");
        }}
        sx={hover}
      >
        <ListItemIcon sx={style}>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText sx={style2} primary="Vendors" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setName("Sales");
        }}
        sx={hover}
      >
        <ListItemIcon sx={style}>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText sx={style2} primary="Sales" />
      </ListItemButton>
    </React.Fragment>
  );
}
