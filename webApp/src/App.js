import * as React from 'react'
import { useMemo, useState } from 'react'

// import { Decimal } from 'decimal.js'
import {
  Decimal
} from 'decimal.js'

import { isEmpty } from 'lodash'


import clsx from 'clsx'
import text from './App.text'
import AppBar from './AppBar'
import Theme from './Theme'
import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Paper,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  makeStyles,
  responsiveFontSizes,
} from '@material-ui/core'

const theme = responsiveFontSizes(Theme({}))

const useStyles = makeStyles((theme) => ({
  buttonDiv: {
    display: 'flex',
  },
  disableText: {
    color: '#9e9e9e',
  },
  executeButton: {
    margin: 'auto',
  },
  inLineText: {
    margin: '0.2rem 0.2rem 0rem',
    // display: 'flex',
    // alignItems: 'flex-end',
  },
  rowDiv: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px'
  },
  root: {
    display: 'flex',
  },
  select: {
    margin: '0rem 0.2rem',
  },
  textField: {
    margin: '0rem 0.2rem',
    "& .MuiInputBase-input": {
      textAlign: 'right'
    }
  },
  twapAlgorithmForm: {
    // backgroundColor: theme.palette.background.paper,
    maxWidth: '600px',
    minWidth: '200px',
    margin: 'auto',
    marginTop: '100px',
    padding: '20px',
  },
}))

const token0Options = [
  { label: 'ETH', value: 'eth' }
]

const token1Options = [
  { label: 'DAI', value: 'dai' }
]

const timeUnitOptions = [
  { label: 'Minute(s)', value: 'minute' },
  { label: 'Hour(s)', value: 'hour' },
  { label: 'Day(s)', value: 'day' }
]

const NUMBER_REGEX = /^[0-9]*\.?[0-9]*$/

const mapSelectOption = o => <option value={o.value}>{o.label}</option>

const cleanNumberInput = (number, setter) => () => {
  if (isEmpty(number)) return
  const decimal = new Decimal(number)
  setter(decimal.toString())
}

const handleChangeNumber = setter => event => String(event.target.value).match?.(NUMBER_REGEX) && setter(event.target.value)

function App() {
  const classes = useStyles()

  const [quantity, setQuantity] = useState('')
  const [timePeriod, setTimePeriod] = useState('')
  const [limitPrice, setLimitPrice] = useState('')
  const [intervals, setIntervals] = useState('')
  const [token0, setToken0] = useState(token0Options[0].value)
  const [token1, setToken1] = useState(token1Options[0].value)
  const [timeUnit, setTimeUnit] = useState(timeUnitOptions[0].value)
  const [limitPriceFlag, setLimitPriceFlag] = useState(false)

  const token0Label = useMemo(() => token0Options.find(o => o.value === token0).label, [token0])
  const token1Label = useMemo(() => token1Options.find(o => o.value === token1).label, [token1])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <AppBar/>
        <Container>
          <Paper className={clsx(classes.twapAlgorithmForm)}>
            <Typography style={{textAlign: 'center'}}>{text.twapTitle}</Typography>
            <div className={clsx(classes.rowDiv)}>
              <Typography className={clsx(classes.inLineText)}>{text.iWantToBuy}</Typography>
              <TextField
                className={clsx(classes.textField)}
                onBlur={cleanNumberInput(quantity, setQuantity)}
                onChange={handleChangeNumber(setQuantity)}
                placeholder={text.quantity}
                value={quantity}
              />
              <Select
                className={clsx(classes.select)}
                native
                value={token0}
                onChange={event => setToken0(event.target.value)}
                name="token0"
              >
                {token0Options.map(mapSelectOption)}
              </Select>
              <Typography className={clsx(classes.inLineText)}>{text.payingWith}</Typography>
              <Select
                className={clsx(classes.select)}
                native
                value={token1}
                onChange={event => setToken1(event.target.value)}
                name="token1"
              >
                {token1Options.map(mapSelectOption)}
              </Select>
            </div>
            <div className={clsx(classes.rowDiv)}>
              <Typography className={clsx(classes.inLineText)}>{text.in}</Typography>
              <TextField
                className={clsx(classes.textField)}
                onBlur={cleanNumberInput(intervals, setIntervals)}
                onChange={handleChangeNumber(setIntervals)}
                placeholder={text.intervals}
                value={intervals}
              />
              <Typography className={clsx(classes.inLineText)}>{text.intervals}</Typography>
              <Typography className={clsx(classes.inLineText)}>{text.over}</Typography>
              <TextField
                className={clsx(classes.textField)}
                onBlur={cleanNumberInput(timePeriod, setTimePeriod)}
                onChange={handleChangeNumber(setTimePeriod)}
                placeholder={text.time}
                value={timePeriod}
              />
              <Select
                className={clsx(classes.select)}
                native
                value={timeUnit}
                onChange={event => setTimeUnit(event.target.value)}
                name="timeUnit"
              >
                {timeUnitOptions.map(mapSelectOption)}
              </Select>
            </div>
            <div className={clsx(classes.rowDiv)}>
              <Checkbox
                checked={limitPriceFlag}
                onChange={event => setLimitPriceFlag(event.target.checked)}
              />
              <Typography className={clsx(classes.inLineText, !limitPriceFlag && classes.disableText)}>{text.payingAtMost}</Typography>
              <TextField
                className={clsx(classes.textField)}
                disabled={!limitPriceFlag}
                onBlur={cleanNumberInput(limitPrice, setLimitPrice)}
                onChange={handleChangeNumber(setLimitPrice)}
                placeholder={text.limitPrice}
                value={limitPrice}
              />
              <Typography className={clsx(classes.inLineText, !limitPriceFlag && classes.disableText)}>{`${token1Label} ${text.per} ${token0Label}`}</Typography>
            </div>
            <div className={clsx(classes.buttonDiv)}>
              <Button className={clsx(classes.executeButton)} variant="contained">{text.execute}</Button>
            </div>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
