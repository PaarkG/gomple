import Cell from './Cell.tsx'

interface RowProps {
    word: string,
    submitted: boolean
}

function getColor(char: string, desiredChar: string, submitted: boolean) {
    return !submitted ? "neutral" : char == desiredChar ? "green" : ["G", "O", "M", "P", "E", "I"].includes(char) ? "yellow" : "red"
}

export default function({ word, submitted }: RowProps) {
    const char0 = word.charAt(0);
    const color0 = getColor(char0, "G", submitted);
    const char1 = word.charAt(1);
    const color1 = getColor(char1, "O", submitted);
    const char2 = word.charAt(2);
    const color2 = getColor(char2, "M", submitted);
    const char3 = word.charAt(3);
    const color3 = getColor(char3, "P", submitted);
    const char4 = word.charAt(4);
    const color4 = getColor(char4, "E", submitted);
    const char5 = word.charAt(5);
    const color5 = getColor(char5, "I", submitted);

    return <div className="row">
        <Cell char={char0} color={color0} />
        <Cell char={char1} color={color1} />
        <Cell char={char2} color={color2} />
        <Cell char={char3} color={color3} />
        <Cell char={char4} color={color4} />
        <Cell char={char5} color={color5} />
    </div>
}