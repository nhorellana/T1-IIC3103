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

function Episode() {
    const [isLoading, setLoading] = useState(true);
    const classes = useStyles();
    let { id } = useParams();
    const [episode_info, setEpisode] = useState({});

    useEffect(() => {
        axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${id}`)
                .then(response => {
                    console.log(response.data[0]);
                    setEpisode(response.data[0]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('error' + error);
                })
        }, []);

    function search(item)
    {
        const name = item;
        name.replace(/\s/g, '+')
        console.log(name)
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
        }

    return (
        <React.Fragment>
        <NavBar />
        <Box p={10}
         style={{textAlign: "center"}}>
            <Grid
                container
                spacing={2}
                direction='row'
                justify="left"
                xs={12}
                md={12}
                >
                    <Grid item xs={6}>
                    <Typography color="textPrimary" align="left">
                        {episode_info.title}
                    </Typography>
                        <Card className={classes.root}>
                            <CardContent>
                            <List className={classes.root} subheader={<li />}>
                                    <li>
                                    <ul className={classes.ul}>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    ID: {episode_info.episode_id}
                                                </Typography>
                                                }
                                                />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    Temporada: {episode_info.season}
                                                </Typography>
                                                }
                                                />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    Fecha: {episode_info.air_date}
                                                </Typography>
                                                }
                                                />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                Serie: {episode_info.series}
                                                </Typography>
                                                }
                                                />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    Personajes:
                                                </Typography>
                                                }
                                                />
                                            <List>
                                                <li>
                                                <ul>
                                                {episode_info.characters.map((character) => (
                                                <ListItem >
                                                    <ListItemText
                                                    disableTypography
                                                    primary={
                                                    <Typography variant="body2">
                                                        <Link color="inherit" href={`/character/${character.replace(/\s/g, '+')}`}>
                                                        {character}
                                                        </Link>
                                                    </Typography>
                                                    }
                                                    />
                                                </ListItem> ))}
                                                </ul>
                                                </li>
                                            </List>
                                        </ListItem>
                                    </ul>
                                    </li>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
        </ Box>
        </React.Fragment>
    );
  }
  export default Episode;