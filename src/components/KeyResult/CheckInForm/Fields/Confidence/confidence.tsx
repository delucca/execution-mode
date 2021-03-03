import { Box, Flex, FormLabel, MenuItemOption } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import SelectMenu from 'src/components/Base/SelectMenu'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag/confidence-tag'
import {
  CONFIDENCE_HIGH,
  CONFIDENCE_MEDIUM,
  CONFIDENCE_LOW,
  CONFIDENCE_BARRIER,
  normalizeConfidence,
} from 'src/state/hooks/useConfidenceTag/hook'

import messages from './messages'

const CheckInFormFieldCurrentConfidence = () => {
  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<CheckInFormValues>()
  const normalizedConfidence = normalizeConfidence(values.confidence)

  const handleChange = async (newValue: string | string[]) => {
    setFieldValue('confidence', Number.parseInt(newValue as string, 10))
  }

  return (
    <Box>
      <FormLabel>{intl.formatMessage(messages.label)}</FormLabel>
      <SelectMenu
        matchWidth
        placeholder={
          <Flex justifyContent="flex-start">
            <ConfidenceTag confidenceValue={normalizedConfidence} />
          </Flex>
        }
        value={normalizedConfidence.toString()}
        onChange={handleChange}
      >
        <MenuItemOption value={CONFIDENCE_HIGH.max.toString()}>
          <ConfidenceTag showHelperText confidenceValue={CONFIDENCE_HIGH.max} />
        </MenuItemOption>

        <MenuItemOption value={CONFIDENCE_MEDIUM.max.toString()}>
          <ConfidenceTag showHelperText confidenceValue={CONFIDENCE_MEDIUM.max} />
        </MenuItemOption>

        <MenuItemOption value={CONFIDENCE_LOW.max.toString()}>
          <ConfidenceTag showHelperText confidenceValue={CONFIDENCE_LOW.max} />
        </MenuItemOption>

        <MenuItemOption value={CONFIDENCE_BARRIER.max.toString()}>
          <ConfidenceTag showHelperText confidenceValue={CONFIDENCE_BARRIER.max} />
        </MenuItemOption>
      </SelectMenu>
    </Box>
  )
}

CheckInFormFieldCurrentConfidence.defaultProps = {
  submitOnBlur: false,
}

export default CheckInFormFieldCurrentConfidence
