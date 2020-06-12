import config from '../config'
const ticket_service={
    getTicketinfo(){
        return fetch(`${config.API_ENDPOINT}/quote?symbol=AAPL&token=${config.token}`)
        .then((res)=>res.json())
        .then(quote=>{
            console.log(quote);
            return quote.c;
        })
    },
    async getSearchedinfo(searchTicker){
        return await fetch(`${config.API_ENDPOINT}/quote?symbol=${searchTicker}&token=${config.token}`)
        .then((res)=>res.json())
        .then(quote=>{
            console.log(quote);
            return quote.c;
        })
    }
}

export default ticket_service