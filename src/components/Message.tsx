import React from 'react'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple, red, indigo, green, lime } from '@material-ui/core/colors';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    messagePaper: {
        width: '45%',
        margin: 'auto',
        position: 'relative',
        height: theme.spacing(30)
    },
    body: {
        margin: theme.spacing(1),
        width: '95%'
    },
    replyButton: {
        margin: theme.spacing(1),
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    avatarOrange: {
        backgroundColor: deepOrange[400]
    },
    avatarPurple: {
        backgroundColor: deepPurple[400]
    },
    avatarRed: {
        backgroundColor: red[400]
    },
    avatarIndigo: {
        backgroundColor: indigo[400]
    },
    avatarGreen: {
        backgroundColor: green[400]
    },
    avatarLime: {
        backgroundColor: lime[400]
    }
}));

export interface iMessageProps {
    name: string,
    message: string
}

export default function Message(props: iMessageProps) {
    const classes = useStyles();

    const randomNum = Math.floor(Math.random() * 6);

    let avatarName;

    if(randomNum === 0)
        avatarName = classes.avatarOrange;
    else if(randomNum === 1)
        avatarName = classes.avatarGreen;
    else if(randomNum === 2)
        avatarName = classes.avatarIndigo;
    else if(randomNum === 3)
        avatarName = classes.avatarRed;
    else if(randomNum === 4)
        avatarName = classes.avatarLime;
    else
        avatarName = classes.avatarPurple;

    return (
        <div>
            <Paper className={classes.messagePaper} variant={'outlined'} square>
                <IconButton>
                    <Avatar className={avatarName}>{props.name.substring(0,1)}</Avatar>
                </IconButton>
                <Typography variant={'body1'} className={classes.body}>
                    {props.message}
                </Typography>
                <Button variant={'outlined'} className={classes.replyButton}> Reply </Button>
            </Paper>
        </div>
    )
}