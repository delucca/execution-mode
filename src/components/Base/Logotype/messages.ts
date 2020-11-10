import { MessageDescriptor, defineMessages } from 'react-intl'

type LogotypeMessages = 'alt' | 'title'

export default defineMessages({
  alt: {
    defaultMessage:
      'O logotipo do Bud. Sendo ele apenas o nome Bud escrito em caixa baixa na cor roxa',
    id: 'tcWO3v',
    description: 'The alternative text explaining our logotype',
  },

  title: {
    defaultMessage: 'Bud - Gestão de OKR e Estratégia',
    id: 'rpLZ2J',
    description:
      'The title text of our logotype, it is displayed when an user hover the icon itself',
  },
}) as Record<LogotypeMessages, MessageDescriptor>
