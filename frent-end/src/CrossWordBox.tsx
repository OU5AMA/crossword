import { useState } from "react";


const CrosswordBox = ({ isBlack, correctAnswer }) => {

    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    const handleChange = (event) => {
        const { value } = event.target;
        setInputValue(value.toUpperCase()); // Convert the input to uppercase
        setIsCorrect(value.toUpperCase() === correctAnswer.toUpperCase());
    };
    
    return (
        <input
            type="text"
            className={`corssword-box ${isBlack ? 'black-box' : ''} ${isCorrect ? 'correct' : 'incorrect'}`}
            maxLength={1}
            value={inputValue}
            onChange={handleChange}
            disabled={isBlack}
        />
    );
}

export default CrosswordBox;