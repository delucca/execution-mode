import { Accordion, Box, Heading, Skeleton } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'

import ObjectiveAccordionItem from '../AccordionItem'
import { Objective } from '../types'

import ObjectivesSkeleton from './objectives-skeleton'

export interface ObjectiveGroupProperties {
  groupTitle?: string
  objectiveIDs?: Array<Objective['id']>
}

const ObjectiveGroup = ({ groupTitle, objectiveIDs }: ObjectiveGroupProperties) => {
  const isLoaded = Boolean(objectiveIDs && objectiveIDs.length > 0)

  return (
    <Box borderRadius="15px" bg="gray.50" p={6}>
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 200, 24)}>
        <Heading fontSize="20px" as="h3" fontWeight={500}>
          {groupTitle}
        </Heading>
      </Skeleton>

      <Accordion allowToggle pt={6} display="flex" flexDirection="column" gridGap={6}>
        {isLoaded ? (
          objectiveIDs?.map((objectiveID) => (
            <ObjectiveAccordionItem
              key={`${groupTitle ?? uniqueId()}_OBJECTIVE_ACCORDION_${objectiveID ?? uniqueId()}`}
              objectiveID={objectiveID}
            />
          ))
        ) : (
          <ObjectivesSkeleton />
        )}
      </Accordion>
    </Box>
  )
}

export default ObjectiveGroup