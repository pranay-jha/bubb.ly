import React from 'react';
import './styles.css';
import {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';

const App = () => {

    const [user, setUser] = useState({});

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: "145385750304-g53v1ihlt48gu2h7p0nvam0lfqrj1aog.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "filled_black", size: "medium"}   
        );

        google.accounts.id.prompt();
    }, []);

    // no user, show sign in button
    // if we have a user, show sign out button

    return (
        <>
            <body className={'h-screen w-screen bg-gradient-to-b from-[#102C3C] via-[#34465F] to-[#102C3C]'} onClick={() => {console.log('clicked')}}>
                <ButtonBar />
            </body>
        </>
    );
}


const ButtonBar = () => {
    return (
        <header className={'w-screen h-[6.25%] border-b border-slate-300/10 top-0 left-0 flex justify-end items-center'}>
            <img src=""></img>
            <GoogleButton/>
            <button>About</button>
        </header>
    )
}

const GoogleButton = () => {
    return (
        <div id="signInDiv">
        </div>
    )
}

export default App;