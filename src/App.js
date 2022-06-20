import React from 'react';
import './styles.css';

const App = () => {
    return (
        <>
            <NewBubbleButton />
        </>
    );
}
// first commit comment

const NewBubbleButton = () => {
    return (
        <button className="newBubbleButton">
            +
        </button>
    )
}
export default App;