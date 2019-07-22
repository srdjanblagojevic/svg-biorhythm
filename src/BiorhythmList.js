import React, { Component } from 'react'
import { Container, Row, Col, Input, Form, FormGroup, Label, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import BiorhythmDetails from './BiorhythmDetails'


const createCookieInHour = (cookieName, cookieValue) => {
    let date = new Date();
    date.setTime(date.getTime() + (100 * 60 * 60 * 1000));
    document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
}

const getValuesFromCookie = () => {
    let cookie = document.cookie.split(';')[0];
    if (cookie) {
        return JSON.parse(cookie.replace("storedValues=", ""))
    }
    return []
}


class BiorhythmList extends Component {

    state = {
        name: '',
        birthDate: '',
        storedValues: getValuesFromCookie().map(t => {
            return { ...t, birthDate: new Date(t.birthDate) }
        }),
        detailsShowed: false,
        detailsBirthDate: '',
        detailsName: '',
    }

    handleShowClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const { name, birthDate, storedValues } = this.state
        let newStoredValues = [...storedValues.map(t => ({ ...t }))]

        if (newStoredValues.length === 10) {
            newStoredValues.shift();
        }
        newStoredValues.push({ name, birthDate: new Date(birthDate) })
        this.setState({
            storedValues: newStoredValues,
            detailsShowed: true,
            detailsName: name,
            detailsBirthDate: new Date(birthDate).toLocaleDateString()
        })
        createCookieInHour('storedValues', JSON.stringify(newStoredValues));
    }

    handleShowDetails = (e, detailsName, detailsBirthDate, detailsData) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ detailsShowed: true, detailsName: detailsName, detailsBirthDate: detailsBirthDate })
    }

    render() {

        const { detailsShowed, storedValues, birthDate, name, detailsName, detailsBirthDate } = this.state

        return (
            <Container>
                {detailsShowed &&
                    <BiorhythmDetails
                        name={detailsName}
                        birthDate={detailsBirthDate}
                        backBtnClick={(e) => this.setState({ detailsShowed: false })} />}
                {!detailsShowed &&
                    <React.Fragment>
                        <Row className="justify-content-start" style={{ borderBottom: "1px solid black" }}>
                            <Col className="text-left"><h1>Biorhythm</h1></Col>
                        </Row>
                        <Row className="pt-4 pb-4">
                            <Col>
                                <Form className="w-100">
                                    <Row form>
                                        <Col lg={3} className="text-left">
                                            <FormGroup>
                                                <Label for="name">Name</Label>
                                                <Input type="input" name="name" id="name" placeholder="Name"
                                                    value={name}
                                                    onChange={(event) => this.setState({ name: event.target.value })} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={2} className="text-left mr-auto">
                                            <FormGroup>
                                                <Label for="birthDate">Birth date</Label>
                                                <Input type="date" name="birthDate" id="birthDate" placeholder="Birth date"
                                                    value={birthDate}
                                                    onChange={(event) => this.setState({ birthDate: event.target.value })} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={3} className="text-right align-self-center">
                                            <Button color="primary" disabled={!name || !birthDate}
                                                onClick={this.handleShowClick}>
                                                Show
                                                <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row style={{ borderBottom: "1px solid black" }}><h4>Last 10 Enteries</h4></Row>
                                <Row>
                                    <Col>
                                        {
                                            storedValues.slice(0).reverse().map((row, index) => (
                                                <Row className="pt-1 pb-1" key={index}>
                                                    <Col className="text-left align-self-center">{row.name}</Col>
                                                    <Col className="text-left align-self-center">{row.birthDate.toLocaleDateString()}</Col>
                                                    <Col className="text-right align-self-center">
                                                        <Button color="primary" onClick={(e) => this.handleShowDetails(e, row.name, row.birthDate.toLocaleDateString())}>Show
                                                        <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            ))
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </React.Fragment>
                }
            </Container>
        )
    }
}

export default BiorhythmList