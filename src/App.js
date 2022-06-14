import React from 'react';
import './styles.css';

const App = () => {
    return (
        <>
        <h1 className="text-3xl font-bold underline">Test</h1>
        <NewBubbleButton />
        </>
    );
}

const NewBubbleButton = () => {
    return (
        <button className="w-24 h-24 rounded-full bg-blue-500 hover:bg-red-500 text-white text-5xl text-center">
            +
        </button>
    )
}
export default App;