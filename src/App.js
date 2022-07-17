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
                <Footer />
            </body>
        </>
    );
}


const ButtonBar = () => {
    return (
        <header className={'py-2 w-screen h-[6.25%] border-b border-slate-300/10 absolute top-0 left-0 flex flex-row items-center'}>
            <div className={'w-1/2 h-[6.25%] flex flex-row justify-start items-center'}>
                <span className={'ml-4 border-2 border-white font-[Helvetica] font-bold text-3xl'}>He</span>
                <span className={'font-[Helvetica] font-bold text-3xl'}>lium</span>
            </div>
            <div className={'w-1/2 h-[6.25%] flex flex-row justify-end items-center'}>
                <div className={'mx-4'}>
                    <GoogleButton />    
                </div>
                <button className={'mr-4 font-semibold'}>About</button>
            </div>
        </header>
    )
}

const GoogleButton = () => {
    return (
        <div id="signInDiv">
        </div>
    )
}

const Footer = () => {
    return (
        <footer className={'w-screen py-2 border-t border-slate-300/10 absolute bottom-0 left-0 flex flex-row justify-center items-center'}>
            <span className={'mx-1 text-center text-xs text-slate-500'}>Created by Ben Garofalo and Pranay Jha</span>
            <span className={'mx-1 text-center text-xs text-slate-500'}>&#183;</span>
            <a className={'mx-1 text-center text-xs text-slate-500 hover:text-slate-400'} href={'https://github.com/pranay-jha/bubb.ly'} target={'_blank'}>GitHub</a>
        </footer>
    )
}

export default App;