import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

import IntlLink from 'components/Base/IntlLink'

export interface MenuItemProperties {
  label: string
  href: string
}

const MenuItem = (properties: MenuItemProperties): ReactElement => {
  const router = useRouter()
  const isHrefCurrentRoute = router.pathname === properties.href

  return (
    <IntlLink href={properties.href}>
      <Button variant="text" isActive={isHrefCurrentRoute}>
        {properties.label}
      </Button>
    </IntlLink>
  )
}

export default MenuItem