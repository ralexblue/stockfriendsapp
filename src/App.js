import React from 'react';
import './App.css';
import ticket_service from './services/ticket_service'



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
return <p>for {this.state.ticker} the current price is {this.state.SearchTickerNum}</p>
}
async submitTicker(e){
  e.preventDefault();
  console.log(this.state);
  let b = await ticket_service.getSearchedinfo(this.state.ticker)
  console.log(b);
  this.setState({
    SearchTicker:true,
    SearchTickerNum:b,
  })
}
editForm = () =>{
  return <form className="searchticker">
    <label>Ticker</label>
    <input onChange={this.handleChangeQuote} value={this.state.ticker}></input>
    <button onClick={this.submitTicker}>submit</button>
    </form>
}


render(){
    return (
      <div className="App">
        <h1>Stock App</h1>
        <h2>Current stock APPL:{this.state.number}</h2>
        {this.state.SearchTicker?this.showTicker():this.editForm()}
      </div>
    );
  }
}

export default App;
