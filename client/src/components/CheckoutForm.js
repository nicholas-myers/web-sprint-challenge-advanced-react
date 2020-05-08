import React, { useState } from "react";
import { useForm } from "../hooks/useForm";

const initialValue = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

// This form should be handled by a "useForm" custom hook
// Build out the logic needed for a form custom hook (see the useForm.js file)
// and replace the necessary stateful logic from CheckoutForm with the hook

const CheckoutForm = (props) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [checkoutValues, handleChanges] = useForm(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMessage(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Checkout Form</h2>
        <label>
          First Name:
          <input
            name="firstName"
            value={checkoutValues.firstName}
            onChange={handleChanges}
          />
        </label>
        <label>
          Last Name:
          <input
            name="lastName"
            value={checkoutValues.lastName}
            onChange={handleChanges}
          />
        </label>
        <label>
          Address:
          <input
            name="address"
            value={checkoutValues.address}
            onChange={handleChanges}
          />
        </label>
        <label>
          City:
          <input name="city" value={checkoutValues.city} onChange={handleChanges} />
        </label>
        <label>
          State:
          <input name="state" value={checkoutValues.state} onChange={handleChanges} />
        </label>
        <label>
          Zip:
          <input name="zip" value={checkoutValues.zip} onChange={handleChanges} />
        </label>
        <button data-testid="submitCheckout">Checkout</button>
      </form>

      {showSuccessMessage && (
        <div className="success-message" data-testid="successMessage">
          <p>
            You have ordered some plants! Woo-hoo! <span role="img">🎉</span>
          </p>
          <p>Your new green friends will be shipped to:</p>
          <br />
          <br />
          <p>
            {checkoutValues.firstName} {checkoutValues.lastName}
          </p>
          <p>{checkoutValues.address}</p>
          <p>
            {checkoutValues.city}, {checkoutValues.state} {checkoutValues.zip}
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
