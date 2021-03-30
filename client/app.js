import React from 'react'

import Navbar from './components/navbar'
import Routes from './routes'



const App = () => {
  return (
      <div>
        <Navbar history={history} />
        <Routes />
      </div>
  )
}

export default App
