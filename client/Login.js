import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GoogleLogin from 'react-google-login'
import GoogleButton from 'react-google-button'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [icon, seticon] = useState('visibility_off')
    const textinput = useRef(null);
    const history = useHistory();


    function handleclick() {
        if (textinput.current.type === "password") {
            textinput.current.type = "text"
            seticon('visibility')
        }
        else {
            textinput.current.type = "password"
            seticon('visibility_off')
        }

    }
    const handlesubmit = (e) => {
        e.preventDefault()
        if(username===''|| password===''){
            alert("Kindly enter valid details..")
        }
        else{
        const a = { username, password }
        fetch("/login", {
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
                //console.log("data",data)
                if (data["id"] === null) {
                    history.push('/signup')
                }
                else {
                    history.push(`/user/${data["id"]}/dashboard`);

                }

            })
        }
    }
    const Google = (response) => {
        console.log(response.profileObj)
        console.log(response)
        let a = {
            "username": response.profileObj.name,
            "email": response.profileObj.email,
            "password": response.profileObj.googleId
        }

        fetch("/login", {
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
                //console.log("data",data)
                if (data["id"] === null) {
                    history.push('/signup')
                }
                else {
                    history.push(`/user/${data["id"]}/dashboard`);
                }

            })
    }

    return (
        <div id="form-boot-con" className="d-flex align-items-center" >
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <Form onSubmit={handlesubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label id="bt-main-form-lb">Username</Form.Label>
                                <Form.Control type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder="username" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label id="bt-main-form-lb">Password</Form.Label>
                                <span className="material-icons" style={{ float: 'right' }} onClick={handleclick}>{icon}</span>
                                <Form.Control type="password" placeholder="Password" ref={textinput} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </Form.Group>

                            <Button variant="outline-dark" type="submit">
                                log in
                            </Button>
                            
                        </Form>
                        <Row style={{ marginTop: '25px', marginBottom: '25px' }}>
                            <Col lg={12}>
                                <hr style={{ backgroundColor: "gray" }} />
                            </Col>


                        </Row>
                        <Row>
                            <Col lg={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                <GoogleLogin
                                    buttonText='log in with Google'
                                    render={renderProps => (
                                        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}></GoogleButton>
                                    )}

                                    onSuccess={Google}
                                    onFailure={Google}
                                    cookiePolicy={'single_host_origin'}
                                    clientId="15125709854-8uie34fks34lkg0fdpbbfru70peno1ae.apps.googleusercontent.com"
                                />


                            </Col>



                        </Row>

                    </Col>

                </Row>

            </Container>



        </div>




    );
}

export default Login;