import React from 'react';
import Paper from "@material-ui/core/Paper";
import {CssTextField} from "./Login";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(55),
            height: theme.spacing(68.5),
        },
        marginLeft: '37.5%'
    },
    textField: {
        width: '95.5%',
        margin: theme.spacing(1),
    },
    nameField: {
        width: '45.75%',
        margin: theme.spacing(1),
    },
    registerButton: {
        margin: theme.spacing(1),
    },
    signInDiv: {
        margin: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(1),
    }
}));

export default function Register() {
    const classes = useStyles();

    const [firstName, setFirstName] = React.useState<string>('');

    const [lastName, setLastName] = React.useState<string>('');

    const [email, setEmail] = React.useState<string>('');

    const [username, setUsername] = React.useState<string>('');

    const [password, setPassword] = React.useState<string>('');

    const [confirmPassword, setConfrimPassword] = React.useState<string>('');

    function handleFirstNameChange(e: any) {
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e: any) {
        setLastName(e.target.value);
    }

    function handleEmailChange(e: any) {
        setEmail(e.target.value);
    }

    function handleUsernameChange(e: any) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e: any) {
        setPassword(e.target.value);
    }

    function handleConfirmPasswordChange(e: any) {
        setConfrimPassword(e.target.value);
    }

    async function handleRegisterClick() {
        const user = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email
        };
        const response = await Axios.post('/user', user);
        console.log(response.status);
        setFirstName('');
        setLastName('');
        setEmail('');
        setUsername('');
        setPassword('');
        setConfrimPassword('');
    }

    return(
        <div className={classes.root}>
            <Paper variant={'outlined'}>
                <Typography variant={'h1'}>
                    register
                </Typography>
                <Divider variant={'middle'} className={classes.divider}/>
                <div>
                    <CssTextField
                        label={'First Name'}
                        variant={'outlined'}
                        className={classes.nameField}
                        onChange={handleFirstNameChange}
                        value={firstName}
                    />
                    <CssTextField
                        label={'Last Name'}
                        variant={'outlined'}
                        className={classes.nameField}
                        onChange={handleLastNameChange}
                        value={lastName}
                    />
                </div>
                <CssTextField
                    label={'Email'}
                    variant={'outlined'}
                    className={classes.textField}
                    onChange={handleEmailChange}
                    value={email}
                />
                <CssTextField
                    label={'Username'}
                    variant={'outlined'}
                    className={classes.textField}
                    onChange={handleUsernameChange}
                    value={username}
                />
                <CssTextField
                    label={'Password'}
                    variant={'outlined'}
                    className={classes.textField}
                    type={'password'}
                    onChange={handlePasswordChange}
                    value={password}
                />
                <CssTextField
                    label={'Confirm Password'}
                    variant={'outlined'}
                    className={classes.textField}
                    type={'password'}
                    onChange={handleConfirmPasswordChange}
                    value={confirmPassword}
                />
                <Button variant={'outlined'} className={'registerButton'} onClick={handleRegisterClick}>
                    <Typography variant={'button'}>
                        Register Now
                    </Typography>
                </Button>
                <div className={classes.signInDiv}>
                    <Typography variant={'body1'}>
                        Already have an account? Sign in
                    </Typography>
                </div>
            </Paper>
        </div>
    )
}