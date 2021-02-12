import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'

import messages from './messages'

const KeyResultSectionTimelineCardEmptyState = () => {
  const intl = useIntl()

  return (
    <KeyResultSectionTimelineCardBase borderWidth={0} bg="blue.50">
      <Flex direction="column" alignItems="center" gridGap={2} py={4}>
        <Box>
          <Image src="/images/ghost-drawing.png" />
        </Box>
        <Heading as="h3" fontSize="md" color="gray.600">
          {intl.formatMessage(messages.title)}
        </Heading>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          {intl.formatMessage(messages.description)}
        </Text>
      </Flex>
    </KeyResultSectionTimelineCardBase>
  )
}

export default KeyResultSectionTimelineCardEmptyState