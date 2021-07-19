import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

export class Navb extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Navbar collapseOnSelect bg="secondary" expand='lg' fixed='top'>

                <Navbar.Brand href="/" style={{color:'whitesmoke'}}>Horizon</Navbar.Brand>
                <Navbar.Toggle  aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    
                       
                    


                    <Nav>
                        {this.props.list.map(ele=>{
                                    return(
                                        <Nav.Link href={ele['link']} style={{color:'whitesmoke'}}>{ele['name']}</Nav.Link>
                                        
                                    )
                                })}
                        
                    </Nav>





                </Navbar.Collapse>



            </Navbar>


        )
    }
}
export default Navb;

