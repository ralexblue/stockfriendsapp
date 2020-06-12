import React from 'react';
//import './Accounts.css';
import ticket_service from '../../services/ticket_service'



export default class Accounts extends React.Component{
  
  constructor(props) {
    super(props);
    this.state={
        accounts:[]
    };
  }
  /*componentDidMount(){
      //grab the raperezetf people here
  }*/
render(){
    return(
        <p>people accounts</p>
    )
}
}