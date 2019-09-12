import React from 'react'

export default function Navbar() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark fixed-top flex-md-nowrap p-0 mb-1 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Meme of the day
        </a>
      </nav>
    </React.Fragment>
  )
}
