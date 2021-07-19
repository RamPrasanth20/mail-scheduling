import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Sidebar extends Component {
    constructor(props){
        super(props);
        
       
    }
    render() {
        return (
            <div id = "Sidebar">
                <ul>
                    {
                        this.props.list.map(ele=>{
                            return (
                                <Link to={ele.name==='Home'?'/':`/user/${this.props.id}/${ele.name}`}>
                                    <li id = "sidebar-li">
                                            
                                            <i class="material-icons" id = "sidebar-li-icon">{ele.icon}</i>
                                            
                                            
                                            <div id = "sidebar-li-tag">
                                                    {ele.name}
                                            </div>
                                        
                                            
                                        
                                    </li>
                                 </Link>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
