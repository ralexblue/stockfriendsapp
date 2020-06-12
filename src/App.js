import React from 'react';
import './App.css';
import ticket_service from './services/ticket_service'
//import { w3cwebsocket as W3CWebSocket } from "websocket";
import Accounts from './Components/Accounts/Account';
import Wheel from './Components/Wheel/Wheel'

//const client = new W3CWebSocket('ws://127.0.0.1:8000');
const socket = new WebSocket('wss://ws.finnhub.io?token=brejt5nrh5rckh45dof0');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'SPY'}))
});

// Listen for messages



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
    socket.addEventListener('message', function (res) {
      //console.log('Message from server ', event.data);
      console.log(res)
  });
  }


/*async componentDidMount() {
  let a = await ticket_service.getTicketinfo();
  console.log(a);
  this.setState({
    number:a,
  })
}*/
handleChangeQuote=(event)=>{
  this.setState({ticker: event.target.value});
}
showTicker = () =>{
return <>
<p>for {this.state.ticker} the current price is {this.state.SearchTickerNum}</p>
<button onClick={this.resetSearch}>search another</button>
</>
}
resetSearch=()=>{
  this.setState({
    SearchTicker:false,
    SearchTickerNum:0,
    ticker:"",
  })
}
async submitTicker(e){
  e.preventDefault();
  console.log(this.state);
  let upper=this.state.ticker.toUpperCase();
  let b = await ticket_service.getSearchedinfo(this.state.ticker)
  this.setState({
    SearchTicker:true,
    SearchTickerNum:b,
    ticker:upper
  })
}
editForm = () =>{
  return <form className="searchticker">
    <label>Ticker</label>
    <input className="uppercase" onChange={this.handleChangeQuote} value={this.state.ticker} maxlength="4"></input>
    <button onClick={this.submitTicker}>submit</button>
    </form>
}


render(){
    return (
      <div className="App">
        <h1>Stock App</h1>
        <h2>Current stock APPL:{this.state.number}</h2>
        {this.state.SearchTicker?this.showTicker():this.editForm()}
        <Accounts/>
        <Wheel/>
      </div>
    );
  }
}

export default App;
