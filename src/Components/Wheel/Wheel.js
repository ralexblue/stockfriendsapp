import React from 'react';
//import './Wheel.css';
//import ticket_service from '../../services/ticket_service'



export default class Wheel extends React.Component{
  
  constructor(props) {
    super(props);
    this.state={
        wheel_options:[]
    };
    //could use context to load in options from accounts
  }
  /*componentDidMount(){
      //grab the raperezetf options here
  }*/
render(){
    return(
        <p>the wheel goes here</p>
    )
}
}