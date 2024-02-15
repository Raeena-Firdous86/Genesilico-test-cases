import React from 'react';
import { render, fireEvent, getByTitle } from '@testing-library/react';
import ContactHospitalForm from '../pages/sequncingorder';
import Container from '../pages/sequncingorder';
import { MemoryRouter } from 'react-router-dom';

test('Form submission', () => {
  const { getByLabelText } = render(<MemoryRouter><ContactHospitalForm /></MemoryRouter>);

  // Simulate user input
  fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
  fireEvent.change(getByLabelText('Contact Email'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(getByLabelText('Contact Phone Number'), { target: { value: '1234567890' } });

  // Select an option from the dropdown
  fireEvent.change(getByLabelText('Oncologist Selection'), { target: { value: 'option1' } });

  fireEvent.change(getByLabelText('Oncologist Contact Email'), { target: { value: 'oncologist@example.com' } });
  fireEvent.change(getByLabelText('Oncologist Contact Phone Number'), { target: { value: '9876543210' } });

  // Add your assertions here based on the expected behavior after form submission
});

test('Hospital form submission', () => {
    const { getByLabelText} = render(<MemoryRouter><Container /></MemoryRouter>);
  
  
    // Simulate user input in the hospital form
    fireEvent.change(getByLabelText('Name of hospital'), { target: { value: 'Example Hospital' } });
    fireEvent.change(getByLabelText('Hospital address line 1'), { target: { value: '123 Street' } });
    fireEvent.change(getByLabelText('Hospital address line 2'), { target: { value: 'Apt 456' } });
    fireEvent.change(getByLabelText('Hospital address line 3'), { target: { value: 'City, Country' } });
  
    // Add your assertions here based on the expected behavior after form submission
  });
  
  test('Sequencing Experiment form submission', () => {
    const { getByLabelText } = render(<MemoryRouter><Container /></MemoryRouter>);
    // Simulate user input in the sequencing experiment form
    fireEvent.change(getByLabelText('Sequencing Platform'), { target: { value: 'Example Platform' } });
    fireEvent.change(getByLabelText('Module'), { target: { value: 'Example Module' } });
    fireEvent.change(getByLabelText('Read Length'), { target: { value: '100' } });
    fireEvent.change(getByLabelText('Organism'), { target: { value: 'Example Organism' } });
  
    // Add your assertions here based on the expected behavior after form submission
  });

  test('Application Selection form submission', () => {
    const { getByLabelText} = render(<MemoryRouter><Container /></MemoryRouter>);
  
    // Simulate user input in the Application Selection form
    fireEvent.change(getByLabelText('RNA Sequencing'), { target: { value: 'Example RNA Sequencing' } });
    fireEvent.change(getByLabelText('DNA Full Exome'), { target: { value: 'Example DNA Full Exome' } });
  
  
    // Add your assertions here based on the expected behavior after form submission
  });
  
  test('Analysis Approach form submission', () => {
    const { getByLabelText} = render(<MemoryRouter><Container /></MemoryRouter>);
  
    // Simulate user input in the Analysis Approach form
    fireEvent.change(getByLabelText('De- novo'), { target: { value: 'Example Denovo' } });
    fireEvent.change(getByLabelText('Re seq'), { target: { value: 'Example Re seq' } });
    fireEvent.change(getByLabelText('Hybrid'), { target: { value: 'Example Hybrid' } });
  
  
    // Add your assertions here based on the expected behavior after form submission
  });
  
  test('Analysis form submission', () => {
    const { getByLabelText} = render(<MemoryRouter><Container /></MemoryRouter>);
    // Simulate user input in the Analysis form
    fireEvent.change(getByLabelText('Standard'), { target: { value: 'Example Standard' } });
    fireEvent.change(getByLabelText('Advanced'), { target: { value: 'Example Advanced' } });
    fireEvent.change(getByLabelText('Collaborative'), { target: { value: 'Example Collaborative' } });
    fireEvent.change(getByLabelText('Comments'), { target: { value: 'Example Comments' } });
  
  
    // Add your assertions here based on the expected behavior after form submission
  });
