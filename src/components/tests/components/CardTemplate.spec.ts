import { render, screen } from '@testing-library/vue'
import CardTemplate from '@/components/card/CardTemplate.vue'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, expect } from 'vitest'

const renderCardTemplate = (facet = 'front', cardState = {}) => {
  return render(CardTemplate, {
    props: { cardfacet: facet },
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            cardDetails: {
              cardName: 'Andre F.',
              cardNumber: '1234 5678 1234 5678',
              expiryDateMonth: '08',
              expiryDateYear: '29',
              cvc: '999',
              ...cardState,
            },
          },
          stubActions: false,
        }),
      ],
    },
  })
}

describe('CardTemplate.vue', () => {
  it('renders front facet with correct card info', async () => {
    renderCardTemplate('front')

    expect(screen.getByText(/andre f\./i)).toBeInTheDocument()
    expect(screen.getByText(/1234 5678 1234 5678/)).toBeInTheDocument()
    expect(screen.getByText(/08\/29/)).toBeInTheDocument()
  })

  it('renders back facet with cvc', async () => {
    renderCardTemplate('back')

    expect(screen.getByText(/999/)).toBeInTheDocument()
    expect(screen.queryByText(/andre f\./i)).not.toBeInTheDocument()
    expect(screen.queryByText(/08\/29/)).not.toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = renderCardTemplate('front')
    expect(container).toMatchSnapshot()
  })

  it('renders fallback values when store is empty', () => {
    renderCardTemplate('front', {
      cardName: '',
      cardNumber: '',
      expiryDateMonth: '',
      expiryDateYear: '',
      cvc: '',
    })

    expect(screen.getByText('Jane Appleseed')).toBeInTheDocument()
    expect(screen.getByText('0000 0000 0000 0000')).toBeInTheDocument()
    expect(screen.getByText('00/00')).toBeInTheDocument()
  })
})
