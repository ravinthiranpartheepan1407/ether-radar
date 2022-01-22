import React, { Component } from 'react';
import axios from 'axios';

const apiKey = process.env.ETHER_RADAR;
const endPoint = `https://api.etherscan.io/api`;

class Blocks extends Component{
  constructor(props){
    super(props);
    this.state = {
      blocks: [],
    };
  }

  componentDidMount = () =>{
    this.getBlocks();
  };

  getBlocks = async() =>{
    const { latestBlock } = this.props;

    let blocks = [];

    for(let i=0; i<5; i = i+1){
      const blockDetail = await axios.get(endPoint + `?module=proxy&action=eth_getBlockByNumber&tag=${ ( latestBlock - i ).toString(16)}&boolean=true&apikey=${apiKey}`);

      const { result } = blockDetail.data;
      blocks.push(
        <table className="auto" key={i}>
          <thead>
          <tr>
            <th>
              Latest Block
            </th>
            <th>Miner</th>
            <th> Transaction </th>
          </tr>
          </thead>
          <tbody>
              <tr>
              <td> {latestBlock - i} </td>
              </tr>
              <tr>
              <td>{result.miner}</td>
              </tr>
              <tr>
              <td>{result.transactions.length}</td>
              </tr>
            </tbody>
        </table>
      );
      this.setState({
        blocks: blocks
      });
    }
  };

  render(){
    return(
      <table class="auto">
        <thead>
          <tr>
            <th> Latest Block </th>
          </tr>
        </thead>
        <tbody>
           {this.state.blocks}
        </tbody>
      </table>
    );
  }
}

export default Blocks;
