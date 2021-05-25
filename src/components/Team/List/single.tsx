import { Box, Stack, Text } from '@chakra-ui/layout'
import { Heading, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { IntlLink, SliderWithFilledTrack } from '../../Base'
import { ArrowRight } from '../../Icon'
import { Team } from '../types'

import messages from './messages'

interface TeamListSingleProperties {
  team?: Team
}

export const TeamListSingle = ({ team }: TeamListSingleProperties) => {
  const intl = useIntl()

  const progress = team?.status?.progress ?? 0
  const isLoaded = Boolean(team)

  return (
    <Box borderColor="black.100" borderBottomWidth={1} _last={{ borderColor: 'transparent' }}>
      <IntlLink href={`/explore/${team?.id ?? ''}`}>
        <Stack
          direction="row"
          spacing={6}
          py={8}
          alignItems="center"
          _hover={{ svg: { fill: 'brand.400' } }}
        >
          <Stack flexGrow={1} spacing={4}>
            <Stack direction="row">
              <Skeleton isLoaded={isLoaded} flexGrow={1}>
                <Heading as="h3" color="gray.500" fontWeight={500} fontSize="lg">
                  {team?.name}
                </Heading>
              </Skeleton>

              <Skeleton isLoaded={isLoaded}>
                <Text color="gray.400" fontWeight={300} fontSize="md">
                  {intl.formatNumber(progress / 100, { style: 'percent' })}
                </Text>
              </Skeleton>
            </Stack>

            <Skeleton isLoaded={isLoaded} alignContent="flex-start" display="flex" minH={4}>
              <SliderWithFilledTrack value={progress} />
            </Skeleton>
          </Stack>

          <ArrowRight
            desc={intl.formatMessage(messages.anchorArrowRightDesc)}
            fill="black.300"
            transition=".2s fill ease-out"
          />
        </Stack>
      </IntlLink>
    </Box>
  )
}