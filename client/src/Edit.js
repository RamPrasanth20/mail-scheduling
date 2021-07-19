import React, { useState, useEffect, useRef } from 'react'
import RichTextEditor from 'react-rte';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactHtmlParser from 'react-html-parser';
import Alert from 'react-bootstrap/Alert';
import Navb from "./Navb";
export default function UpdatedForm() {
    const [value, setValue] = useState('')
    const [To, setTo] = useState('')
    const [subject, setsubject] = useState('')
    const [time, setTime] = useState('')
    const [t, setT] = useState('')
   
    //const [subject, setsubject] = useState('')
    const [recurring, setrecurring] = useState(false)
    const [week, setweek] = useState(false)
    const [month, setmonth] = useState(false)
    const [year, setyear] = useState(false)
    const [immediate, setimmediate] = useState(false)
    const [fixed, setfixed] = useState(false)
    const [schedule, setschedule] = useState('')
    const [j,setj] = useState('')
    const history = useHistory();
    const { id } = useParams()
    const [editorValue, setEditorValue] =
        React.useState(RichTextEditor.createValueFromString(value, 'html'));

    const handleChange = value => {
        setEditorValue(value);
        console.log(value.toString("html"))
        setValue(value.toString("html"));
        console.log(value)
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
        if(a["html"]===""){
            a["html"]=t
        }
        a["edit"] = true
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
        fetch(`/edit2/${id}`, {
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
                history.go(-1)
            })
    }

    useEffect(() => {
        fetch(`/edit/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((d) => {
                let data = d['data']
                setTo(data["To"])
                console.log(data)
                setT(data['html'])
                let lk = []

                for (let i of data["cc"]) {
                    cc.push(i)
                }
                console.log(lk)
                //setcc(lk)
                cc.shift()
                setcc(cc)
                console.log(cc)
                setsubject(data["subject"])
                setValue(data["subject"])
                console.log(value)

                if ("recurring" in data) {
                    setrecurring(true)
                    setschedule(data["schedule"])
                    setj('recurring')
                }
                else if ("week" in data) {
                    setweek(true)
                    setTime(data["time"])
                    setschedule(data["schedule"])
                    setj('week')
                }
                else if ("month" in data) {
                    setmonth(true)
                    setTime(data["time"])
                    setschedule(data["schedule"])
                    setj('month')
                }
                else if ("immediate" in data) {
                    setimmediate(true)
                    setTime(data["time"])
                    setschedule(data["schedule"])
                    setj('immediate')
                }
                else if ("fixed" in data) {
                    setfixed(true)
                    setTime(data["time"])
                    setschedule(data["schedule"])
                    setj('fixed')
                }
                else {
                    setyear(true)
                    setTime(data["time"])
                    setschedule(data["schedule"])
                    setj('year')

                }



            })

    }, [])
    const m_id=id.split("-")


    return (
        <div>

        
<Navb list={[{ name: 'Dashboard', link: `/user/${m_id[0]}/dashboard` }, { name: 'History', link: `/user/${m_id[0]}/history` },{ name: 'Log out', link: '/' }]} />
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

                                                <Form.Label id="bt-main-form-lb">{`CC-${idx + 1}(optional)`}</Form.Label>



                                                <Form.Control
                                                    type="email"
                                                    name={ccId}
                                                    data-idx={idx}
                                                    id={ccId}
                                                    className="mail"
                                                    value={cc[idx]['mail form-control']}
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

                                <Col lg={12}>
                                    <Alert variant="secondary">
                                        <Alert.Heading id="col-head">Schedule Type : {j}

                                        </Alert.Heading>

                                    </Alert>
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
                                        <Form.Control readOnly type="text" value={schedule} onChange={(e) => { setschedule(e.target.value) }} placeholder="0 - 59 s" />
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
                                            readOnly
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
                                        <Form.Control readOnly type="time" value={time} onChange={(e) => { setTime(e.target.value); console.log(schedule) }} placeholder="SS" />
                                    </Form.Group>
                                </Col>
                            </Row>}

                        {month && <Row>
                            <Col lg={6}><Form.Group className="mb-3">
                                <Form.Label id="bt-main-form-lb">Select a date:</Form.Label>
                                <Form.Control readOnly type="date" value={schedule} onChange={(e) => { setschedule(e.target.value); console.log(schedule) }} placeholder="SS" />
                            </Form.Group></Col>
                            <Col lg={6}><Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label id="bt-main-form-lb">Select the time slot:</Form.Label>
                                <Form.Control readOnly type="time" value={time} onChange={(e) => { setTime(e.target.value); console.log(schedule) }} placeholder="SS" />
                            </Form.Group></Col>

                        </Row>
                        }
                        {year && <Row>
                            <Col lg={6}><Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label id="bt-main-form-lb">Select a date:</Form.Label>
                                <Form.Control readOnly type="date" value={schedule} onChange={(e) => { setschedule(e.target.value); console.log(schedule) }} placeholder="SS" />
                            </Form.Group></Col>
                            <Col lg={6}><Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label id="bt-main-form-lb">Select the time slot:</Form.Label>
                                <Form.Control readOnly type="time" value={time} onChange={(e) => { setTime(e.target.value); console.log(schedule) }} placeholder="SS" />
                            </Form.Group></Col>

                        </Row>}
                        {fixed && <Row>
                            <Col lg={6}><Form.Group className="mb-3">
                                <Form.Label id="bt-main-form-lb">Select a date:</Form.Label>
                                <Form.Control readOnly type="date" value={schedule} onChange={(e) => { setschedule(e.target.value); console.log(schedule) }} placeholder="SS" />
                            </Form.Group></Col>
                            <Col lg={6}><Form.Group className="mb-3">
                                <Form.Label id="bt-main-form-lb">Enter the time slot:</Form.Label>
                                <Form.Control readOnly type="time" value={time} onChange={(e) => { setTime(e.target.value); console.log(schedule) }} placeholder="SS" />
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
                    <Col lg={6}>
                        <Alert variant="secondary">
                            <Alert.Heading id="col-head">Previous contents of your mail

                            </Alert.Heading>

                            <hr />
                            <p className="mb-0" style={{ textAlign: 'left' }}>
                                {ReactHtmlParser(t)}
                            </p>
                        </Alert>


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
                            Save
                        </Button>
                    </Col>

                </Row>


            </Form>

        </Container >
    </div>

    );


}


