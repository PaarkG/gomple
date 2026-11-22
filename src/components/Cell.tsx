interface CellProps {
    char: string,
    color: string
}

export default function({ char, color }: CellProps) {
    return <div className="cell" style={{backgroundColor: color}}>{char}</div>
}