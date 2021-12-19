import React, { useState, useRef, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import { fCurrency } from '../utils/formatNumber';
import db, {auth} from "../firebase"

function Product() {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const location = useLocation()

  const { name, price } = location.state

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: price
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          await setPaidFor(true);
          await db.collection("users").update({
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            course: name
          })
        },
        onError: err => {
          setError(err);
        },
      })
      .render(paypalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  if (paidFor) {
    return (
      <div>
        <p>Congrats, you have successfully purchased {name} course! Go back to courses</p>
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <h3>
        {`You are about to purchase ${name} course for ${fCurrency(price)}`}
      </h3>
      <div ref={paypalRef} />
    </div>
  );
}

export default Product