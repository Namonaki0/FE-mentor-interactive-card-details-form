import { render, fireEvent, screen } from '@testing-library/vue'
import FormDetails from '@/components/FormDetails.vue'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

describe('FormDetails.vue', () => {
  function renderComponent() {
    return render(FormDetails, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
  }

  it('shows error messages on empty submission', async () => {
    renderComponent()

    await fireEvent.click(screen.getByRole('button', { name: /confirm/i }))

    const allBlanks = screen.getAllByText("can't be blank")
    expect(allBlanks.length).toBeGreaterThanOrEqual(4)
  })

  it('validates name input rejects numbers', async () => {
    renderComponent()

    const nameInput = screen.getByLabelText(/cardholder name/i)
    await fireEvent.update(nameInput, '1234')

    expect(await screen.findByText(/wrong format/i)).toBeInTheDocument()
  })

  it('validates card number accepts only digits', async () => {
    renderComponent()

    const numberInput = screen.getByLabelText(/card number/i)
    await fireEvent.update(numberInput, 'abcd')

    expect(await screen.findByText(/only numbers allowed/i)).toBeInTheDocument()
  })

  it('emits "submitted" event on valid input', async () => {
    const emit = vi.fn()
    render(FormDetails, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              cardDetails: {
                cardName: 'Jane',
                cardNumber: '1234 5678 9012 3456',
                expiryDateMonth: '12',
                expiryDateYear: '30',
                cvc: '123',
              },
            },
          }),
        ],
      },
      attrs: {
        onSubmitted: emit,
      },
    })

    await fireEvent.click(screen.getByRole('button', { name: /confirm/i }))

    expect(emit).toHaveBeenCalledWith()
  })
})
