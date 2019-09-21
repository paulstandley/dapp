import React, { Component } from 'react';
import Web3 from 'web3';
import Navbar from './Navbar';
import Header from './Header';
import './App.css';
import Meme from '../abis/Meme.json';

const memeData = [];
const ipfsClient = require('ipfs-http-client');
// leaving out arguments will defult to 
//const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' });
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = await Meme.networks[networkId];
    if(networkData) {
      const abi = Meme.abi;
      const address = networkData.address;
      // Fetch contract
      const contract = web3.eth.Contract(abi, address);
      this.setState({ contract });
      const memeHash = await contract.methods.get().call();
      this.setState({ memeHash });
    }else{
      window.alert("Smart contract not deployed to detected network");
    }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      buffer: null,
      contract: null,
      memeHash: "",
      memeHashDefault: "QmawXUXYTABpiC6yzWXQzYbAN5h9mhKPHkTsorqAoL53We"
    };
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }else{
      window.alert('Please use metamask!');
    }
  }

  onCapure = (evt) => {
    evt.preventDefault();
    // Prosess file for IPFS // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    const file = evt.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      // put buffered file in state
      console.log("bufferd", Buffer(reader.result));
      this.setState({ buffer: Buffer(reader.result) })
    }
  }
  // funny Qmdnokm1cyghqkdvMwU7BZCiu6aHTuRyQSf75sWMreYTza
  // exp hash: QmQJgEnNQcQAyWZZMQ7kDR4tHHFsQ6SMqxstppu2D4Snsn
  // face palm QmawXUXYTABpiC6yzWXQzYbAN5h9mhKPHkTsorqAoL53We default
  // exp url: https://ipfs.infura.io/ipfs/QmQJgEnNQcQAyWZZMQ7kDR4tHHFsQ6SMqxstppu2D4Snsn
  onSubmit = (evt) => {
    evt.preventDefault();
    console.log("Submited");
    // step 1 add state to ipsf
    ipfs.add(this.state.buffer, (error, result) => {
      console.log("Ipfs result", result);
      const memeHash = result[0].hash;
      memeData.push(memeHash); 
      if(error) {
        console.error(error);
        return;
      }
      // step 2 store files on state to display and blockchain
      this.state.contract.methods.set(memeHash).send({ from: this.state.account }).then(() =>{
        this.setState({ memeHash });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <Header />
                <p>&nbsp;</p>
                <a
                  href="http://www.paulstandley.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.memeHash ? <img src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`} className="App-logo" alt="no meme" /> 
                  : <img src={`https://ipfs.infura.io/ipfs/${this.state.memeHashDefault}`} className="App-logo" alt="no meme" />}
                </a>
                <p>&nbsp;</p>
                <div className="card">
                  <div className="card-header">
                    <h2>Change meme</h2>
                  </div>
                  <div className="card-body">
                    <form  onSubmit={this.onSubmit} className="form-group">
                      <input className="btn input_file" type="file" onChange={this.onCapure} />
                      <input className="btn input_submit" type="submit" />
                    </form>
                  </div>
                  <div className="card-footer">
                    <p>You will need Crome and Metamask extionsion</p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default App;
