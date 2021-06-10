import { defineMessages } from 'react-intl'

type ObjectiveAccordionMenuMessage = 'firstMenuOption' | 'secondMenuOption'

export default defineMessages<ObjectiveAccordionMenuMessage>({
  firstMenuOption: {
    defaultMessage: 'Adicionar resultado-chave',
    id: '7tvIOz',
    description:
      'This is the first option that appears when you open the menu of a given objective inside the accordion button',
  },

  secondMenuOption: {
    defaultMessage: 'Editar este OKR',
    id: 'd7EKd5',
    description:
      'This is the second option that appears when you open the menu of a given objective inside the accordion button',
  },
})