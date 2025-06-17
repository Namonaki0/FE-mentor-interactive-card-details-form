import { render, screen, fireEvent } from '@testing-library/vue'
import CompletionState from '@/components/CompletionState.vue'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

describe('CompletionState.vue', () => {
  it('renders completion icon, messages, and button', () => {
    render(CompletionState)

    expect(screen.getByAltText(/card details save completed icon/i)).toBeInTheDocument()
    expect(screen.getByText(/thank you!/i)).toBeInTheDocument()
    expect(screen.getByText(/we've added your card details/i)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /continue/i })[0]).toBeInTheDocument()
  })

  it('emits reset event on button click', async () => {
    const { emitted } = render(CompletionState)
    const button = screen.getAllByRole('button', { name: /continue/i })[0]
    await fireEvent.click(button)

    expect(emitted().reset).toBeTruthy()
    expect(emitted().reset.length).toBe(1)
  })
})
