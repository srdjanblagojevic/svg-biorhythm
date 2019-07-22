import React from "react"
import { getWeekDay } from './Utils'

const smoothing = 0.2


const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    }
}

const controlPoint = (current, previous, next, reverse) => {
    const p = previous || current
    const n = next || current

    const o = line(p, n)

    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing

    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return [x, y]
}

const bezierCommand = (point, i, a) => {
    const cps = controlPoint(a[i - 1], a[i - 2], point)
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true)
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`
}

const GraphPath = ({ points, color }) => {
    const d = points.reduce((acc, point, i, a) => i === 0
        ? `M ${point[0]},${point[1]}`
        : `${acc} ${bezierCommand(point, i, a)}`
        , '')
    return <path d={d} fill="none" stroke={color} strokeWidth="3" />
}


const GraphLegend = ({ text, color, x }) => (
    <React.Fragment>
        <rect x={x} y="730" width="50" height="50" style={{ fill: color }} />
        <text x={x + 60} y="775" className="svg-grid-legend-text">{text}</text>
    </React.Fragment>
)


export default ({ graphData, ...rest }) => {

    return (
        <svg viewBox="0 0 3000 800" version="1.1" xmlns="http://www.w3.org/2000/svg" className="svg" {...rest}>
            {
                graphData.dates.map((t, index) => {
                    return (
                        <React.Fragment>
                            <text x={`${index * 100 + 25}`} y="55" className="svg-grid-labels">{t.getDate()}</text>
                            <path d={`M${index * 100},700 v-700`} className="svg-grid-lines" />
                            <text x={`${index * 100 + 25}`} y="675" className="svg-grid-labels">{getWeekDay(t.getDay()).substr(0, 2)}</text>
                        </React.Fragment>
                    )
                })
            }
            <line x1="0" y1="350" x2="3000" y2="350" className="svg-grid-lines" />
            <line x1="0" y1="100" x2="3000" y2="100" className="svg-grid-lines" />
            <line x1="0" y1="600" x2="3000" y2="600" className="svg-grid-lines" />
            <line x1="0" y1="700" x2="3000" y2="700" className="svg-grid-lines" />
            <line x1="0" y1="0" x2="3000" y2="0" className="svg-grid-lines" />
            <line x1="0" y1="0" x2="3000" y2="0" className="svg-grid-lines" />
            <line x1="0" y1="100" x2="0" y2="700" className="svg-grid-lines" />
            <line x1="3000" y1="100" x2="3000" y2="700" className="svg-grid-lines" />
            <GraphPath points={graphData.physical} color={"red"} />
            <GraphPath points={graphData.emotional} color={"green"} />
            <GraphPath points={graphData.intellectual} color={"blue"} />
            <GraphPath points={graphData.intuitive} color={"orange"} />
            <GraphLegend text="Physical" color="red" x={1740} />
            <GraphLegend text="Emotional" color="green" x={2020} />
            <GraphLegend text="Intellectual" color="blue" x={2365} />
            <GraphLegend text="Intuitive" color="orange" x={2730} />
            <rect x="1400" y="3" width="100" height="697"
                style={{ strokeWidth: "6", stroke: "black", fill: "rgba(255,255,0,0.1)" }} />
        </svg>
    )
}