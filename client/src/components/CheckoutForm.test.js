import React from "react";
import { render, fireEvent, getByText, getByTestId } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  const { getByText } = render(<CheckoutForm />);

  const checkoutHeader = getByText(/checkout form/i);
  expect(checkoutHeader).toBeInTheDocument()
});

test("form shows success message on submit with form details", () => {
  const { getByLabelText, getByTestId, getByDisplayValue } = render(<CheckoutForm />);

  const firstNameInput = getByLabelText(/first name/i);
  const lastNameInput = getByLabelText(/last name/i);
  const addressInput = getByLabelText(/address/i);
  const cityInput = getByLabelText(/city/i);
  const stateInput = getByLabelText(/state/i);
  const zipInput = getByLabelText(/zip/i);

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(addressInput).toBeInTheDocument();
  expect(cityInput).toBeInTheDocument();
  expect(stateInput).toBeInTheDocument();
  expect(zipInput).toBeInTheDocument();

  fireEvent.change(firstNameInput, { target: { value: "Nick" }})
  fireEvent.change(lastNameInput, { target: { value: "Myers" }})
  fireEvent.change(addressInput, { target: { value: "7325 SE Tolman St" }})
  fireEvent.change(cityInput, { target: { value: "Portland" }})
  fireEvent.change(stateInput, { target: { value: "Oregon" }})
  fireEvent.change(zipInput, { target: { value: 97206 }})

  expect(getByDisplayValue(/nick/i)).toBeInTheDocument()
  expect(getByDisplayValue(/myers/i)).toBeInTheDocument()
  expect(getByDisplayValue(/7325 se tolman st/i)).toBeInTheDocument()
  expect(getByDisplayValue(/portland/i)).toBeInTheDocument()
  expect(getByDisplayValue(/oregon/i)).toBeInTheDocument()
  expect(getByDisplayValue(/97206/i)).toBeInTheDocument()

  const checkoutSubmit = getByTestId(/submitCheckout/i);
  expect(checkoutSubmit).toBeInTheDocument();
  fireEvent.click(checkoutSubmit)

  const successMessage = getByTestId(/successMessage/i)
  expect(successMessage).toBeInTheDocument()
});
