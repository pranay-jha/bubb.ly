import React from 'react';
import './styles.css';

const App = () => {
    return (
        <>
            <NewBubbleButton />
        </>
    );
}

const NewBubbleButton = () => {
    return (
        <button className="newBubbleButton">
            +
        </button>
    )
}
export default App;