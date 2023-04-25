import { useState, useEffect } from "react";
import {ethers} from "ethers";
import Manager from "./artifacts/contracts/Manager.sol/Manager.json";
import "./App.css";

function App() {
const [name, setName] = useState("");
const [account, setAccount] = useState("");
const [contract, setContract] = useState(null);
const [tickets, setTickets] = useState([]);

const getTickets = async () => {
    const transaction = await contract.getTickets();
    setTickets(transaction);
};

const createTicket = async (_name) => {
    const transaction = await contract.createTicket(_name);
    await transaction.wait();
    getTickets();
};

const updateTicketStatus = async(_index, _status) => {
    const transaction = await contract.updateTicketStatus(_index,_status);
    await transaction.wait();
    getTickets();
};

const renameTicket = async(_index) => {
    let newName = prompt("Please enter a new ticket name", "");
    const transaction = await contract.updateTicketName(_index, newName);
    await transaction.wait();
    getTickets();
};

const initConnection = async () => {
    if(typeof window.ethereum !== "undefined") {
       const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
       });
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const newSigner = provider.getSigner(); 
       setAccount(accounts[0]);
       setContract(new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Manager.abi, newSigner ));
    } else {
        console.log("please install metamask");
    }
};

useEffect(() => {
    initConnection();
},[]);


  return (
    <div className="page">
        <div className="Header">
            <p> Task Manager</p>
            {account != "" ? <p>{account.substring(0,9)}</p> : <button className="big_button" onClick={initConnection}> Connect</button>}
        </div>
        <div className="input_section">
            <div>
            <button className="big_button" onClick={ () => createTicket(name)}> 
            Create Ticket
            </button>
            
            <input 
            className= "input"
            onChange={(e) => setName(e.target.value)}
            placeholder="Ticket Name"
            />
            </div>
        <button className="big_button" onClick={getTickets}> 
            Load Data
        </button>
        </div>
        <div className="main">         
        <div className="main_col" style={{backgroundColor: "lightPink"}}>
            <div className="main_col_heading"> Todo</div>

            {tickets.map((t, i) => ({id: 1, item: t})).filter((t) => t.item.status == 0).map((ticket, index) => {
            return (
                <div key={index} className="main_ticket_card"> 
                <p className="main_ticket_card_id">#{index+1}</p>
                <p>{ticket.item.name}</p>
                <div className="main_ticket_button_section">
                    <button 
                    className="small_button"
                    style={{backgroundColor: "lightBlue"}}
                    onClick={()=> updateTicketStatus(index, 1)}
                    >
                    Busy
                    </button>
                    <button 
                    className="small_button"
                    style={{backgroundColor: "lightGreen"}}
                    onClick={()=> updateTicketStatus(index, 2)}
                    >
                    Done
                    </button>
                    <button 
                    className="small_button"
                    style={{backgroundColor: "lightGrey"}}
                    onClick={()=> renameTicket(index)}
                    >
                    Rename
                    </button>
                </div>
                </div>
            );
        })}

        </div>
        <div className="main_col" style={{backgroundColor: "lightBlue"}}>
            <div className="main_col_heading"> Busy</div>

            {tickets.map((t, i) => ({id: 1, item: t})).filter((t) => t.item.status == 1).map((ticket, index) => {
            return (
                <div key={index} className="main_ticket_card"> 
                <p className="main_ticket_card_id">#{index+1}</p>
                <p>{ticket.item.name}</p>
                <div className="main_ticket_button_section">
                    <button 
                    className="small_button"
                    style={{backgroundColor: "lightPink"}}
                    onClick={()=> updateTicketStatus(index, 0)}
                    >
                    Todo
                    </button>
                    <button 
                    className="small_button"
                    style={{backgroundColor: "lightGreen"}}
                    onClick={()=> updateTicketStatus(index, 2)}
                    >
                    Done
                    </button>
                    <button 
                    className="small_button"
                    style={{backgroundColor: "lightGrey"}}
                    onClick={()=> renameTicket(index)}
                    >
                    Rename
                    </button>
                </div>
                </div>
            );
        })}
        </div>
        <div className="main_col" style={{backgroundColor: "lightGreen"}}>
            <div className="main_col_heading"> Done</div>

            {tickets.map((t, i) => ({id: 1, item: t})).filter((t) => t.item.status == 2).map((ticket, index) => {
            return (
                <div key={index} className="main_ticket_card"> 
                <p className="main_ticket_card_id">#{index+1}</p>
                <p>{ticket.item.name}</p>
                <div className="main_ticket_button_section">
                    <button 
                    className="small_button"
                    style={{backgroundColor: "lightPink"}}
                    onClick={()=> updateTicketStatus(index, 0)}
                    >
                    Todo
                    </button>
                    <button 
                    className="small_button"
                    style={{backgroundColor: "lightBlue"}}
                    onClick={()=> updateTicketStatus(index, 1)}
                    >
                    Busy
                    </button>
                    <button 
                    className="small_button"
                    style={{backgroundColor: "lightGrey"}}
                    onClick={()=> renameTicket(index)}
                    >
                    Rename
                    </button>
                </div>
                </div>
            );
        })}
        </div>

    </div>
        


        
    </div>
  );
}

export default App;
