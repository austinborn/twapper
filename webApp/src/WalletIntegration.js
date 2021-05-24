import React from 'react'
import { useState } from 'react'
import clsx from 'clsx'
import text from './App.text'
import {
  Button,
  Typography,
  makeStyles
} from '@material-ui/core'
import Web3 from 'web3'

import { formatShortAddress } from './utils'

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const useStyles = makeStyles((theme) => ({
  button: {
    // color: theme.palette.primary.light,
    // backgroundColor: theme.palette.primary.light,
    justifySelf: 'flex-end',
    width: '300px'
  },
  walletIntegration: {
  }
}))

function WalletIntegration() {
  const classes = useStyles()

  const [account, setAccount] = useState({address: null, balance: null});

  const isMetamaskInstalled = typeof window.ethereum !== 'undefined'

  const onClickConnect = async e => {
    console.log({Web3})
    if (isMetamaskInstalled) {
      const address = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
      const weiBalance = (await web3.eth.getBalance(address))
      const balance = weiBalance.slice(0, weiBalance.length - 18) + "." + weiBalance.slice(weiBalance.length - 18, weiBalance.length - 15)
    setAccount({address, balance });
    } else {
      console.log("Please install metamask");
    }
  }

  return (
    <div className={classes.walletIntegration}>
      <Typography>
    {`${text.balance} ${account.balance || text.na} ${text.eth}`}
    </Typography>
    <Button
      onClick={onClickConnect}
      className={clsx(classes.button)}
    >
      <Typography>
      {account.address ? formatShortAddress(account.address) : text.connectWallet}
      </Typography>
    </Button>
    </div>
  )
}

export default WalletIntegration
