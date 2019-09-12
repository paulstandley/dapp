import React, { Component } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import './App.css';

const ipfsClient = require('ipfs-http-client');
// leaving out arguments will defult to 
//const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' });
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      buffer: null,
      memeHash: "QmawXUXYTABpiC6yzWXQzYbAN5h9mhKPHkTsorqAoL53We"
    };
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
      this.setState({ memeHash }); 
      if(error) {
        console.error(error);
        return;
      }
      console.log(result);
      console.log(result[0].hash);
      console.log(this.state.memeHash);
      // step 2 store files on state to display and blockchain

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
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`} className="App-logo" alt="no meme" />
                </a>
                <p>&nbsp;</p>
                <div className="card">
                  <div className="card-header">
                    <h2>Change meme</h2>
                  </div>
                  <div className="card-body">
                    <form  onSubmit={this.onSubmit} className="form-group">
                      <input className="btn btn-info" type="file" onChange={this.onCapure} />
                      <input className="btn btn-primary" type="submit" />
                    </form>
                  </div>
                  <div className="card-footer">
                    <p></p>
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
