import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { PageContent, PageHead } from 'src/components/Base'
import { PageProperties } from 'src/components/Page/types'
import ChildTeamsObjectives from 'src/components/Team/ChildTeamsObjectives'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { pageTitleAtom } from 'src/state/recoil/page'
import { teamAtomFamily } from 'src/state/recoil/team'

import messages from './messages'
import queries from './queries.gql'
import { GetTeamNameQuery } from './types'

export interface ExploreTeamPageProperties extends PageProperties {
  teamId: Team['id']
}

const ExploreTeamPage = ({ teamId, isRootPage }: ExploreTeamPageProperties) => {
  const intl = useIntl()
  const setPageTitle = useSetRecoilState(pageTitleAtom)
  const { data, loading } = useQuery<GetTeamNameQuery>(queries.GET_TEAM_NAME, {
    variables: {
      teamId,
    },
  })
  const loadTeamOnRecoil = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const teamName = data?.team.name
  const metaTitleLoadingFallback = intl.formatMessage(messages.metaTitleLoadingFallback)

  const breadcrumbParameters = {
    id: teamName ?? '',
  }

  useEffect(() => {
    if (!data && loading) setPageTitle('')
  }, [data, loading, setPageTitle])

  useEffect(() => {
    if (!loading && data) setPageTitle(data?.team.name)
  }, [loading, data, setPageTitle])

  useEffect(() => {
    if (!loading && data) loadTeamOnRecoil(data?.team)
  }, [data, loading, loadTeamOnRecoil])

  return (
    <PageContent breadcrumbParams={breadcrumbParameters} showBreadcrumb={!isRootPage}>
      <PageHead
        title={messages.metaTitle}
        description={messages.metaDescription}
        titleValues={{ team: teamName ?? metaTitleLoadingFallback }}
      />

      <ChildTeamsObjectives rootTeamId={teamId} />
    </PageContent>
  )
}

export default ExploreTeamPage