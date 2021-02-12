import { PopoverCloseButton, PopoverContent, PopoverHeader } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { Close as CloseIcon } from 'src/components/Icon'
import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'
import { KeyResult } from 'src/components/KeyResult/types'
import {
  keyResultCheckInProgressDraft,
  keyResultCheckInPopoverOpen,
} from 'src/state/recoil/key-result/check-in'

import messages from './messages'

export interface ProgressSliderContentProperties {
  keyResultID?: KeyResult['id']
  onClose?: () => void
}

const handleMouseDownCapture = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
  event.stopPropagation()
}

const ProgressSliderPopover = ({ keyResultID, onClose }: ProgressSliderContentProperties) => {
  const intl = useIntl()
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const setPopoverOpen = useSetRecoilState<boolean>(keyResultCheckInPopoverOpen(keyResultID))

  const handleSubmit = (values: CheckInFormValues) => {
    if (values.newProgress) setDraftValue(values.newProgress)
    setPopoverOpen(false)
  }

  return (
    <PopoverContent width={400} p={6} cursor="auto" onMouseDownCapture={handleMouseDownCapture}>
      <PopoverHeader
        border="none"
        fontSize="md"
        fontWeight={700}
        color="gray.600"
        px={0}
        pt={0}
        pb={6}
      >
        {intl.formatMessage(messages.popoverTitle)}
      </PopoverHeader>
      <PopoverCloseButton
        size="md"
        top="1rem"
        right="1.5rem"
        color="gray.200"
        _hover={{ bg: 'transparent', color: 'brand.400' }}
      >
        <CloseIcon
          title={intl.formatMessage(messages.closeIconTitle)}
          desc={intl.formatMessage(messages.closeIconDesc)}
          fill="currentColor"
        />
      </PopoverCloseButton>
      <CheckInForm keyResultID={keyResultID} afterSubmit={handleSubmit} onCancel={onClose} />
    </PopoverContent>
  )
}

export default ProgressSliderPopover
