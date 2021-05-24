import React from 'react'
import clsx from 'clsx'
import text from './App.text'
import AppBar from './AppBar'
import Theme from './Theme'
import {
  Container,
  CssBaseline,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  makeStyles,
  responsiveFontSizes,
} from '@material-ui/core'

const theme = responsiveFontSizes(Theme({}))

const useStyles = makeStyles((theme) => {
  console.log({theme})
  return {
    root: {
      display: 'flex',
    },
    twapAlgorithmForm: {
      // backgroundColor: theme.palette.background.paper,
      maxWidth: '600px',
      minWidth: '200px',
      margin: 'auto',
      marginTop: '100px',
      padding: '20px'
    }
  }
})

function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <AppBar/>
        <Container>
          <Paper className={clsx(classes.twapAlgorithmForm)}>
            <Typography>{text.twapTitle}</Typography>
            <TextField
              label={text.quantity}
            />
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
