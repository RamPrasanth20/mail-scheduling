import React, { Component } from 'react'
import Sidebar from "./Sidebar"
import Navb from "./Navb"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import ReactHtmlParser from 'react-html-parser';
import FormControl from 'react-bootstrap/FormControl'
import { Link } from "react-router-dom";


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.match.params.id)

        this.state = {
            list: [],
            username: '',
            search:'',
            navbar: [{
                name: 'History',
                link: `/user/${this.props.match.params.id}/history`
            },
            {
                name: 'Create',
                link: `/user/${this.props.match.params.id}/create`
            },
            { name: 'Log out', link: '/' },],

        }
        fetch(`/future/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }

        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //const s=data.i
                this.setState({
                    list: data.data.reverse(),
                    username: data.name
                })
                console.log(this.state)
                //history.push(`/user/${s}/dashboard`);
            })

    }


    render() {

        const Handle = (kid) => {
            console.log(kid)
            fetch(`/stop/${kid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    //const s=data.id.insertedId
                    this.setState({
                        list: data.data.reverse()
                    })

                    console.log(this.state)
                    //history.push(`/user/${s}/dashboard`);
                })

        }
        
        return (
            <div>
                <Navb list={this.state.navbar} />


                <Container style={{ marginTop: '100px' }} fluid='sm'>


                  



                        <Row>
                        <Col lg={12}>
                            <div class="welcome-msg">
                                <h5>
                                    Welcome back <span class="welcome-msg-username">{this.state.username.charAt(0).toUpperCase() + this.state.username.toLowerCase().slice(1)} !</span>
                                </h5>
                            </div>
                        </Col>

                        </Row>
                       

                        <Row style={{marginBottom:'50px'}}>
                            <Col lg={12}>

                                <Form.Control type="text" onChange={(e)=>{this.setState({search:e.target.value})}} placeholder="search" />



                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <div style={{ marginLeft: '10px' }}>
                                    <h5 class="dashboard-title" > Upcoming Events </h5>
                                </div>
                            </Col>




                        </Row>


                   
                    {this.state.list.length === 0 ?<Alert variant="secondary">
                                <Alert.Heading id="col-head-2">There are no upcoming mail events.Click the below button to create a new mail.
                                    
                                </Alert.Heading>

                                <hr />
                                <p className="mb-0">
                                    <Link to = {`/user/${this.props.match.params.id}/create`}>Create new mail</Link>
                                </p>
                            </Alert> :this.state.list.filter((val)=>{
                        if(this.state.search===""){
                            return val
                        }
                        else if(val.subject.toLowerCase().includes(this.state.search.toLowerCase())){
                            return val
                           

                        }
                    }).map((ele) => {
                        console.log(ele['cc'])
                        let msg = "To " + String(ele["To"]) + " " + String(ele['cc'][0]["mail form-control"]==='' ? ' ' : ` & ${ele['cc'].length + " more"}`)
                        let html = ReactHtmlParser(ele['html'])
                        let mid = ele['mail_id']
                        console.log(html)

                        return (
                            <Alert variant="secondary">
                                <Alert.Heading id="col-head">{ele['subject']}
                                    <span id="edit-btn" >
                                        <Link to={"/edit/" + mid}><i class="material-icons" title="edit this event" style={{ cursor: 'pointer', color: '#75759c' }} >edit_note</i></Link>




                                        <i class="material-icons" title="delete this event" style={{ cursor: 'pointer' }} onClick={() => { Handle(ele['mail_id']) }}>delete</i>

                                    </span>
                                </Alert.Heading>

                                <hr />
                                <p className="mb-0" style={{ textAlign: 'left' }}>
                                    {msg}
                                    <span id="edit-btn" >
                                        <Container>
                                            <span style={{ color: "#0d6efd" }}>Pending
                                            </span>
                                        </Container>


                                    </span>
                                </p>
                            </Alert>
                        )





                    })}



                </Container>

            </div>



        )
    }
}
