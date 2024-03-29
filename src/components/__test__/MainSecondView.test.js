import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainSecondView from '../MainSecondView'; // Adjust the import path according to your file structure

describe('MainSecondView Navigation', () => {
  it('navigates to /handtracking when the SignIT! button is clicked', async () => {
    render(
      <Router>
        <MainSecondView />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /SignIT!/i }));

    await waitFor(() => {
        expect(window.location.pathname).toBe('/handtracking');
    });
  });

  it('navigates to /tutorial when the Tutorial button is clicked', async () => {
    render(
      <Router>
        <MainSecondView />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /Tutorial/i }));

    await waitFor(() => {
        expect(window.location.pathname).toBe('/tutorial');
    });
  });
});
