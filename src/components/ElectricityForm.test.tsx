import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import ElectricityForm from './ElectricityForm';

beforeEach(() => {
  enableFetchMocks();
})

it('should display input field for location and date', async () => {
  render(<ElectricityForm />);

  const countryInput = await screen.getByLabelText('Country');
  const dateInput = await screen.getByLabelText('Start date');

  expect(countryInput).toBeInTheDocument();
  expect(dateInput).toBeInTheDocument();
});

it('should not display usage value fields when date and country are undefined', async () => {
  render(<ElectricityForm />);

  const usageInfoText = screen.queryByText('Enter the electricity usage (mwh) for each day');

  expect(usageInfoText).toBeNull();
});

