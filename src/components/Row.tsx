import Cell from './Cell.tsx'

interface RowProps {
    word: string,
    valid: boolean
}

export default function({ word, valid }: RowProps) {
    const cellColor = valid ? "#00b327" : "#FFFFFF";
    return <div className="row">
        <Cell char={word.charAt(0)} color={cellColor} />
        <Cell char={word.charAt(1)} color={cellColor} />
        <Cell char={word.charAt(2)} color={cellColor} />
        <Cell char={word.charAt(3)} color={cellColor} />
        <Cell char={word.charAt(4)} color={cellColor} />
        <Cell char={word.charAt(5)} color={cellColor} />
    </div>
}