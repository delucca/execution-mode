import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface BuoyIconProperties extends IconProps, AcessibleIconProperties {}

const BuoyIcon = ({ title, desc, ...rest }: BuoyIconProperties): ReactElement => (
  <Icon viewBox="0 0 22 22" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M11 1C5.48613 1 1 5.48581 1 11C1 16.5142 5.48613 21 11 21C16.5139 21 21 16.5142 21 11C21 5.48581 16.5139 1 11 1ZM16.681 4.40677L14.6197 6.46806C13.6265 5.67226 12.3687 5.19355 11 5.19355C9.63129 5.19355 8.37355 5.67226 7.38 6.46774L5.31871 4.40645C6.84548 3.08968 8.83032 2.29032 11 2.29032C13.1697 2.29032 15.1545 3.08968 16.681 4.40677ZM11 15.5161C8.50968 15.5161 6.48387 13.4903 6.48387 11C6.48387 8.50968 8.50968 6.48387 11 6.48387C13.4903 6.48387 15.5161 8.50968 15.5161 11C15.5161 13.4903 13.4903 15.5161 11 15.5161ZM4.40677 5.31903L6.46806 7.38032C5.67226 8.37355 5.19355 9.63129 5.19355 11C5.19355 12.2861 5.61903 13.4719 6.32968 14.4352L4.25806 16.5068C3.02903 15.0052 2.29032 13.0874 2.29032 11C2.29032 8.83032 3.08968 6.84516 4.40677 5.31903ZM5.14613 17.4439L7.20516 15.3848C8.22419 16.2677 9.54903 16.8065 11 16.8065C12.2861 16.8065 13.4723 16.381 14.4355 15.6703L16.5071 17.7419C15.0052 18.971 13.0874 19.7097 11 19.7097C8.74839 19.7097 6.69355 18.851 5.14613 17.4439ZM17.4435 16.8539L15.3845 14.7948C16.2677 13.7758 16.8065 12.451 16.8065 11C16.8065 9.63129 16.3277 8.37355 15.5323 7.38L17.5935 5.31871C18.9103 6.84516 19.7097 8.83032 19.7097 11C19.7097 13.2513 18.8506 15.3065 17.4435 16.8539Z"
      strokeWidth="0.6"
    />
  </Icon>
)

BuoyIcon.defaultProps = {
  fill: 'black',
}

export default BuoyIcon