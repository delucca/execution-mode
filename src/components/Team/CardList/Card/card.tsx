import { Box, Flex, Heading, Skeleton, SkeletonText, Text, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { DynamicAvatarGroup, IntlLink, SliderWithFilledTrack } from 'src/components/Base'
import CrownIcon from 'src/components/Icon/Crown'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { teamAtomFamily } from 'src/state/recoil/team'

import messages from './messages'

export interface TeamCardProperties {
  id?: Team['id']
}

const TeamCard = ({ id }: TeamCardProperties) => {
  const intl = useIntl()
  const team = useRecoilValue(teamAtomFamily(id))
  const [users, setUserEdges] = useConnectionEdges<User>()

  const isCompany = Boolean(team?.isCompany)
  const isLoaded = Boolean(team)
  const progress = team?.status?.progress ?? 0

  useEffect(() => {
    if (team) setUserEdges(team.users?.edges)
  }, [team, setUserEdges])

  return (
    <IntlLink href={id ?? '#'}>
      <Box
        bg="black.50"
        borderRadius={16}
        py={12}
        px={10}
        transition="0.4s all ease-out"
        _hover={{ bg: 'white', boxShadow: 'with-stroke.light', transform: 'scale(1.03)' }}
      >
        <Flex direction="column" gridGap={6} maxW="90%" minH="300px">
          <Flex flexGrow={1} direction="column" justifyContent="flex-end">
            <Box minH={8}>
              {isCompany && (
                <CrownIcon
                  title={intl.formatMessage(messages.crownIconTitle)}
                  desc={intl.formatMessage(messages.crownIconDesc)}
                  w={10}
                  h="auto"
                  fill="yellow.500"
                />
              )}
            </Box>
            <Skeleton isLoaded={isLoaded} mt={2} {...buildSkeletonMinSize(isLoaded, 200, 40)}>
              <Heading size="lg" color="black.900">
                {team?.name}
              </Heading>
            </Skeleton>
          </Flex>

          <SkeletonText isLoaded={isLoaded} noOfLines={3} spacing="4">
            <Text color="gray.400" noOfLines={3}>
              {team?.description}
            </Text>
          </SkeletonText>

          <Stack direction="row" gridGap={4} alignItems="center">
            <Skeleton isLoaded={isLoaded} borderRadius="full" flexGrow={1} display="flex">
              <SliderWithFilledTrack trackThickness={3} value={progress} trackBg="black.200" />
            </Skeleton>

            <Skeleton isLoaded={isLoaded} borderRadius="full">
              <Text fontSize="md" color="black.600">
                {intl.formatNumber(progress / 100, { style: 'percent' })}
              </Text>
            </Skeleton>
          </Stack>

          <Box pt={12}>
            <DynamicAvatarGroup users={users} isLoaded={isLoaded} />
          </Box>
        </Flex>
      </Box>
    </IntlLink>
  )
}

export default TeamCard
