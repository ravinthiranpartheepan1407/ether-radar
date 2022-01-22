import React, { Component } from 'react';
import axios from 'axios';
import Blocks from "../components/Blocks";
import Transaction from "../components/Transaction";
const apiKey = process.env.ETHER_RADAR;

const endPoint = `https://api.etherscan.io/api`;

class Eth extends Component{
  constructor(){
      super();
      this.state = {
        ethUSD: "",
        ethBTC: "",
        blockNo: "",
        latestBlock: 0,
        difficulty: "",
        marketCap: 0
      };
  }

  async componentDidMount(){
    axios.get(endPoint + `?module=stats&action=ethprice&apikey=${apiKey}`)
      .then(response=>{
        const { result } = response.data;
        this.setState({
          ethUSD: result.ethusd,
          ethBTC: result.ethbtc
        },
        () => {
          axios.get(endPoint + `?module=stats&action=ethsupply&apikey=${apiKey}`)
            .then(response => {
              const { result } = response.data;
              const priceWei = result.toString();
              const priceEth = priceWei.slice(0, priceWei.length - 18);
              console.log(result, priceWei, priceEth);

              this.setState({
                marketCap: parseInt(priceEth) * this.setState.ethUSD
              });
            });
        }
      )
    });

    axios.get(endPoint + `?module=stats&action=eth_blockNumber&apikey=${apiKey}`)
      .then(response => {
        this.setState({
          latestBlock: parseInt(response.data.result),
          blockNo: response.data.result
        });

        axios.get(endPoint + `?module=stats&action=eth_chainsize&apikey=${apiKey}`)
          .then(blockDetail => {
            const { result } = blockDetail.data;
            const difficulty = parseInt(result.blockNumber);

            this.setState({
              difficulty: difficulty
            });
          });
      });

  }



getLatestBlocks = () => {
  if(this.state.latestBlock){
    return<Blocks latestBlock={this.state.latestBlock}></Blocks>
  }
}

  getLatestTransaction = () => {
    if(this.state.blockNo){
      return<Transaction blockNo={this.state.blockNo}></Transaction>

  }
};


  render(){
    const { ethUSD, ethBTC, latestBlock, difficulty, marketCap } = this.state;
    return(
      <div className = "grid gap-4 grid-cols-4 grid-rows-2">

          <a href="#" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ETH PRICE</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400"> { ethUSD } </p>
          </a>



          <a href="#" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ETH(BTC) PRICE</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400"> { ethBTC } </p>
          </a>



          <a href="#" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">LATEST BLOCK</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400"> { latestBlock } </p>
          </a>



          <a href="#" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">DIFFICULTY LEVEL</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400"> { difficulty } </p>
          </a>



          <a href="#" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Market Cap</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400"> { marketCap } </p>
          </a>

          <div className="grid grid-cols-1 gap-4">
            <div>{this.getLatestBlocks()}</div>
            <div class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{this.getLatestTransaction()}</div>
          </div>

      </div>
    )
  }
}

export default Eth;
