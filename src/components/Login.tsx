import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey"
import Typography from "@material-ui/core/Typography";
import Axios from 'axios';
import {useDispatch} from "react-redux";
import {changeUsername} from "../redux/actions/UsernameActions";
import {changeSignedIn} from "../redux/actions/SignedInActions";

export const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: grey[800],
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: grey[400],
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: grey[400],
            },
            '&:hover fieldset': {
                borderColor: grey[500],
            },
            '&.Mui-focused fieldset': {
                borderColor: grey[600],
            },
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    textField: {
        width: '100%',
        margin: theme.spacing(1),
    },
    buttonDiv: {
        textAlign: 'right',
        margin: theme.spacing(1),
    }
}));

export interface ILoginProps {
    handleSignClose(): void
}

export default function Login(props: ILoginProps) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [email, setEmail] = React.useState<string>('');

    const [password, setPassword] = React.useState<string>('');

    function handleEmailChange(e: any) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: any) {
        setPassword(e.target.value);
    }

    async function handleEnterClick() {
        const user = {
            email: email,
            password: password
        };
        const response = await Axios.post('/user/isValid', user);
        dispatch(changeUsername(response.data.username));
        dispatch(changeSignedIn(true));
        props.handleSignClose();
        setEmail('');
        setPassword('');
    }

    return (
        <div className={classes.root}>
            <CssTextField
                className={classes.textField}
                variant={'outlined'}
                label={'Email'}
                value={email}
                id={'loginTextfield'}
                onChange={handleEmailChange}
            />
            <CssTextField
                className={classes.textField}
                variant={'outlined'}
                label={'Password'}
                value={password}
                type={'password'}
                onChange={handlePasswordChange}
            />
            <div className={classes.buttonDiv}>
                <Button variant={'outlined'} onClick={handleEnterClick}>
                    <Typography variant={'button'}>
                        Sign in
                    </Typography>
                </Button>
            </div>
        </div>
    )
}