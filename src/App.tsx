import React from 'react';
import Register from './components/Register';
import Heading from "./components/Heading";
import CreatePost from "./components/CreatePost";
import CreateIcon from '@material-ui/icons/Create';
import Fab from "@material-ui/core/Fab";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import Message from "./components/Message";
import {useDispatch, useSelector} from "react-redux";
import {IRootReducer} from "./redux/IRootReducer";
import Axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {changeSignedIn} from "./redux/actions/SignedInActions";
import {changeUsername} from "./redux/actions/UsernameActions";

const theme = createMuiTheme({
    typography: {
        h1: {
            fontWeight: 'bold',
            fontSize: '5rem',
            fontFamily: 'Roboto, sans-serif',
        },
        subtitle1: {
            fontSize: 12,
        },
        body1: {
            fontFamily: 'Open Sans, sans-serif',
        },
        button: {
            fontFamily: 'Roboto, sans-serif',
        }
    },
});

export interface IEntry {
    message: string,
    username: string
}

function App() {

    const [webSocket, setWebSocket] = React.useState();

    const [messages, setMessages] = React.useState([]);

    const [messageToSend, setMessageToSend] = React.useState();

    const dispatch = useDispatch();

    React.useEffect(() => {

        // Session based authentication should happen here]
        Axios.get('/requiredCookieRoute').then(function (response) {
            if(response.status === 200) {
                dispatch(changeUsername(response.data));
                dispatch(changeSignedIn(true));
            }
        });

        Axios.get('/entry').then(function (response){
            setMessages(response.data);
        });

        const webSocket = new WebSocket('ws://localhost:5000');

        setWebSocket(webSocket);

        webSocket.onmessage = (message) => {

            const messageData = JSON.parse(message.data);
            setMessages(messages => messages.concat(messageData));
        };

        return () => webSocket.close();
    }, []);

    const username: string = useSelector<IRootReducer, string>(
        state => state.usernameReducer.username
    );

    const signedIn: boolean = useSelector<IRootReducer, boolean>(
        state => state.signedInReducer.signedIn
    );

    const [postHide, setPostHide] = React.useState<boolean>(true);

    function sendMessage() {

        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            const post = {
                message: messageToSend,
                username: username
            };
            webSocket.send(JSON.stringify(post));
        }
    }

    function togglePost() {
        if(postHide)
            window.scroll(0,0);
        setPostHide(!postHide);
    }

    return (
    <div>
        <ThemeProvider theme={theme}>
            <Router>
                <Route render={({history}) => (<Heading history={history}/>)} />
                <Route exact={true} path={'/'}>
                    {!postHide && <CreatePost setPostHide={setPostHide} sendMessage={sendMessage} setMessageToSend={setMessageToSend}/>}
                    {messages.slice(0).reverse().map((entry:IEntry) => {
                        return <Message name={entry.username} message={entry.message}/>;
                    })}
                    {signedIn &&
                    <Fab style={{
                        position: 'fixed',
                        bottom: 0,
                        right: 0,
                        margin: '2.5rem',
                        height: '4.25rem',
                        width: '4.25rem',
                        backgroundColor: teal[300]
                    }}
                         onClick={togglePost}
                    >
                        <CreateIcon style={{fontSize: '2rem'}}/>
                    </Fab>
                    }
                </Route>
                <Route exact={true} path={'/register'}>
                    <Register />
                </Route>
            </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;
