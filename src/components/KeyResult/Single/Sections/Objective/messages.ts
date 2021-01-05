import { MessageDescriptor, defineMessages } from 'react-intl'

type KeyResultsSingleObjectiveMessages = 'label' | 'stackIconDesc'

export default defineMessages({
  label: {
    defaultMessage: 'Objetivo',
    id: 'T8ytLJ',
    description:
      'The label text above the Objective section in our key result single page or drawer',
  },

  stackIconDesc: {
    defaultMessage: 'Um ícone de com diversas superfícies, uma em cima da outra',
    id: 'UBruoq',
    description: 'The alternative text explaining our stack icon',
  },
}) as Record<KeyResultsSingleObjectiveMessages, MessageDescriptor>