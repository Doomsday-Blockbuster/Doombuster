import React from 'react'

import Navbar from './components/navbar'
import Routes from './routes'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
       main: "#000080"
              },
    secondary: {
       main: "#34ebe5"
               }
          }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <Routes />
      </div>
    </ThemeProvider>
  )
}

export default App
