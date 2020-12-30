import { Grid, GridItem, GridProps, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import { KEY_RESULT_LIST_BODY_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'

import messages from './messages'
import { KeyResultListColumnHeadProperties } from './types'

export interface KeyResultListHeadProperties {
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KEY_RESULT_LIST_BODY_COLUMN[]
  headProperties: KeyResultListColumnHeadProperties
}

const KeyResultListHead = ({
  templateColumns,
  borderColor,
  columns,
  headProperties,
}: KeyResultListHeadProperties): ReactElement => {
  const intl = useIntl()
  const columnMessages = {
    [KEY_RESULT_LIST_BODY_COLUMN.TITLE]: messages.listHeadTitle,
    [KEY_RESULT_LIST_BODY_COLUMN.OKR]: messages.listHeadOKR,
    [KEY_RESULT_LIST_BODY_COLUMN.STATUS]: messages.listHeadStatus,
    [KEY_RESULT_LIST_BODY_COLUMN.PROGRESS]: messages.listHeadProgress,
    [KEY_RESULT_LIST_BODY_COLUMN.CYCLE]: messages.listHeadDate,
    [KEY_RESULT_LIST_BODY_COLUMN.OWNER]: messages.listHeadOwner,
    [KEY_RESULT_LIST_BODY_COLUMN.STATUS_COLOR]: messages.listHeadStatusColor,
  }

  return (
    <Grid
      templateColumns={templateColumns}
      pb={4}
      color="gray.400"
      fontWeight={500}
      borderBottom={1}
      borderColor={borderColor}
      borderStyle="solid"
    >
      {columns.map((column) => {
        const columnProperties = headProperties[column]

        return (
          <GridItem
            key={`KEY_RESULT_LIST_HEAD_COLUMN_${column}`}
            px={columnProperties?.hidden ? 0 : 4}
          >
            <Text hidden={columnProperties?.hidden}>
              {intl.formatMessage(columnMessages[column])}
            </Text>
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default KeyResultListHead
