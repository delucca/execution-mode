import { ButtonProps as MUIButtonProps, makeStyles } from '@material-ui/core'
import MUIButton from '@material-ui/core/Button'
import React, { ReactElement } from 'react'

import styles from './styles'

export interface ButtonProps extends MUIButtonProps {
  isActive?: boolean
  rounded?: boolean
}

const Button = ({ children, isActive, rounded, ...rest }: ButtonProps): ReactElement => {
  const classes = makeStyles(styles)({ isActive, rounded, ...rest })

  return (
    <MUIButton classes={classes} {...rest}>
      {children}
    </MUIButton>
  )
}

export default Button
