import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, Grid, Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useParams } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import NavBar from '../Navbar/navBar';

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
        <Container maxWidth="sm">
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Titulo: {episode_info.title}</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>Temporada: {episode_info.season}</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>Episodio: {episode_info.episode}</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>Fecha: {episode_info.air_date}</Paper>
                </Grid>
                {episode_info.characters.map((item) => (
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Link color="inherit" href={`/character/${item.replace(/\s/g, '+')}`}>{item}</Link>
                    </Paper>
                </Grid>
                ))}
            </Grid>
        </div>
        </Container>
        </React.Fragment>
    );
  }
  export default Episode;