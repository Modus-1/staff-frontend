import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import KitchenPage from "../pages/KitchenPage";

test("Renders the columns New, In progress and Done", () => {
  const statuses = ["New", "In progress", "Ready", "Delivered"];
  let columns = [];
  statuses.forEach((status, index) =>
    columns.push({
      statusIndex: index,
      status: status,
      orders: [],
    })
  );
  render(
    <KitchenPage
      columns={columns.slice(0, 3)}
      statuses={statuses.slice(0, 3)}
    />
  );
  const linkElementNew = screen.getByText(/New/i);
  const linkElementInProgress = screen.getByText(/In progress/i);
  const linkElementDone = screen.getByText(/Ready/i);
  expect(linkElementNew).toBeInTheDocument();
  expect(linkElementInProgress).toBeInTheDocument();
  expect(linkElementDone).toBeInTheDocument();
});
