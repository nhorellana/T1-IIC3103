import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { red } from '@material-ui/core/colors';
import axios from 'axios'
import NavBar from '../Navbar/navBar';
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';

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
    photo: {
        height: "420px",
        width: "300px"
    }
  }));

function Rol() {
    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const classes = useStyles();
    let { name } = useParams();
    const [character_info, setCharacter] = useState({});
    const [quotes, setQuotes] = useState([]);
    const [is_quote, setIstherequote] = useState(false);

    useEffect(() => {
        axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${name}`)
                .then(response => {
                    console.log(name)
                    console.log(response.data[0]);
                    setCharacter(response.data[0]);
                })
                .catch((error) => {
                    console.log('error' + error);
                })
        setLoading1(false);
        }, []);

    useEffect(() => {
        axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${name}`)
                .then(response => {
                    console.log(response.data[0]);
                    setQuotes(response.data)
                    setIstherequote(true);
                })
                .catch((error) => {
                    console.log("Hubo un error");
                    console.log('error' + error);
                })
        setLoading2(false);
        }, []);

    if (isLoading1 || isLoading2) {
        return <div className="App">Loading...</div>;
        }

    return (
        <React.Fragment>
        <NavBar />
        <Box p={10}>
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
                        {character_info.name}
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
                                                    ID: {character_info.char_id}
                                                </Typography>
                                                }
                                                />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    Apodo: {character_info.nickname}
                                                </Typography>
                                                }
                                                />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    Actor: {character_info.portrayed}
                                                </Typography>
                                                }
                                                />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    Serie: {character_info.category}
                                                </Typography>
                                                }
                                                />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    Status: {character_info.status}
                                                </Typography>
                                                }
                                                />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    Ocupacion: {"   "+character_info.occupation}
                                                </Typography>
                                                }
                                                />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    Temporadas en las que aparece (Breaking bad):
                                                </Typography>
                                                }
                                                />
                                                {character_info.appearance ? (
                                                        <List>
                                                            <li>
                                                            <ul>
                                                            {character_info.appearance.map((episode) => (
                                                            <ListItem >
                                                                <ListItemText
                                                                disableTypography
                                                                primary={
                                                                <Typography variant="body2">
                                                                    <Link href={`/season_bad/${episode}`} color='inherit'>
                                                                    {episode}
                                                                    </Link>
                                                                </Typography>
                                                                }
                                                                />
                                                            </ListItem> ))}
                                                            </ul>
                                                            </li>
                                                        </List>
                                                    ) : (
                                                        "Ninguna"
                                                    )}
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    Temporadas en las que aparece (Better call Saul):
                                                </Typography>
                                                }
                                                />
                                                {character_info.better_call_saul_appearance ? (
                                                        <List>
                                                            <li>
                                                            <ul>
                                                            {character_info.better_call_saul_appearance.map((episode) => (
                                                            <ListItem >
                                                                <ListItemText
                                                                disableTypography
                                                                primary={
                                                                <Typography variant="body2">
                                                                    <Link href={`/season_saul/${episode}`} color='inherit'>
                                                                    {episode}
                                                                    </Link>
                                                                </Typography>
                                                                }
                                                                />
                                                            </ListItem> ))}
                                                            </ul>
                                                            </li>
                                                        </List>
                                                    ) : (
                                                        "Ninguna"
                                                    )}
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                <Typography variant="body2">
                                                    Frases:
                                                </Typography>
                                                }
                                                />
                                                {is_quote ? (
                                                        <List>
                                                            <li>
                                                            <ul>
                                                            {quotes.map((quote) => (
                                                            <ListItem >
                                                                <ListItemText
                                                                disableTypography
                                                                primary={
                                                                <Typography variant="body2">
                                                                    {quote.quote}
                                                                </Typography>
                                                                }
                                                                />
                                                            </ListItem> ))}
                                                            </ul>
                                                            </li>
                                                        </List>
                                                    ) : (
                                                        "Ninguna"
                                                    )}
                                        </ListItem>
                                    </ul>
                                    </li>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} lg={6}>
                        <img src={character_info.img} className={classes.photo} />
                    </Grid>
                </Grid>
        </ Box>
        </React.Fragment>
    );
  }
  export default Rol;