import { render, screen, fireEvent, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import ElectricityForm from './ElectricityForm';

beforeEach(() => {
  enableFetchMocks();
})

it('should display input field for location and date', () => {
    render(<ElectricityForm setResults={jest.fn()} />);

  const countryInput = screen.getByLabelText('Country');
  const dateInput = screen.getByLabelText('Start date');

  expect(countryInput).toBeInTheDocument();
  expect(dateInput).toBeInTheDocument();
});

it('should not display usage value fields when date and country are undefined', () => {
  render(<ElectricityForm setResults={jest.fn()} />);

  const usageInfoText = screen.queryByText('Enter the electricity usage (mwh) for each day');

  expect(usageInfoText).toBeNull();
});

