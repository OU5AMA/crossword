import CrosswordBox from "./CrossWordBox";

const CrossWordPuzzle = () => {
    // Example data for the crossword puzzle grid
    const puzzleData = Array.from({length:14}, () => Array.from({length: 14}, ()=>'#'));
    return (
        <div className="corssword-puzzle">
            {puzzleData.map((row, rowIndex) => (
                <div className="crossword-row" key={rowIndex}>
                    {row.map((box, colIndex) => (
                        <CrosswordBox key={colIndex} isBlack={box === '#'} correctAnswer={box} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default CrossWordPuzzle;