import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PopularEvent() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card
            className='w-[375px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-30000000'
            sx={{ bgcolor: "#1e1e1e", whiteSpace: 'normal', marginRight: 8 }}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title={
                    <Typography variant="title" component="div" sx={{ color: 'white' }}>
                        Shrimp and Chorizo Paella
                    </Typography>
                }
                subheader={
                    <Typography variant="subheader" component="div" sx={{ color: '#bcbcbc' }}>
                        September 14, 2016
                    </Typography>
                }
            />
            <CardMedia
                component="img"
                height="194"
                image="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG11c2ljJTIwY29uY2VydHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="#bcbcbc">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing >
                <IconButton aria-label="add to favorites" sx={{ color: "white" }}>
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" sx={{ color: "white" }}>
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}