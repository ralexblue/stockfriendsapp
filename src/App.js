import React from 'react';
import './App.css';
import ticket_service from './services/ticket_service'

import Accounts from './Components/Accounts/Account';
import Wheel from './Components/Wheel/Wheel'
//const socket = new WebSocket('wss://ws.finnhub.io?token=brejt5nrh5rckh45dof0');

// Connection opened -> Subscribe

// Listen for messssage


class App extends React.Component{
  
  constructor(props) {
    super(props);
    this.submitTicker = this.submitTicker.bind(this);
    this.state={
      number:0,
      ticker:"",
      SearchTicker:false,
      SearchTickerNum:0,
    };
  }
  componentWillMount(){
    /*socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
      //console.log(res)
    });*/
  }


async componentDidMount() {
  let a = await ticket_service.getTicketinfo();
  console.log(a);
  this.setState({
    number:a,
  })
}
handleChangeQuote=(event)=>{
  this.setState({ticker: event.target.value});
}
showTicker = () =>{
return <>
<p>{this.state.ticker}current price is {this.state.SearchTickerNum}</p>
<form onSubmit={this.resetSearch}>
  <button onClick={this.resetSearch} type="submit">Search another</button>
</form>
</>
}
resetSearch=()=>{
  console.log("Reset")
  this.setState({
    SearchTicker:false,
    SearchTickerNum:0,
    ticker:""
  })
}
async submitTicker(e){
  e.preventDefault();
  console.log(this.state);
  let upper=this.state.ticker.toUpperCase();
  console.log(upper)
  let b = await ticket_service.getSearchedinfo(upper);
  this.setState({
    SearchTicker:true,
    SearchTickerNum:b,
    ticker:upper
  })
}
editForm = () =>{
  return <form className="searchticker" onSubmit={this.submitTicker}>
          <label>Ticker</label>
          <br/>
          <input className="uppercase" onChange={this.handleChangeQuote} value={this.state.ticker} maxlength="4"></input>
          <button type="submit">submit</button>
    </form>
}


render(){
    return (
      <div className="App">
        <h1>Wheel of Bets</h1>
        <h2>Current stock SPY:{this.state.number}</h2>
        {this.state.SearchTicker?this.showTicker():this.editForm()}
        <Accounts/>
        <Wheel/>
      </div>
    );
  }
}

export default App;
