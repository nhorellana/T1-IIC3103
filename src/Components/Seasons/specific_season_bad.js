import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, Grid, List, Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useParams } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import NavBar from '../Navbar/navBar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import AppBar from '../Navbar/navBar';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function Specific_season_bad() {
    const [isLoading, setLoading] = useState(true);
    const classes = useStyles();
    let { id } = useParams();
    const [episodes, setEpisode] = useState([]);
    const [this_season, setAllSeasons] = useState([])

    useEffect(() => {
        axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad`)
            .then(response => {
                console.log(response.data);
                setEpisode(response.data)
            })
            .catch((error) => {
                console.log('error' + error);
            })
    }, []);

    useEffect(() => {
        const seasons_temp = [];
        var curr_season = id;
        console.log(episodes);
        for (let i = 0; i < episodes.length; i++){
            if (episodes[i].season == curr_season){
            seasons_temp.push(episodes[i]);
            }
        }
        setAllSeasons(seasons_temp);
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
            <Grid item xs={4}>
            <Typography color="textPrimary" align="left">
            Temporada: {id}
            </Typography>
            <Card className={classes.root}>
                <CardContent>
                <List className={classes.root} subheader={<li />}>
                        <li>
                        <ul className={classes.ul}>
                            {this_season.map((item) => (
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
            </Grid>
        </Box>
        </React.Fragment>
    );
  }
  export default Specific_season_bad;