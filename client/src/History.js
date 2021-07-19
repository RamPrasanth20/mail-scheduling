import React, { Component } from 'react'
import Sidebar from "./Sidebar"
import Navb from "./Navb"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import ReactHtmlParser from 'react-html-parser';
import Form from 'react-bootstrap/Form';

export default class History extends Component {

    constructor(props) {
        super(props);
        

        this.state = {
            list: [],
            username: '',
            search:'',
            navbar: [{
                name: 'Dashboard',
                link: `/user/${this.props.match.params.id}/dashboard`
            },
            {
                name: 'Create',
                link: `/user/${this.props.match.params.id}/create`
            },
            { name: 'Log out', link: '/' },],

        }
        fetch(`/history/${this.props.match.params.id}`, {
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
                    list: data.data.reverse()
                })
                console.log(this.state)
                //history.push(`/user/${s}/dashboard`);
            })

    }


    render() {

        
        return (
            <div>
                <Navb list={this.state.navbar} />


                <Container style={{ marginTop: '100px' }} fluid='sm'>



                        <Row style={{marginBottom:'50px'}}>
                            <Col lg={12}>

                                <Form.Control type="text" onChange={(e)=>{this.setState({search:e.target.value})}} placeholder="search" />



                            </Col>
                        </Row>



                        




                        <Row>
                            <Col lg={12}>
                                <div style={{ marginLeft: '10px' }}>
                                    <h5 class="dashboard-title" > History </h5>
                                </div>
                            </Col>




                        </Row>
                        

                   
                    {this.state.list.filter((val)=>{
                        if(this.state.search===""){
                            return val
                        }
                        else if(val.subject.toLowerCase().includes(this.state.search.toLowerCase())){
                            return val
                           

                        }
                    }).map(ele => {

                        let msg = "To " + String(ele["To"]) + " " + String(ele['cc'].length === 0 ? ' ' : ` & ${ele['cc'].length + " more"}`)
                        let html = ReactHtmlParser(ele['html'])
                        console.log(html)
                        
                        return (
                            <Alert variant="secondary">
                                <Alert.Heading id="col-head">{ele['subject']} 
                                
                                </Alert.Heading>
                               
                                <hr />
                                <p className="mb-0" style={{textAlign:'left'}}>
                                    {msg}
                                    <span id="edit-btn" >
                                        <Container>
                                            <span style={{color:"#155724 "}}>Sent
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
