import React, { useState, useEffect } from "react";
import { red } from '@material-ui/core/colors';
import { Button, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../Navbar/navBar';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

function Saul_Seasons() {
    const [isLoading, setLoading] = useState(true);
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [episodes, setEpisode] = useState([]);
    const [seasons, setAllseasons] = useState([]);

    useEffect(() => {
    axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul`)
            .then(response => {
                console.log(response.data);
                setEpisode(response.data)
            })
            .catch((error) => {
                console.log('error' + error);
            })
    }, []);

    useEffect(() => {
    const seasons_temp = [[]];
    var curr_season = 1;
    console.log(episodes);
    for (let i = 0; i < episodes.length; i++){
        if (episodes[i].season == curr_season){
        seasons_temp[curr_season - 1].push(episodes[i]);
        }
        else{
        curr_season ++;
        seasons_temp.push([]);
        seasons_temp[curr_season - 1].push(episodes[i]);
        }
    }
    setAllseasons(seasons_temp);
    console.log(seasons);
    setLoading(false);
    }, [episodes]);

    if (isLoading) {
      return <div className="App">Loading...</div>;
      }

    return (
        <React.Fragment>
            <AppBar />  
            <Box p={10}>
                <Grid
                container
                spacing={6}
                direction='row'
                justify="left"
                xs={6}
                md={12}
                >
                {seasons.map((post, index) => (
                    <Grid item xs={4}>
                    <Typography color="textPrimary" align="left">
                    Temporada: {index + 1}
                    </Typography>
                    <Card className={classes.root}>
                        <CardContent>
                        <List className={classes.root} subheader={<li />}>
                                <li>
                                <ul className={classes.ul}>
                                    {post.map((item) => (
                                    <ListItem key={item.episode_id.toString()}>
                                        <ListItemText
                                        disableTypography
                                        primary={
                                        <Typography variant="body2">
                                            <Link color="inherit" href={`/episode/${item.episode_id}`}>
                                            Episodio {item.episode}: {item.title}
                                            </Link>
                                        </Typography>
                                        }
                                        />
                                    </ListItem> ))}
                                </ul>
                                </li>
                            </List>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Box>
        </React.Fragment>
    );
  }
  export default Saul_Seasons;