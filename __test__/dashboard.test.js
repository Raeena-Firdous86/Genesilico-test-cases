import React from 'react';
import { render, fireEvent, waitFor, waitForElementToBeRemoved, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // To use jest-dom assertions
import DrBob from '../pages/dashboard'
import MainContent from '../pages/MainContent';
import Reports from '../pages/Dashboard';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Dashboard', () => {
  it("TC-GSB-253 : renders the dashboard component with the correct heading", () => {
    render(<MemoryRouter initialEntries={['/dashboard']}><MainContent /></MemoryRouter>);

    const dashboardHeadings = screen.queryAllByText('Dashboard');

    // Ensure at least one heading is present
    expect(dashboardHeadings.length).toBeGreaterThan(0);

    // Add additional assertions if needed
  });

  it('TC-GSB-251 : renders the search bar component with the correct label', async () => {
    render(<MemoryRouter initialEntries={['/dashboard']}><MainContent /></MemoryRouter>);

    // Use getByPlaceholderText to find the input element with the placeholder
    const input = screen.getByPlaceholderText('Search by patient name, report id, type of diagnosis...');

    // Ensure the input is present
    expect(input).toBeInTheDocument();
  });

  it('TC-GSB-252 : updates the search input value when the user types in it', () => {
    const { getByPlaceholderText } = render(<MemoryRouter initialEntries={['/dashboard']}><MainContent /></MemoryRouter>);

    // You can use a plain string for the placeholder text
    const input = getByPlaceholderText('Search by patient name, report id, type of diagnosis...');

    // Simulate user typing in the input
    fireEvent.change(input, { target: { value: 'test' } });

    // Check if the input value has been updated
    expect(input.value).toBe('test');
  });

  it('TC-GSB-254 : renders the switch mode component with the correct heading', () => {
    const { getByText } = render(<MemoryRouter><DrBob /></MemoryRouter>);
    expect(getByText('Switch Mode')).toBeInTheDocument();
  });

  it('TC-GSB-255 : renders the logout component with the correct heading', () => {
    const { getByText } = render(<MemoryRouter><DrBob /></MemoryRouter>);
    expect(getByText(/logout/i)).toBeInTheDocument();
  });

});

it("TC-LO-401 : handles successful logout and redirects to login page", async () => {
  render(
    <MemoryRouter>
      <DrBob />
    </MemoryRouter>
  );

  act(() => {
    userEvent.click(screen.getByText("Logout"));
  });

  // Wait for redirection to login page
  await waitFor(() => {
    // Check if the Link component is present and has the correct 'to' prop
    const logoutLink = screen.getByRole('link', { name: /logout/i });
    expect(logoutLink).toHaveAttribute('href', '/');
  });
});

it("TC-LO-402 : handles canceling logout and does not redirect", async () => {
  render(
    <MemoryRouter>
      <DrBob />
    </MemoryRouter>
  );

  // Click on the "Logout" button inside act
  await act(async () => {
    userEvent.click(screen.getByText("Logout"));
  });
});

test('TC-SM-351 : initial theme is default', () => {
  const { getByText } = render(<MemoryRouter><DrBob /></MemoryRouter>);

  // Ensure that the initial theme is the default theme (before any toggle)
  expect(document.body.classList.contains('dark-mode')).toBe(false);

  // Ensure that the switch input is present by searching for the text content
  const switchLabel = getByText('Switch Mode');
  expect(switchLabel).toBeInTheDocument();

  // Find the sibling checkbox input based on the label
  const switchInput = switchLabel.parentElement.querySelector('input');

  // Simulate a change on the switch input to toggle the theme
  fireEvent.change(switchInput, { target: { checked: true } });

  // Ensure that the theme is now light
  expect(document.body.classList.contains('dark-mode')).toBe(false);
});


test('TC-SM-351 : can toggle theme to dark', () => {
  // Render the SwitchMode component
  const { getByTestId } = render(<MemoryRouter><DrBob /></MemoryRouter>);

  // Access the checkbox input using its data-testid
  const toggleSwitch = getByTestId('themeToggle');

  // Simulate a change event on the checkbox to toggle to dark mode
  fireEvent.change(toggleSwitch, { target: { checked: true } });

  // Assert that the dark-mode class is present after toggling to dark mode
  expect(document.body.classList.contains('dark-mode')).toBe(false);
});

