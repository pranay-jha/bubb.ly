import React from 'react';
import './styles.css';
import {useEffect, useState, useRef} from 'react';
import jwt_decode from 'jwt-decode';


const App = () => {
    const CLIENT_ID = '145385750304-g53v1ihlt48gu2h7p0nvam0lfqrj1aog.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyDP5e13jE7MnCbJCQBCSAo-foFMxTqYGEM';

    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';

    // Authorization scopes required by the API
    const SCOPES = 'https://www.googleapis.com/auth/tasks';

    const tokenClient = useRef();

    const [user, setUser] = useState({});

    function handleCallbackResponse(response) {
        tokenClient.current.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
        };
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    useEffect(() => {

        /* global gapi */
        /* global google */

        gapi.load('client', intializeGapiClient);

        async function intializeGapiClient() {
            await gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
            console.log('gapi initialized');
        };

        google.accounts.id.prompt();

        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "filled_white", size: "medium"}   
        );

        tokenClient.current = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        
        if (gapi.client.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          tokenClient.current.requestAccessToken({prompt: 'consent'});
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          tokenClient.current.requestAccessToken({prompt: ''});
        }
        console.log('token');
        console.log(gapi.client.getToken());

    }, []);

    return (
        <>
            <div className={'h-screen w-screen bg-gradient-to-b from-[#102C3C] via-[#34465F] to-[#102C3C]'} onClick={() => {console.log('clicked')}}>
                <ButtonBar user={user} setUser={setUser}/>
                <BubbleArea />
                <Footer />
            </div>
        </>
    );
}

const BubbleArea = () => {

}

const ButtonBar = ({user, setUser}) => {
    const [showNBB, setShowNBB] = useState(false);
    const [showTDD, setShowTDD] = useState(false);

    return (
        <header className={'py-2 w-screen h-[6.25%] border-b border-slate-300/10 absolute top-0 left-0 flex flex-row items-center'}>
            <div className={'w-1/2 h-[6.25%] flex flex-row justify-start items-center'}>
            Logo goes here
            </div>
            <div className={'w-1/2 h-[6.25%] flex flex-row justify-end items-center'}>
                <ThreeDotsDropdown user={user} setUser={setUser} showTDD={showTDD} setShowTDD={setShowTDD} showNBB={showNBB} setShowNBB={setShowNBB} />
                <NewBubbleButton user={user} setUser={setUser} showTDD={showTDD} setShowTDD={setShowTDD} showNBB={showNBB} setShowNBB={setShowNBB} />
            </div>
        </header>
    );
}

const Footer = () => {
    const footerStyle = 'mx-1 text-center text-xs text-slate-500';
    return (
        <footer className={'w-screen py-2 border-t border-slate-300/10 absolute bottom-0 left-0 flex flex-row justify-center items-center'}>
            <span className={footerStyle}>Created by Ben Garofalo and Pranay Jha</span>
            <span className={footerStyle}>&#183;</span>
            <a className={footerStyle + ' hover:text-slate-400'} href="https://github.com/pranay-jha/bubb.ly" target="_blank" rel="noreferrer">GitHub</a>
        </footer>
    );
}

const ThreeDotsDropdown = ({user, setUser, showTDD, setShowTDD, showNBB, setShowNBB}) => {
    
    const thisStyle = {
        position: 'absolute',
        inset: '0px auto auto 0px', 
        margin: '0px', 
        transform: 'translate3d(1250px, 70px, 0px)'
    };

    function handleSignOut() {
        const token = gapi.client.getToken();
        console.log(token);
        console.log('trying to sign out');
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            setUser({});
            document.getElementById("signInDiv").hidden = false;
            console.log('signed out');
        }
    };

    function handleClick() {
        if (showNBB === true) {
            setShowNBB(false);
            setShowTDD(true);
        }
        else {
            setShowTDD(prev => !prev);
        }
    };

    return (
        <>
        <button id="dropdownMenuIconButton" onClick={handleClick} data-dropdown-toggle="dropdownDots" className={'inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg'} type="button">
            <svg className={'w-6 h-6'} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
        </button>
        {showTDD &&
        <div id="dropdownDots" className={'z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow block'} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style={thisStyle}>
            <ul className="py-1 text-sm text-gray-700" aria-labelledby="dropdownMenuIconButton">
                <li>
                    <div id="signInDiv"></div>
                </li>
                <li>
                    {Object.keys(user).length !== 0 &&
                    <a id="calendarLink" className="block py-2 px-4 hover:bg-gray-100" href="https://calendar.google.com/calendar/u/0/r" target="_blank" rel="noreferrer">Google Calendar</a>
                    }
                </li>
                <li>
                    <a href="https://google.com" className="block py-2 px-4 hover:bg-gray-100">Something</a>
                </li>
                <li>
                    <a href="https://google.com" className="block py-2 px-4 hover:bg-gray-100">About</a>
                </li>
                <li>
                    {Object.keys(user).length !== 0 &&
                    <button onClick={handleSignOut} className="block py-2 px-4 hover:bg-gray-100 font-semibold">Sign out</button>
                    }
                </li>
            </ul>
        </div>}
        </>
    );
}

const NewBubbleButton = ({user, setUser, showTDD, setShowTDD, showNBB, setShowNBB}) => {

    const thisStyle = {
        position: 'absolute',
        inset: '0px auto auto 0px', 
        margin: '0px', 
        transform: 'translate3d(1000px, 70px, 0px)'
    };

    const dummyStyle = {
        display: 'none'
    };

    function handleClick() {
        if (showTDD === true) {
            setShowTDD(false);
            setShowNBB(true);
        }
        else {
            setShowNBB(prev => !prev);
        }
    };

    function handleSubmit() {
        setShowNBB(prev => !prev);
        const title = document.getElementById('bubbleTitle').value;
        const datetime = document.getElementById('bubbleTime').value;
        const desc = document.getElementById('desc').value;
        console.log(title + desc + datetime);
    }


    return (
        <>
            <iframe title="dummyframe" name="dummyframe" id="dummyframe" style={dummyStyle}></iframe>

            <button onClick={handleClick}>
                New Bubble Test
            </button>
            {showNBB &&
            <div className="bg-white rounded p-2" style={thisStyle}>
                <form target="dummyframe">
                    <div className="mb-3">
                        <label htmlFor="bubbleTitle" className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                        <input type="title" id="bubbleTitle" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="finish math hw" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bubbleTime" className="block mb-2 text-sm font-medium text-gray-700">Date and Time</label>
                        <input type="datetime-local" id="bubbleTime" name="bubbleTime" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div> 
                    <div className="mb-3">
                        <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                        <input type="desc" id="desc" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="pg 479 #1-11 odd" />
                    </div> 
                    <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create Bubble</button>
                </form>
            </div>}
        </>
    );
}

export default App;