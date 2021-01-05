import { useLazyQuery } from '@apollo/client'
import { AccordionPanel } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultList from 'src/components/KeyResult/List'
import { KEY_RESULT_LIST_BODY_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import queries from './queries.gql'

export interface ObjectiveAccordionPanelProperties {
  isExpanded: boolean
  objectiveID?: Objective['id']
}

export interface GetObjectiveKeyResultsQuery {
  objective: Partial<Objective>
}

const ObjectiveAccordionPanel = ({
  isExpanded,
  objectiveID,
}: ObjectiveAccordionPanelProperties) => {
  const [fetchObjective, { data, loading, called }] = useLazyQuery<GetObjectiveKeyResultsQuery>(
    queries.GET_OBJECTIVE_KEY_RESULTS,
  )
  const loadObjective = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const objective = useRecoilValue(objectiveAtomFamily(objectiveID))
  const keyResultIDs = objective?.keyResults?.map((keyResult) => keyResult.id)

  useEffect(() => {
    if (isExpanded && !called) fetchObjective({ variables: { objectiveID } })
  }, [isExpanded, called, fetchObjective, objectiveID])

  useEffect(() => {
    if (!loading && data) {
      loadObjective(data?.objective)
      loadKeyResults(data?.objective?.keyResults)
    }
    // If we add the "loadObjective" and "loadKeyResults" in our deps it starts an infinite loop
    // upon execution, since it changes on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data])

  return (
    <AccordionPanel>
      {isExpanded && (
        <KeyResultList
          id={`OBJECTIVE_${objectiveID ?? uniqueId()}_ACCORDION`}
          py={8}
          keyResultIDs={keyResultIDs}
          templateColumns="0.1fr 2fr 1fr 2fr 1fr 2fr"
          columns={[
            KEY_RESULT_LIST_BODY_COLUMN.CONFIDENCE_LEVEL_COLOR,
            KEY_RESULT_LIST_BODY_COLUMN.KEY_RESULT,
            KEY_RESULT_LIST_BODY_COLUMN.CONFIDENCE_LEVEL,
            KEY_RESULT_LIST_BODY_COLUMN.PROGRESS,
            KEY_RESULT_LIST_BODY_COLUMN.CYCLE,
            KEY_RESULT_LIST_BODY_COLUMN.OWNER,
          ]}
          headProperties={{
            [KEY_RESULT_LIST_BODY_COLUMN.CONFIDENCE_LEVEL_COLOR]: {
              hidden: true,
            },
          }}
          bodyProperties={{
            [KEY_RESULT_LIST_BODY_COLUMN.OWNER]: {
              displayName: true,
            },
          }}
        />
      )}
    </AccordionPanel>
  )
}

export default ObjectiveAccordionPanel