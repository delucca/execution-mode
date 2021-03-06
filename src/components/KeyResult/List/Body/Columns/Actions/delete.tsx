import { useMutation } from '@apollo/client'
import { IconButton, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { ConfirmationDialog } from '../../../../../Base/ConfirmationDialog/wrapper'
import { TrashBinOutlineIcon } from '../../../../../Icon/TrashBinOutline/trash-bin-outline'
import { DeleteResult } from '../../../../../types'

import messages from './messages'
import queries from './queries.gql'

interface DeleteActionProperties {
  id?: string
  onDelete?: (id?: string) => void
}

interface DeleteKeyResultMutationResult {
  deleteKeyResult: DeleteResult
}

export const DeleteAction = ({ id, onDelete }: DeleteActionProperties) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const intl = useIntl()
  const toast = useToast()
  const [deleteKeyResult, { data, error }] = useMutation<DeleteKeyResultMutationResult>(
    queries.DELETE_KEY_RESULT,
    {
      variables: {
        keyResultID: id,
      },
    },
  )

  const handleOpen = () => {
    if (!isDialogOpen) setIsDialogOpen(true)
  }

  const handleClose = () => {
    if (isDialogOpen) setIsDialogOpen(false)
  }

  const handleDelete = async () => {
    await deleteKeyResult()
    if (onDelete) onDelete(id)
  }

  useEffect(() => {
    if (data) {
      toast({
        title: intl.formatMessage(messages.deleteSuccessToastMessage),
        status: 'success',
      })
    }
  }, [data, toast, intl])

  useEffect(() => {
    if (error) {
      toast({
        title: intl.formatMessage(messages.deleteErrorToastMessage),
        status: 'error',
      })
    }
  }, [error, toast, intl])

  return (
    <>
      <IconButton
        aria-label={intl.formatMessage(messages.deleteIconDesc)}
        fontSize="lg"
        w={12}
        h={12}
        variant="solid"
        bg="black.100"
        color="gray.500"
        _hover={{
          bg: 'red.500',
          color: 'white',
        }}
        onClick={handleOpen}
      >
        <TrashBinOutlineIcon
          desc={intl.formatMessage(messages.deleteIconDesc)}
          fill="currentColor"
        />
      </IconButton>

      <ConfirmationDialog
        dangerousAction
        isOpen={isDialogOpen}
        type={intl.formatMessage(messages.deleteDialogType)}
        description={intl.formatMessage(messages.deleteFirstDialogDescription)}
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </>
  )
}
