import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResetPasswordPage from '../pages/resetpass';
import { MemoryRouter } from 'react-router-dom';

describe('Reset Password Page', () => {
  test('TC-RP-205 : renders Reset Your Password heading', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    const headingElement = screen.getByText(/Reset Your Password/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('TC-RP-206: renders user details with email dropdown', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    const userEmailElement = screen.getByText(/DrBob@genesilico.com/i);
    expect(userEmailElement).toBeInTheDocument();
  });

  test('TC-RP-206 : renders New Password and Confirm Password input fields', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    const newPasswordElement = screen.getByLabelText(/New Password \*/i);
    const confirmPasswordElement = screen.getByLabelText(/Confirm Password \*/i);

    expect(newPasswordElement).toBeInTheDocument();
    expect(confirmPasswordElement).toBeInTheDocument();
  });

  test('TC-RP-206 : renders Cancel and Save Password buttons', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    const cancelButtonElement = screen.getByText(/Cancel/i);
    const saveButtonElement = screen.getByText(/Save Password/i);

    expect(cancelButtonElement).toBeInTheDocument();
    expect(saveButtonElement).toBeInTheDocument();
  });

  test('should show an error if the new password field is empty', async () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
  
    // Find the submit button
    const submitButton = screen.getByText('Save Password');
  
    // Click the submit button
    fireEvent.click(submitButton);
  
    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText('New Password *')).toBeInTheDocument();
      expect(screen.getByText('Please enter a new password.')).toBeInTheDocument();
    }, { timeout: 4000 });
  });
  
  test('should show an error if passwords do not match', async () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
  
    // Find the new password and confirm password input fields
    const newPasswordInput = screen.getByLabelText('New Password *');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password *');
  
    // Enter passwords that do not match
    fireEvent.change(newPasswordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
  
    // Find the submit button
    const submitButton = screen.getByText('Save Password');
  
    // Click the submit button
    fireEvent.click(submitButton);
  
    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    }, { timeout: 4000 });
  });
  
  test('should navigate to success page if passwords match', async () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
  
    // Find the new password and confirm password input fields
    const newPasswordInput = screen.getByLabelText('New Password *');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password *');
  
    // Enter matching passwords
    fireEvent.change(newPasswordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
  
    // Find the submit button
    const submitButton = screen.getByText('Save Password');
  
    // Click the submit button
    fireEvent.click(submitButton);
  
    // Wait for the redirect to the success page
    await waitFor(() => {
      // Adjust with the actual text on your success page
      expect(screen.getByText('Password successfully reset.')).toBeInTheDocument();
    }, { timeout: 4000 });
  });
});