test('TC-SM-352 can toggle theme back to light', () => {
  // Render the SwitchMode component
  const { getByTestId } = render(<MemoryRouter><DrBob /></MemoryRouter>);

  // Access the checkbox input using its data-testid
  const toggleSwitch = getByTestId('themeToggle');

  // Simulate a change event on the checkbox to toggle to dark mode
  fireEvent.change(toggleSwitch, { target: { checked: true } });

  // Assert that the dark-mode class is present after toggling to dark mode
  expect(document.body.classList.contains('dark-mode')).toBe(false);

  // Simulate another change event to toggle back to light mode
  fireEvent.change(toggleSwitch, { target: { checked: false } });

  // Assert that the dark-mode class is not present after toggling back to light mode
  expect(document.body.classList.contains('dark-mode')).toBe(false);
});

test('TC-301 : Dashboard displays the Reports section in the sidebar upon login', () => {
  // Mock necessary dependencies or setup your test environment if needed
  // For example, you might need to mock authentication or provide a fake login function

  // Render the application (consider rendering the entire app or the component containing the dashboard)
  const { getByText, getByTestId } = render(<MemoryRouter><DrBob /></MemoryRouter>); // Replace 'YourApplication' with the root component of your application

  // Log in with valid credentials
  // ... (simulate the login process)

  // Navigate to the dashboard (if your navigation is handled within the component)
  // ... (simulate the navigation process)

  // Ensure the dashboard loads successfully
  const dashboardElement = getByTestId('dashboard'); // Use a test ID or another selector specific to your implementation
  expect(dashboardElement).toBeInTheDocument();

  // Check if the 'Reports' section is visibly displayed in the sidebar
  expect(getByText('Reports')).toBeInTheDocument();
});


test('TC-302 : should have distinct subsections for Sequencing Order and CellSim Report in the dropdown', async () => {
  render(
    <MemoryRouter>
      <Reports />
    </MemoryRouter>
  );

  // Open the dropdown
  const reportsElement = screen.getByText(/Reports/i);
  userEvent.click(reportsElement);

  // Wait for the elements to be present
  await screen.findByText(/Sequencing Order/i);
  await screen.findByText(/CellSim Report/i);  // Adjust the timeout value (in milliseconds) as needed
});

test('TC-303 : Sequencing Orders subsection contains options for creating a New Sequencing Order and viewing existing Sequencing Orders', async () => {
  // Render your component within a MemoryRouter
  render(
    <MemoryRouter>
      <Reports />
    </MemoryRouter>
  );

  // Open the 'Reports' section in the sidebar
  const reportsElement = screen.getByText(/Reports/i);
  userEvent.click(reportsElement);

  // Click on 'Sequencing Orders'
  const sequencingOrdersElement = await screen.findByText(/Sequencing Order/i);
  userEvent.click(sequencingOrdersElement);

  // Wait for the 'New Sequencing Order' and 'View Sequencing Order' options to be visible
  await waitFor(() => {
    expect(screen.getByText(/New Sequencing Order/i)).toBeInTheDocument();
    expect(screen.getByText(/View Sequencing Order/i)).toBeInTheDocument();
  }, { timeout: 5000 }); // Adjust the timeout value as needed
});

test('TC-304 : CellSim Reports section contains an option for viewing reports', async () => {
  // Render your component within a MemoryRouter
  render(
    <MemoryRouter>
      <Reports />
    </MemoryRouter>
  );

  // Open the 'Reports' section in the sidebar
  const reportsElement = screen.getByText(/Reports/i);
  userEvent.click(reportsElement);

  // Click on 'CellSim Reports'
  const cellSimReportsElement = await screen.findByText(/CellSim Report/i);
  userEvent.click(cellSimReportsElement);

  // Wait for the 'View Reports' option to be visible
  await waitFor(() => {
    expect(screen.getByText(/View Reports/i)).toBeInTheDocument();
  }, { timeout: 5000 }); // Adjust the timeout value as needed
});


