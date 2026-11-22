import { useState, useEffect } from "react"
import Row from "./Row";

export default function() {
    const [ words, setWords ] = useState([""]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toUpperCase();
            setWords(prevWords => {
                if (key.length == 1 && key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90) {
                    const newWords = [...prevWords];
                    if (prevWords[prevWords.length - 1].length <= 5) {
                        newWords[newWords.length - 1] += key;
                    }
                    return newWords;
                } else if (key == "ENTER" && prevWords[prevWords.length - 1].length == 6 && prevWords[prevWords.length - 1] != "GOMPEI") {
                    return [...prevWords, ""];
                }
                return prevWords;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return <div className="grid">
        {
            words.map((word, i) => (
                <Row key={i} word={word} valid={word == "GOMPEI"} />
            ))
        }
    </div>;
}