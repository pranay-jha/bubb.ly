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
            {theme: "filled_white", size: "medium"}   
        );

        google.accounts.id.prompt();
    }, []);

    return (
        <>
            <div className={'h-screen w-screen bg-gradient-to-b from-[#102C3C] via-[#34465F] to-[#102C3C]'} onClick={() => {console.log('clicked')}}>
                <ButtonBar user={this.state.user} setUser={this.setUser}/>
                <Footer />
            </div>
        </>
    );
}

const ButtonBar = (props) => {
    return (
        <header className={'py-2 w-screen h-[6.25%] border-b border-slate-300/10 absolute top-0 left-0 flex flex-row items-center'}>
            <div className={'w-1/2 h-[6.25%] flex flex-row justify-start items-center'}>
            Logo goes here
            </div>
            <div className={'w-1/2 h-[6.25%] flex flex-row justify-end items-center'}>
                <ThreeDotsDropdown user={props.user} setUser={props.setUser}/>
                <NewBubbleButton />
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
    const footerStyle = 'mx-1 text-center text-xs text-slate-500';
    return (
        <footer className={'w-screen py-2 border-t border-slate-300/10 absolute bottom-0 left-0 flex flex-row justify-center items-center'}>
            <span className={footerStyle}>Created by Ben Garofalo and Pranay Jha</span>
            <span className={footerStyle}>&#183;</span>
            <a className={footerStyle + ' hover:text-slate-400'} href="https://github.com/pranay-jha/bubb.ly" target="_blank">GitHub</a>
        </footer>
    )
}

const ThreeDotsDropdown = (props) => {
    const [show, setShow] = useState(false);
    const thisStyle = {
        position: 'absolute',
        inset: '0px auto auto 0px', 
        margin: '0px', 
        transform: 'translate3d(1250px, 70px, 0px)'
    };

    function handleSignOut(event) {
        props.setUser({});
        document.getElementById("signInDiv").hidden = true;
    }

    return (
        <>
        <button id="dropdownMenuIconButton" onClick={() => setShow(prev => !prev)} data-dropdown-toggle="dropdownDots" className={'inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg'} type="button">
            <svg className={'w-6 h-6'} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
        </button>

        {show &&
        <div id="dropdownDots" className={'z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow block'} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style={thisStyle}>
            <ul className="py-1 text-sm text-gray-700" aria-labelledby="dropdownMenuIconButton">
                <li>
                    <GoogleButton />
                </li>
                <li>
                    <a href="https://google.com" className="block py-2 px-4 hover:bg-gray-100">Google Calendar</a>
                </li>
                <li>
                    <a href="https://google.com" className="block py-2 px-4 hover:bg-gray-100">Something</a>
                </li>
                <li>
                    <a href="https://google.com" className="block py-2 px-4 hover:bg-gray-100">About</a>
                </li>
                <li>
                    {props.user &&
                    <button onClick={(e) => handleSignOut(e)} className="block py-2 px-4 hover:bg-gray-100 font-semibold">Sign out</button>
                    }
                </li>
            </ul>
        </div>}
        </>
    );
}

const NewBubbleButton = () => {
}

export default App;