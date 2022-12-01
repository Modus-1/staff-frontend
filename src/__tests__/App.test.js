import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Renders the columns New, In progress and Done', () => {
  render(<App />);
  const linkElementNew = screen.getByText(/New/i);
  const linkElementInProgress = screen.getByText(/In progress/i);
  const linkElementDone = screen.getByText(/Done/i);
  expect(linkElementNew).toBeInTheDocument();
  expect(linkElementInProgress).toBeInTheDocument();
  expect(linkElementDone).toBeInTheDocument();
});
