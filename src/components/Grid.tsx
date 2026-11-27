import { useState, useEffect } from "react"
import Row from "./Row";

interface GridProps {
    alreadyWon: boolean,
    onWon: () => void
}

const Grid = ({ alreadyWon, onWon }: GridProps) => {
    const [words, setWords] = useState([{ word: "", submitted: false }]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.repeat) return;
            const key = event.key.toUpperCase();

            if (key == "ENTER" && words[words.length - 1].word === "GOMPEI") onWon();

            setWords(prevWords => {
                const lastWordIndex = prevWords.length - 1;
                const lastWord = prevWords[lastWordIndex];
                let newWords = [...prevWords];
                if (key.length == 1 && key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90) {
                    if (lastWord.word.length <= 5) {
                        newWords[lastWordIndex] = {
                            word: lastWord.word + key,
                            submitted: lastWord.submitted
                        }
                    }
                } else if (key == "ENTER" && prevWords[prevWords.length - 1].word.length == 6) {
                    if (prevWords[newWords.length - 1].word != "GOMPEI") {
                        newWords = [...newWords, { word: "", submitted: false }];
                    }
                    newWords[lastWordIndex] = { word: lastWord.word, submitted: true };
                } else if (key == "BACKSPACE" && prevWords[prevWords.length - 1].word.length > 0 && !lastWord.submitted) {
                    newWords[lastWordIndex] = {
                        word: lastWord.word.substring(0, lastWord.word.length - 1),
                        submitted: false
                    }
                }
                return newWords;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    return alreadyWon ? 
        (<div className="grid">
            {
                words.map((word, i) => (
                    <Row key={i} word={word.word} submitted={word.submitted} />
                ))
            }
        </div>) 
    : 
        (<Row key={0} word={"GOMPEI"} submitted={true} />)
};

export default Grid;
