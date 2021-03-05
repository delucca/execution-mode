import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TicketStarIconProperties extends IconProps, AcessibleIconProperties {}

const TicketStarIcon = ({ title, desc, ...rest }: TicketStarIconProperties): ReactElement => (
  <Icon viewBox="0 0 24 24" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      opacity="0.4"
      d="M21.25 13.4764C20.429 13.4764 19.761 12.8145 19.761 12.001C19.761 11.1865 20.429 10.5246 21.25 10.5246C21.449 10.5246 21.64 10.4463 21.78 10.3076C21.921 10.1679 22 9.97864 22 9.78146L21.999 7.10415C21.999 4.84102 20.14 3 17.856 3H6.144C3.86 3 2.001 4.84102 2.001 7.10415L2 9.86766C2 10.0648 2.079 10.2541 2.22 10.3938C2.36 10.5325 2.551 10.6108 2.75 10.6108C3.599 10.6108 4.239 11.2083 4.239 12.001C4.239 12.8145 3.571 13.4764 2.75 13.4764C2.336 13.4764 2 13.8093 2 14.2195V16.8949C2 19.158 3.858 21 6.143 21H17.857C20.142 21 22 19.158 22 16.8949V14.2195C22 13.8093 21.664 13.4764 21.25 13.4764"
    />
    <path d="M15.4306 11.5882L14.2516 12.7362L14.5306 14.3592C14.5786 14.6402 14.4656 14.9172 14.2346 15.0832C14.0056 15.2512 13.7066 15.2722 13.4546 15.1382L11.9996 14.3732L10.5416 15.1392C10.4336 15.1962 10.3156 15.2262 10.1986 15.2262C10.0456 15.2262 9.89458 15.1782 9.76458 15.0842C9.53458 14.9172 9.42158 14.6402 9.46958 14.3592L9.74758 12.7362L8.56858 11.5882C8.36458 11.3902 8.29358 11.0992 8.38158 10.8282C8.47058 10.5582 8.70058 10.3662 8.98158 10.3262L10.6076 10.0892L11.3366 8.6122C11.4636 8.3582 11.7176 8.2002 11.9996 8.2002H12.0016C12.2846 8.2012 12.5386 8.3592 12.6636 8.6132L13.3926 10.0892L15.0216 10.3272C15.2996 10.3662 15.5296 10.5582 15.6176 10.8282C15.7066 11.0992 15.6356 11.3902 15.4306 11.5882" />
  </Icon>
)

TicketStarIcon.defaultProps = {
  fill: 'black',
}

export default TicketStarIcon
