import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Card from "@material-ui/core/Card";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import {makeStyles} from "@material-ui/core/styles";
import {red} from '@material-ui/core/colors';
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

export default function Login() {
    const useStyles = makeStyles(theme => ({
        root: {
            maxWidth: 345,
            margin: 'auto',
            marginTop: '5%', // 16:9
        },
        margin: {
            display: "flex",
            margin: "10px",
            marginTop: "5%"
        },
        button: {
            display: "flex",
            margin: "10px",
            width: "95%",
            marginTop: "10%"
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
        textCenter: {
            textAlign:"center",
        }
    }));

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <h1 className={classes.textCenter}>Signaleo</h1>
            <form>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Teny miafina</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                >Hiditra</Button>
            </form>
        </Card>
    )
}