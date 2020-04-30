import React from 'react';
import Paper from "@material-ui/core/Paper";
import {CssTextField} from './Login'
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        height: theme.spacing(30)
    },
    paper: {
        width: '45%',
        height: '100%',
        margin: 'auto',
        position: 'relative'
    },
    postTextField: {
        margin: theme.spacing(1),
        width: '97.5%',
        height: '60%',
    },
    postButton: {
        margin: theme.spacing(1),
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    cancelButton: {
        margin: theme.spacing(1),
        position: 'absolute',
        bottom: 0,
        left: 0
    }
}));

export interface iCreatePost {
    setPostHide(hide: boolean): void,
    sendMessage(): void,
    setMessageToSend: any
}

export default function CreatePost(props: iCreatePost) {
    const classes = useStyles();

    const [post, setPost] = React.useState<string>('');

    function handlePostChange(e: any) {
        setPost(e.target.value);
        props.setMessageToSend(e.target.value);
    }

    async function handlePostClick() {
        props.sendMessage();
        setPost('');
    }

    function handleCancelClick() {
        props.setPostHide(true);
        setPost('');
    }

    return (
        <div className={classes.root}>
            <Paper variant={'outlined'} className={classes.paper} square>
                <CssTextField
                    multiline
                    variant={'outlined'}
                    label={'Write something...'}
                    className={classes.postTextField}
                    rows={'7'}
                    onChange={handlePostChange}
                    value={post}
                />
                <Button variant={'outlined'}
                        className={classes.cancelButton}
                        onClick={handleCancelClick}
                >
                    CANCEL
                </Button>
                <Button variant={'outlined'}
                        className={classes.postButton}
                        onClick={handlePostClick}
                >
                    SEND
                </Button>
            </Paper>
        </div>
    )
}