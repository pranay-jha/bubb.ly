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
            {theme: "outline", size: "large"}   
        );

        google.accounts.id.prompt();
    }, []);

    // no user, show sign in button
    // if we have a user, show sign out button

    return (
        <>
            <body className={'h-screen w-screen bg-[#1B4965]'} onClick={() => {console.log('clicked')}}>
                <ButtonBar />
            </body>
        </>
    );
}

const ButtonBar = () => {
    return (
        <div className={'w-screen h-50 absolute top-0 right-0 left-0 bg-[#102C3C] flex justify-center items-center'}>
            <GoogleButton/>
        </div>
    )
}

const GoogleButton = () => {
    return (
        <div id="signInDiv">
        </div>
    )
}

export default App;