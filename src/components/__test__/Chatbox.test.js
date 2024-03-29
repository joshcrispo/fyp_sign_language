import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chatbox from '../Chatbox'; // Adjust the import path as necessary

describe('Chatbox Component', () => {
  it('calls the toggleChat function when the close button is clicked', () => {
    const toggleChatMock = jest.fn();
    const isChatVisible = true;

    render(<Chatbox toggleChat={toggleChatMock} isChatVisible={isChatVisible} />);
    fireEvent.click(screen.getByRole('button', { name: /Close/i }));

    expect(toggleChatMock).toHaveBeenCalled();
  });

  it('should not be visible when isChatVisible is false', () => {

    const toggleChatMock = jest.fn();
    const isChatVisible = false;

    const { container } = render(<Chatbox toggleChat={toggleChatMock} isChatVisible={isChatVisible} />);

    expect(container.firstChild).not.toHaveClass('chatBox-visible');
  });
});
