import { render } from '@testing-library/vue'
import StyleBlock from '@/components/StyleBlock.vue'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, expect } from 'vitest'

describe('StyleBlock.vue', () => {
  it('renders CardTop and CardLower components', () => {
    const { getByTestId } = render(StyleBlock, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })

    expect(getByTestId('card-top')).toBeInTheDocument()
    expect(getByTestId('card-lower')).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = render(StyleBlock, {
      global: {
        plugins: [createTestingPinia()],
      },
    })

    expect(container).toMatchSnapshot()
  })
})
