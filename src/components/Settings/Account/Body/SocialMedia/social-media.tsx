import { useMutation } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import EditableInputField from 'src/components/Base/EditableInputField'
import SettingsAccountBodySectionTitle from 'src/components/Settings/Account/Body/SectionTitle'
import { User } from 'src/components/User/types'
import { userSelector } from 'src/state/recoil/user'

import messages from './messages'
import queries from './queries.gql'

export interface SettingsAccountSocialMediaProperties {
  userID?: User['id']
  isLoaded?: boolean
}

interface UpdateUserSocialMediaMutationResult {
  updateUser: {
    id: User['id']
    linkedInProfileAddress: User['linkedInProfileAddress']
  }
}

const SettingsAccountBodySocialMedia = ({
  userID,
  isLoaded,
}: SettingsAccountSocialMediaProperties) => {
  const [user, setUser] = useRecoilState(userSelector(userID))
  const intl = useIntl()
  const [updateUser, { loading }] = useMutation<UpdateUserSocialMediaMutationResult>(
    queries.UPDATE_USER_SOCIAL_MEDIA,
    {
      onCompleted: (data) => {
        setUser(data.updateUser)
      },
    },
  )

  const handleValueUpdate = (key: keyof User) => async (value: string | string[] | null) => {
    if (user?.[key] === value) return
    // eslint-disable-next-line unicorn/no-null
    if (value === '') value = null

    const userData = {
      [key]: value,
    }

    await updateUser({
      variables: {
        userID,
        userData,
      },
    })
  }

  return (
    <Stack direction="column" spacing={6} maxW="xl">
      <SettingsAccountBodySectionTitle
        title={intl.formatMessage(messages.sectionTitle)}
        subtitle={intl.formatMessage(messages.sectionSubtitle)}
      />

      <EditableInputField
        label={intl.formatMessage(messages.firstFieldLabel)}
        value={user?.linkedInProfileAddress}
        isLoaded={isLoaded}
        isSubmitting={loading}
        onSubmit={handleValueUpdate('linkedInProfileAddress')}
      />
    </Stack>
  )
}

export default SettingsAccountBodySocialMedia
