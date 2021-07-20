import React, { useState, useEffect } from 'react'
import RichTextEditor from 'react-rte';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navb from "./Navb";
export default function UpdatedForm() {
    useEffect(() => {
        alert("You can't reschedule the mail once it is created")
    }, [])

    const [value, setValue] = useState('')
    const [To, setTo] = useState('')
    const [subject, setsubject] = useState('')
    const [Body, setBody] = useState('')
    const [time, setTime] = useState('')
    //const [subject, setsubject] = useState('')
    const [recurring, setrecurring] = useState(false)
    const [week, setweek] = useState(false)
    const [month, setmonth] = useState(false)
    const [year, setyear] = useState(false)
    const [immediate, setimmediate] = useState(false)
    const [fixed, setfixed] = useState(false)
    const [schedule, setschedule] = useState('')
    const history = useHistory();
    const { id } = useParams()
    const [editorValue, setEditorValue] =
        React.useState(RichTextEditor.createValueFromString(value, 'markdown'));

    const handleChange = value => {
        console.log(Body)

        setEditorValue(value);

        console.log(value.toString("html"))
        setValue(value.toString("html"));

    };
    const blankcc = { "mail form-control": '' };
    const [cc, setcc] = useState([{ ...blankcc }]);
    const addcc = () => {
        setcc([...cc, { ...blankcc }]);
    };
    const handleCCChange = (e) => {
        const updatedCC = [...cc];
        updatedCC[e.target.dataset.idx][e.target.className] = e.target.value;
        setcc(updatedCC);
    };
    const handlesubmit = (e) => {
        e.preventDefault()
        const a = { To, subject, cc, schedule }
        a["html"] = value.toString("html")
        if (recurring) {
            a["recurring"] = true
        }
        else if (week) {
            a["week"] = true
            a["time"] = time
        }
        else if (month) {
            a["month"] = true
            a["time"] = time
        }
        else if (immediate) {
            a["immediate"] = true
            a["time"] = time
        }
        else if (fixed) {
            a["fixed"] = true
            a["time"] = time
        }
        else {
            a["year"] = true
            a["time"] = time
        }
        console.log(JSON.stringify(a))
        fetch(`/create/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(a)
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                history.push(`/user/${id}/dashboard`)
            })
    }

    return (
        <div>
            <Navb list={[{ name: 'Dashboard', link: `/user/${id}/dashboard` }, { name: 'History', link: `/user/${id}/history` },{ name: 'Log out', link: '/' }]} />

            <Container fluid='sm' style={{marginTop:"100px"}}>
                <Form onSubmit={handlesubmit}>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label id="bt-main-form-lb">To</Form.Label>
                                <Form.Control type="email" value={To} onChange={(e) => { setTo(e.target.value) }} placeholder="Enter email" />
                            </Form.Group>

                        </Col>

                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">

                                {
                                    cc.map((val, idx) => {
                                        const ccId = `mail-${idx}`;
                                        return (
                                            <Row key={`cc-mail-${idx}`}>
                                                <Col lg={12}>

                                                    <Form.Label id="bt-main-form-lb">{`CC-${idx + 1} (optional)`}</Form.Label>



                                                    <Form.Control
                                                        type="email"
                                                        name={ccId}
                                                        data-idx={idx}
                                                        id={ccId}
                                                        className="mail"
                                                        value={cc[idx].name}
                                                        onChange={handleCCChange}
                                                    />


                                                </Col>


                                            </Row>
                                        );
                                    })
                                }


                            </Form.Group>

                            <Button onClick={addcc} block>add cc</Button>
                            <br />

                        </Col>

                    </Row>


                    <Row>
                        <Col lg={6}>
                            <Form.Group >
                                <Row>
                                    <Col lg={6}>
                                        <Form.Label id="bt-main-form-lb">Select a schedule</Form.Label>
                                    </Col>

                                </Row>



                                <Row>

                                    <Col lg={2} id="radio-col-1">
                                        <Form.Check
                                            inline
                                            label="Recurring"
                                            value={recurring} onChange={() => { setrecurring(true); setfixed(false); setimmediate(false); setweek(false); setmonth(false); setyear(false); setschedule('') }}
                                            name="group1"
                                            type={'radio'}
                                            id={`inline-${'radio'}-1`}
                                        />
                                        <Form.Check
                                            inline
                                            label="Immediate"
                                            value={immediate} onChange={() => { setimmediate(true); setrecurring(false); setfixed(false); setweek(false); setmonth(false); setyear(false); setschedule('') }}
                                            name="group1"
                                            type={'radio'}
                                            id={`inline-${'radio'}-2`}
                                        />
                                        <Form.Check
                                            inline
                                            label="Fixed"
                                            name="group1"
                                            value={fixed} onChange={() => { setfixed(true); setimmediate(false); setrecurring(false); setweek(false); setmonth(false); setyear(false); setschedule('') }}
                                            type={'radio'}
                                            id={`inline-${'radio'}-3`}
                                        />
                                    </Col>
                                    <Col lg={2}>

                                    </Col>
                                    <Col lg={2} id="radio-col-2">
                                        <Form.Check
                                            inline
                                            label="Weekly"
                                            name="group1"
                                            type={'radio'}
                                            value={week} onChange={() => { setweek(true); setfixed(false); setrecurring(false); setimmediate(false); setmonth(false); setyear(false); setschedule('') }}
                                            id={`inline-${'radio'}-4`}
                                        />
                                        <Form.Check
                                            inline

                                            label="Monthly"
                                            name="group1"
                                            value={month} onChange={() => { setmonth(true); setfixed(false); setweek(false); setimmediate(false); setrecurring(false); setyear(false); setschedule('') }}
                                            type={'radio'}
                                            id={`inline-${'radio'}-5`}
                                        />
                                        <Form.Check
                                            inline

                                            label="Yearly"
                                            name="group1"
                                            value={year} onChange={() => { setyear(true); setfixed(false); setweek(false); setmonth(false); setimmediate(false); setrecurring(false); setschedule('') }}
                                            type={'radio'}
                                            id={`inline-${'radio'}-6`}
                                        />

                                    </Col>

                                </Row>




                            </Form.Group>

                        </Col>

                    </Row>
                    <Row>
                        <Col lg={12}>
                            {recurring &&
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label id="bt-main-form-lb">Enter the time in seconds:</Form.Label>
                                            <Form.Control type="text" value={schedule} onChange={(e) => { setschedule(e.target.value) }} placeholder="0 - 59 s" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            }
                            {week &&
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label id="bt-main-form-lb">Select the day</Form.Label>
                                            <Form.Control
                                                as="select"

                                                id="inlineFormCustomSelect"
                                                custom
                                                value={schedule}
                                                onChange={(e) => setschedule(e.target.value)}
                                            >
                                                <option value="1">Sunday</option>
                                                <option value="2">Monday</option>
                                                <option value="3">Tuesday</option>
                                                <option value="4">Wednesday</option>
                                                <option value="5">Thursday</option>
                                                <option value="6">Friday</option>
                                                <option value="7">Saturday</option>
                                            </Form.Control>

                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label id="bt-main-form-lb">Enter the time in seconds:</Form.Label>
                                            <Form.Control type="time" value={time} onChange={(e) => { setTime(e.target.value); console.log(schedule) }} placeholder="SS" />
                                        </Form.Group>
                                    </Col>
                                </Row>}

                            {month && <Row>
                                <Col lg={6}><Form.Group className="mb-3">
                                    <Form.Label id="bt-main-form-lb">Select a date:</Form.Label>
                                    <Form.Control type="date" value={schedule} onChange={(e) => { setschedule(e.target.value); console.log(schedule) }} placeholder="SS" />
                                </Form.Group></Col>
                                <Col lg={6}><Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label id="bt-main-form-lb">Enter the time slot:</Form.Label>
                                    <Form.Control type="time" value={time} onChange={(e) => { setTime(e.target.value); console.log(schedule) }} placeholder="SS" />
                                </Form.Group></Col>

                            </Row>
                            }
                            {year && <Row>
                                <Col lg={6}><Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label id="bt-main-form-lb">Select a date:</Form.Label>
                                    <Form.Control type="date" value={schedule} onChange={(e) => { setschedule(e.target.value); console.log(schedule) }} placeholder="SS" />
                                </Form.Group></Col>
                                <Col lg={6}><Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label id="bt-main-form-lb">Enter the time slot:</Form.Label>
                                    <Form.Control type="time" value={time} onChange={(e) => { setTime(e.target.value); console.log(schedule) }} placeholder="SS" />
                                </Form.Group></Col>

                            </Row>}
                            {fixed && <Row>
                                <Col lg={6}><Form.Group className="mb-3">
                                    <Form.Label id="bt-main-form-lb">Select a date:</Form.Label>
                                    <Form.Control type="date" value={schedule} onChange={(e) => { setschedule(e.target.value); console.log(schedule) }} placeholder="SS" />
                                </Form.Group></Col>
                                <Col lg={6}><Form.Group className="mb-3">
                                    <Form.Label id="bt-main-form-lb">Enter the time slot:</Form.Label>
                                    <Form.Control type="time" value={time} onChange={(e) => { setTime(e.target.value); console.log(schedule) }} placeholder="SS" />
                                </Form.Group></Col>

                            </Row>}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label id="bt-main-form-lb">Subject</Form.Label>
                                <Form.Control type="text" value={subject} onChange={(e) => { setsubject(e.target.value) }} />
                            </Form.Group>

                        </Col>


                    </Row>

                    <Row>

                        <Col lg={10}>
                            <Form.Group>
                                <Form.Label id="bt-main-form-lb">Mail body</Form.Label>
                                <br />
                                <RichTextEditor
                                    value={editorValue}
                                    onChange={handleChange}
                                    required
                                    id="body-text"
                                    name="bodyText"
                                    type="string"
                                    placeholder="Mail body"
                                    rows={3}
                                    multiline
                                    variant="filled"
                                    style={{ height: "2000px" }}
                                />
                            </Form.Group>



                        </Col>


                    </Row>






                    <Row>
                        <Col sm={12} lg={6}>
                            <Button variant="outline-primary" id="bt-main-form-lb" type="submit">
                                Send mail
                            </Button>
                        </Col>

                    </Row>


                </Form>

            </Container >
        </div>


    );


}

