import React from 'react';
import InputBase from "@material-ui/core/InputBase";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import Login from "./Login";
import {IRootReducer} from "../redux/IRootReducer";
import {useSelector} from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useDispatch} from "react-redux";
import {changeSignedIn} from "../redux/actions/SignedInActions";
import Axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            backgroundColor: 'white',
            margin: 0,
            display: 'inline-block'
        },
        input: {
            flex: 1,
            marginLeft: theme.spacing(1),
        },
        searchBar: {
            width: 'fit-content',
            marginLeft: '32%',
            display: 'inline-block',
            backgroundColor: '#fafafa',
            borderRadius: '0.5rem'
        },
        signInButton: {
            display: 'inline-block',
            width: 'fit-content',
            marginLeft: '30%',
        },
        iconButton: {
            display: 'inline-block',
            marginLeft: '30%'
        },
        homeButton: {
            marginLeft: '8%'
        },
        registerButton: {
            marginLeft: theme.spacing(1)
        }
    })
);

export interface IHeading {
    history: any
}

export default function Heading(props: IHeading) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [openSignIn, setOpenSignIn] = React.useState<boolean>(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const signedIn: boolean = useSelector<IRootReducer, boolean>(
        state => state.signedInReducer.signedIn
    );

    const username: string = useSelector<IRootReducer, string>(
        state => state.usernameReducer.username
    );

    function handleSignInClick() {
        setOpenSignIn(true);
    }

    function handleSignInClose() {
        setOpenSignIn(false);
    }

    function handleAccountClose() {
        setAnchorEl(null);
    }

    function handleAccountOpen(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    async function handleLogoutClick() {
        await Axios.post('/user/logout');
        dispatch(changeSignedIn(false));
        setAnchorEl(null);
    }

    return (
        <AppBar className={classes.heading} variant={'outlined'} position={'sticky'}>
            <Button className={classes.homeButton} variant={'outlined'} onClick={() => props.history.push('/')}>
                Home
            </Button>
            <Grid container alignItems={'center'} className={classes.searchBar}>
                <InputBase className={classes.input} placeholder={'Search'} />
                <IconButton>
                    <SearchIcon style={{color: 'black', fontSize: 25}} />
                </IconButton>
            </Grid>
            {!signedIn &&
                <Button variant={'outlined'} className={classes.signInButton} onClick={handleSignInClick}>
                    Sign in
                </Button>
            }
            {!signedIn &&
                <Button variant={'outlined'} className={classes.registerButton} onClick={() => props.history.push('/register')}>
                    Register
                </Button>
            }
            {signedIn &&
                <IconButton className={classes.iconButton} onClick={handleAccountOpen}>
                    <Avatar>{username.substring(0,1)}</Avatar>
                </IconButton>
            }
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleAccountClose}
            >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
            <Dialog open={openSignIn} onClose={handleSignInClose} style={{maxWidth: '20rem', margin: 'auto'}}>
                <DialogTitle id="simple-dialog-title">sign in</DialogTitle>
                <Login handleSignClose={handleSignInClose}/>
            </Dialog>
        </AppBar>
    )
}