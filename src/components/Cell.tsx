interface CellProps {
    char: string,
    color: string
}

export default function({ char, color }: CellProps) {
    return <div className={ color == "neutral" ? "cell" : color + "Cell"}>{char}</div>
}