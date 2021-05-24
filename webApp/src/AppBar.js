import React from 'react'
import clsx from 'clsx'
import {
  AppBar as MuiAppBar,
  SvgIcon,
  makeStyles,
} from '@material-ui/core'
import { ReactComponent as TwapperIcon } from './twapper_icon.svg'
import WalletIntegration from './WalletIntegration'

const useStyles = makeStyles((theme) => {
  console.log({ theme })
  return {
    appBar: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr 120px',
      position: 'sticky'
    },
  }
})

function AppBar() {
  const classes = useStyles()

  return (
    <MuiAppBar className={clsx(classes.appBar)}>
      <SvgIcon component={TwapperIcon} viewBox="0 0 600 476.6" />
      <WalletIntegration/>
    </MuiAppBar>
  )
}

export default AppBar
