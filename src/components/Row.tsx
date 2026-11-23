import { useEffect, useState } from 'react';
import Cell from './Cell.tsx'

interface RowProps {
    word: string,
    submitted: boolean
}

function getColor(char: string, desiredChar: string, submitted: boolean) {
    return !submitted ? "neutral" : char == desiredChar ? "green" : ["G", "O", "M", "P", "E", "I"].includes(char) ? "yellow" : "gray"
}

export default function({ word, submitted }: RowProps) {
    const [yOffset, setYOffset] = useState([0, 0, 0, 0, 0, 0]);

    const chars = [...word, ..." ".repeat(6)];
    const goal = ["G", "O", "M", "P", "E", "I"];
    const colors = chars.map((val, i) => getColor(val, goal[i], submitted));

    useEffect(() => {
        if (submitted) {
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    console.log(i);
                    setYOffset(prevOffsets => {
                        const newOffsets = [...prevOffsets];
                        newOffsets[i] = -10;
                        return newOffsets;
                    })
                }, 50 * i);

                setTimeout(() => {
                    console.log(i);
                    setYOffset(prevOffsets => {
                        const newOffsets = [...prevOffsets];
                        newOffsets[i] = 0;
                        return newOffsets;
                    })
                }, 200 + 50 * i);
            }
        }
    }, [ submitted ]);

    console.log(chars);
    console.log(colors);

    return <div className="row">
        <Cell char={chars[0]} color={colors[0]} yOffset={yOffset[0]} />
        <Cell char={chars[1]} color={colors[1]} yOffset={yOffset[1]} />
        <Cell char={chars[2]} color={colors[2]} yOffset={yOffset[2]} />
        <Cell char={chars[3]} color={colors[3]} yOffset={yOffset[3]} />
        <Cell char={chars[4]} color={colors[4]} yOffset={yOffset[4]} />
        <Cell char={chars[5]} color={colors[5]} yOffset={yOffset[5]} />
    </div>
}