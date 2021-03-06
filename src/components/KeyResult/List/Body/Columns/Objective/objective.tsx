import { Flex, Box, Text, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import StackIcon from 'src/components/Icon/Stack'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import messages from './messages'

export interface KeyResultListBodyColumnObjectiveProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const objectiveSelector = buildPartialSelector<KeyResult['objective']>('objective')

const KeyResultListBodyColumnObjective = ({
  id,
}: KeyResultListBodyColumnObjectiveProperties): ReactElement => {
  const objective = useRecoilValue(objectiveSelector(id))
  const intl = useIntl()

  const isObjectiveLoaded = Boolean(objective)

  return (
    <KeyResultListBodyColumnBase>
      <Flex gridGap={4} alignItems="center">
        <Skeleton borderRadius={10} isLoaded={isObjectiveLoaded}>
          <Box borderRadius={10} p={4} bg="gray.50">
            <StackIcon
              desc={intl.formatMessage(messages.stackIconDesc)}
              fill="gray.200"
              w={8}
              h={8}
            />
          </Box>
        </Skeleton>

        <Box>
          <Skeleton
            isLoaded={isObjectiveLoaded}
            {...buildSkeletonMinSize(isObjectiveLoaded, 150, 20)}
          >
            <Text color="gray.300">{objective?.title}</Text>
          </Skeleton>
        </Box>
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnObjective
