import React, { Component } from 'react';
import logo1 from '../components/img/logo1.png';
import './App.css';

class App extends Component {
  onCapure = (evt) => {
    evt.preventDefault();
    // Prosess file for IPFS
    const file = evt.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      console.log("bufferd", Buffer(reader.result));
    }
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            meme of the day
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <header>
                  <h1>Meme storage useing Ethereum Dapp With IPFS - Blockchain</h1>
                </header>
                <p>&nbsp;</p>
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo1} className="App-logo" alt="logo" />
                </a>
                <p>&nbsp;</p>
                <h2>Change meame</h2>
                <form className="form">
                  <input type="file" onChange={this.onCapure} />
                  <input type="submit" />
                </form>
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
