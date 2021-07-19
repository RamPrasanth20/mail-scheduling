import React, { Component } from 'react'
import { Link } from "react-router-dom"
import scale from "./scale2.png"
import mail from "./mail.png"
import Navb from "./Navb"
import map from "./map.jpg"
import mail2 from "./mail2.png"
import customer from "./customer.jpg"
import customer2 from "./csutomer2.png"
import mail3 from "./mail3.jpg"
import { motion } from "framer-motion"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

            navbar: [{ name: 'sign up', link: '/signup' }, { name: 'Log in', link: '/login' }]
        }
    }
    render() {
        return (
            <div>
                <Navb list={this.state.navbar} />
               

                    <Row style={{ marginTop: '100px' }}>
                        <Col lg={6} className="d-flex align-items-center" >
                            <Container>
                                <p id="home-p">
                                    Get started to scale your business with us
                                </p>
                                <Link to="/signup">
                                    <motion.button id="start-btn"
                                        initial={{ x: '-100vw' }}
                                        animate={{ x: 0 }}
                                        transition={{ delay: 0.5 }} >
                                        Get Started
                                    </motion.button>

                                </Link>
                            </Container>


                        </Col>
                        <Col lg={6}>
                            <img class="responsive-img" id="image-2" src={scale} />
                        </Col>
                    </Row>
                    <Row id="form-boot-con" style={{ height: "300px", color: 'whitesmoke', fontWeight: 'bold' }}>
                        <Col lg={12} className="d-flex align-items-center">
                            <Container>
                                <motion.h4
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 5 }}

                                >
                                    Grow with HORIZON
                                </motion.h4>
                                <p style={{ marginTop: '25px' }}>
                                    Our marketing platform helps brands like these build their thing and keep it growing.
                                </p>

                            </Container>

                        </Col>
                    </Row>


                    <Row style={{ height: "300px"}}>
                        <Col lg={6}>
                            <img class="responsive-img" id="image-2" src={mail} />
                        </Col>
                        <Col lg={6} className="d-flex align-items-center" >
                            <Container>
                                <p id="home-p">
                                    We provide best tools for automating emails.
                                </p>

                            </Container>


                        </Col>

                    </Row>
                    
                    <footer className="d-flex align-items-center" style={{ height: "300px",marginTop:'50px', backgroundColor:"black"}}>
                        <Container className="justify-content-center">
                            <Row>
                                <Col lg={6} style={{color:"white"}}>
                                    <h5>About Horizon</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at lacus congue.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at lacus congue, suscipit elit nec, tincidunt orci.</p>
                                </Col>
                                <Col lg={6}>
                                    <h5 style={{color:"white"}}>Connect @</h5>
                                    <ul>
                                        <li><a class="grey-text text-lighten-3" style={{color:"white"}}  href="#">Facebook</a></li>
                                        <li><a class="grey-text text-lighten-3" style={{color:"white"}} href="#">Twitter</a></li>
                                        <li><a class="grey-text text-lighten-3" style={{color:"white"}}  href="#">Linked In</a></li>
                                        <li><a class="grey-text text-lighten-3" style={{color:"white"}} href="#">Instagram</a></li>
                                    </ul>
                                </Col>
                            </Row>
                        </Container >
                        
                    </footer>




               



            </div>
        )
    }
}
