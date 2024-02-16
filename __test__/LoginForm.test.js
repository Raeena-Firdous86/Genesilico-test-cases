import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginForm from 'C:/Users/Administrator/Desktop/multiple pages connection/my-app/src/pages/LoginForm.js';

test('TC-LF-001 : Verify the rendering of the Login Form with empty fields', () => {
    render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      );
 const usernameField = screen.getByPlaceholderText(/User ID/i);
 const passwordField = screen.getByPlaceholderText(/Password/i);
 expect(usernameField.value).toBe('');
 expect(passwordField.value).toBe('');
});

test('TC-LF-002 : Verify that the system displays an error message on an failed login attempt', async () => {
    render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      );
 const submitButton = screen.getByRole('button', { name: /login/i });
 fireEvent.click(submitButton);
 const errorMessage = await screen.findByText(/please enter a username and password/i);
 expect(errorMessage).toBeInTheDocument();
});

test('TC-LF-003 : Verify that the system displays an error message on a invalid login attempt', async () => {
    render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      );
 const usernameField = screen.getByPlaceholderText(/User ID/i);
 const passwordField = screen.getByPlaceholderText(/Password/i);
 const submitButton = screen.getByRole('button', { name: /login/i });

 fireEvent.change(usernameField, { target: { value: 'invaliduser' } });
 fireEvent.change(passwordField, { target: { value: 'wrongpassword' } });
 fireEvent.click(submitButton);

 const errorMessage = await screen.findByText(/invalid username or password/i);
 expect(errorMessage).toBeInTheDocument();
});

test('TC-LF-004 : Verify successful login with correct credentials', async () => {
    render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      );
 const usernameField = screen.getByPlaceholderText(/User ID/i);
 const passwordField = screen.getByPlaceholderText(/Password/i);
 const submitButton = screen.getByRole('button', { name: /login/i });

 fireEvent.change(usernameField, { target: { value: 'UserD' } });
 fireEvent.change(passwordField, { target: { value: 'Password' } });
 fireEvent.click(submitButton);

 const errorMessage = screen.queryByText(/invalid username or password/i);
 expect(errorMessage).not.toBeInTheDocument();
});

test('TC-LF-005 : Verify that clicking the "Forgot UserID?" link navigates to the correct route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/forgetusername" element={<div data-testid="forget-username-page">ForgetUsername</div>} />
      </Routes>
    </MemoryRouter>
  );

  // Click on the parent element containing the link
  fireEvent.click(screen.getByText('Forgot UserID?'));

  // Verify that it navigates to the correct route
  expect(screen.getByTestId('forget-username-page')).toBeInTheDocument();
});

test('TC-LF-006 : Verify that clicking the "Forgot Password?" link navigates to the correct route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/forgetpassword" element={<div data-testid="forget-password-page">ForgetPassword</div>} />
      </Routes>
    </MemoryRouter>
  );

  // Click on the parent element containing the link
  fireEvent.click(screen.getByText('Forgot Password?'));

  // Verify that it navigates to the correct route
  expect(screen.getByTestId('forget-password-page')).toBeInTheDocument();
});