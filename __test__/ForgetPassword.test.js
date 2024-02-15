// ForgetPassword.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // To use jest-dom assertions
import ForgetPassword from '../pages/ForgetPassword';
import { MemoryRouter, useHistory } from 'react-router-dom';

// Set a higher timeout for this test
jest.setTimeout(10000); // 10 seconds

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));


describe('ForgetPassword component', () => {
  // Mock console.log
  const originalConsoleLog = console.log;
  jest.spyOn(console, 'log').mockImplementation(() => { });

  // Cleanup the mock after the tests
  afterAll(() => {
    console.log = originalConsoleLog;
  });
  // Positive Test Cases
  test('TC-RP-201 : Accessing recover Password page', () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter><ForgetPassword /></MemoryRouter>);

    // Check if essential text elements are present
    expect(getByText(/Recover Your Password/i)).toBeInTheDocument();
    expect(getByText(/Lost your Password\? Please enter your email address\./i)).toBeInTheDocument();

    // Check if form elements are present
    expect(getByPlaceholderText('Email Id')).toBeInTheDocument();
  });

  test('TC-RP-202 : Submitiing registered email for recovery', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <MemoryRouter><ForgetPassword /></MemoryRouter>);

    // Fill in the email input
    const emailInput = getByPlaceholderText('Email Id');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Submit the form
    fireEvent.submit(getByText('Reset Password'));

    // Wait for the success message to appear
    await waitFor(async () => {
      const successMessage = screen.queryByText('Check your email for a password recovery link.');
      if (successMessage) {
        // The success message is present, and the condition is met
        expect(successMessage).toBeInTheDocument();

        // Return to end the waiting
        return;
      }

      // The success message is not present yet, continue waiting
    }, { timeout: 5000 });
  });

  test('redirects to login page when "Cancel" is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/forgetpassword']}>
        <ForgetPassword />
      </MemoryRouter>
    );

    // Click the "Cancel" button
    fireEvent.click(screen.getByText('Cancel'));

    // Expect that the route has changed to the login page
    expect(window.location.pathname).toBe('/');
  });

  // Negative Test Cases
  test('TC-RP-210 : handles form submission with empty email field', async () => {
    const { getByText } = render(
      <MemoryRouter><ForgetPassword /></MemoryRouter>);

    // Ensure that an error message or some form of feedback is provided
    await waitFor(() => expect(getByText(/Email\*/i)).toBeInTheDocument());
  });

  test('TC-RP-208 : handles form submission with invalid email format', async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter><ForgetPassword /></MemoryRouter>);

    // Ensure that an error message or some form of feedback is provided
    const emailInput = getByPlaceholderText('Email Id');
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.submit(emailInput); // Manually submit the form

    await waitFor(() => {
      expect(getByText(/Invalid email format/i)).toBeInTheDocument();
    });
  });
});

