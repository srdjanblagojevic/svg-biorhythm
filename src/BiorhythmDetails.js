import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import BiorhythmSvg from './BiorhythmSvg'
import { Get30DaysGraphData, daysPassed, biorhythmCalc } from './BiorhythmCalculator'
import { getWeekDay } from './Utils'

export default ({ name, birthDate, backBtnClick }) => {


    const graphData = Get30DaysGraphData(birthDate)
    const currentData = biorhythmCalc({ birthDate })
    console.log(currentData)

    return (
        <Container>
            <Row>
                <Col className="text-left">
                    <Button color="link" style={{ fontSize: "18px" }} onClick={backBtnClick}>
                        <FontAwesomeIcon icon={faChevronLeft} className="ml-2 mr-2" /
                        >Back
                    </Button>
                </Col>
                <Col className="text-right align-self-end">
                    <h5 className="mr-4">{birthDate}</h5>
                </Col>
            </Row>
            <Row style={{ borderBottom: "1px solid black" }}>
                <Col className="text-left"><h1>Biorhythm graph</h1></Col>
                <Col className="text-right"><h1>{name}</h1></Col>
            </Row>
            <Row className="pt-4">
                <Col>
                    <BiorhythmSvg graphData={graphData} />
                </Col>
            </Row>
            <Row className="pt-4">
                <Col>
                    <Row><h4>Today</h4></Row>
                    <Row>
                        <Col className="p-2 text-left" style={{ backgroundColor: "#cccccc" }}>
                            <p><svg width="20" height="20">
                                <rect width="20" height="20" style={{ fill: "red" }} />
                            </svg>
                                <span className="ml-2">Physical = {Math.round(currentData.physical * 100)}%</span>
                            </p>
                            <p><svg width="20" height="20">
                                <rect width="20" height="20" style={{ fill: "green" }} />
                            </svg>
                                <span className="ml-2">Emotional = {Math.round(currentData.emotional * 100)}%</span>
                            </p>

                            <p><svg width="20" height="20">
                                <rect width="20" height="20" style={{ fill: "blue" }} />
                            </svg>
                                <span className="ml-2">Intellectual = {Math.round(currentData.intellectual * 100)}%</span>
                            </p>
                            <p><svg width="20" height="20">
                                <rect width="20" height="20" style={{ fill: "orange" }} />
                            </svg>
                                <span className="ml-2">Intuitive = {Math.round(currentData.intuitive * 250 + 350)}%</span>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row><h4>Day of birth: <span style={{ fontWeight: "bold", marginLeft: "15px" }}>{getWeekDay((new Date(birthDate).getDay()))}</span></h4></Row>
                            <Row><h4>Day of life: <span style={{ fontWeight: "bold", marginLeft: "15px" }}>{daysPassed(new Date(), birthDate)}</span></h4></Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
