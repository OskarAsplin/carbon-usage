import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import App from './App';

beforeEach(() => {
  enableFetchMocks();
})

it('renders appbar with title and shows no error snackbar', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ message: 'auth successful' }));

  render(<App />);

  const appBarTitle = await screen.findByText(/Carbon Footprint/i);
  const errorSnackbar = screen.queryByText(/Could not connect to carbon interface!/i);

  expect(appBarTitle).toBeInTheDocument();
  expect(errorSnackbar).toBeNull();
});

it('shows error snackbar when carbon interface api is not working', async () => {
  fetchMock.mockReject();

  render(<App />);

  const errorSnackbar = await screen.findByText(/Could not connect to carbon interface!/i);

  expect(errorSnackbar).toBeInTheDocument();
});
