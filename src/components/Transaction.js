import React, { Component } from 'react';
import axios from 'axios';

const apiKey = process.env.ETHER_RADAR;
const endPoint = `https://api.etherscan.io/api`;

class Transaction extends Component{
  constructor(props){
    super(props);
    this.state = {
      transactions: []
    };
  }

  componentDidMount = () => {
    this.getTransactions();
  }

  getTransactions = async()=>{
    const { blockNo } = this.props;

    const blockDetail = await axios.get(endPoint + `?module=proxy&action=eth_getBlockByNumber&tag=${blockNo}&boolean=true&apikey=${apiKey}`)

    const { transactions } = blockDetail.data.result;

    let transactionDetails = [];

    for(let i=0; i < 5; i=i+1){
      const transactionx = transactions[i];
      transactionDetails.push(
        <table className="auto" key={i}>
          <thead>
          <tr>
            <th>
              Latest Transactions
            </th>
            <th>From</th>
            <th> To </th>
          </tr>
          </thead>
          <tbody>
              <tr>
              <td> {transactionx.hash} </td>
              </tr>
              <tr>
              <td>{transactionx.from}</td>
              </tr>
              <tr>
              <td>{transactionx.to}</td>
              </tr>
            </tbody>
        </table>
      );
    }
    this.setState({
      transactions: transactionDetails
    });
  };

  render(){
    return(
    <table class="auto">
      <thead>
        <tr>
          <th> Latest Transactions </th>
        </tr>
      </thead>
      <tbody>
         {this.state.transactions}
      </tbody>
    </table>
    );
  }
}

export default Transaction;
