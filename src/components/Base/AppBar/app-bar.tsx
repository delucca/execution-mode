import { Flex } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import Logotype from 'src/components/Base/Logotype'
import Me from 'src/components/User/Me'

import AppBarHelperButtons from './HelperButtons'
import AppBarMenuItem from './MenuItem'
import { RIGHT_WING_GRID_GAP } from './constants'
import messages from './messages'

export type AppBarVariant = 'default' | 'onlyLogotype'

export interface AppBarProperties {
  variant: AppBarVariant
}

const AppBar = ({ variant }: AppBarProperties): ReactElement => {
  const intl = useIntl()

  return (
    <Flex
      px={6}
      py={4}
      borderBottom={1}
      gridGap={10}
      borderColor="gray.100"
      borderStyle="solid"
      alignItems="center"
      justifyContent="center"
    >
      <Logotype />

      {variant !== 'onlyLogotype' && (
        <>
          <Flex gridGap={20} flexGrow={1}>
            <AppBarMenuItem label={intl.formatMessage(messages.firstMenuItem)} href="/" />
            <AppBarMenuItem
              label={intl.formatMessage(messages.secondMenuItem)}
              href="/my-key-results"
            />
            <AppBarMenuItem label={intl.formatMessage(messages.thirdMenuItem)} href="/explore" />
          </Flex>

          <Flex
            justifySelf="flex-end"
            display="flex"
            alignItems="center"
            gridGap={RIGHT_WING_GRID_GAP}
          >
            <AppBarHelperButtons />
            <Me />
          </Flex>
        </>
      )}
    </Flex>
  )
}

AppBar.defaultProps = {
  variant: 'default',
}

export default AppBar
