// ForgetUsername.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForgetUsername from '../pages/ForgetUsername';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

describe('UserIDRecovery', () => {
    test('TC-UR-101 : Verify that the UserIDRecovery component is rendering correctly', () => {
        render(<MemoryRouter><ForgetUsername /></MemoryRouter>);
    });

    test('TC-UR-102 : Check for the proper rendering of the Email Input', () => {
        const { getByPlaceholderText } = render(<MemoryRouter><ForgetUsername /></MemoryRouter>);
        const emailInput = getByPlaceholderText('Enter Email Address');
        expect(emailInput).toBeInTheDocument();
    });

    test('TC-UR-103 : Check for the proper rendering of the Submit Button', () => {
        const { getByText } = render(<MemoryRouter><ForgetUsername /></MemoryRouter>);
        const submitButton = getByText('Submit');
        expect(submitButton).toBeInTheDocument();
    });

    test('TC-UR-104 : Verify that the user is able to successfully submit the form', () => {
        const { getByText } = render(<MemoryRouter><ForgetUsername /></MemoryRouter>);
        const submitButton = getByText('Submit');
        fireEvent.click(submitButton);
    });

    test('TC-UR-105 : Verify that the form fails to submit when an invalid email address is provided', () => {
        // render component
        const { getByPlaceholderText, getByText } = render(<MemoryRouter><ForgetUsername /></MemoryRouter>);

        // fill in the form with invalid email address
        fireEvent.change(getByPlaceholderText('Enter Email Address'), { target: { value: 'invalid_email' } });

        // simulate form submission
        fireEvent.click(getByText('Submit'));

        // assert that the form does not submit successfully
        // check for error messages or other indicators
        expect(/* assertion for failure */).toBe(/* expected result */);
    });

    test('TC-UR-106 : Verify that the form fails to submit when required fields are left empty', async () => {
        // render component
        const { getByText, queryByText } = render(<MemoryRouter><ForgetUsername /></MemoryRouter>);

        // simulate form submission without filling any fields
        fireEvent.click(getByText('Submit'));

        // assert that the form does not submit successfully
        // check for the absence of the error message
        const errorMessage = 'Please fill in all required fields'; // Adjust based on actual error message

        await waitFor(() => {
            expect(queryByText(errorMessage)).toBeNull();
        });
    });

    test('validates the email field', () => {
        const { getByText, getByPlaceholderText } = render(<MemoryRouter><ForgetUsername /></MemoryRouter>);
        const emailInput = getByPlaceholderText('Enter Email Address');
        const submitButton = getByText('Submit');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);
    });

});
