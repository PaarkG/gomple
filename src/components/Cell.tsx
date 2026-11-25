interface CellProps {
    char: string,
    color: string,
    yOffset: number
}

const Cell = ({ char, color, yOffset }: CellProps) => {
    return <div className={ color == "neutral" ? "cell" : color + "Cell"} style={{translate: "0 " + yOffset + "px"}}>{char}</div>
}

export default Cell;
