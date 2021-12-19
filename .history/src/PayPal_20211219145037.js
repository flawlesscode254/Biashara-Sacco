import React, { useState, useRef, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import db from "./firebase"
import Nav from "./Nav"
import firebase from "firebase"

function Product() {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const location = useLocation()

  const {
          name,
          balance,
          paid,
          interest,
          state,
          email,
          username,
          phone,
          IDNum,
          hasPaid
  } = location?.state

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: (paid / 110).toFixed(2)
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          await setPaidFor(true);
          await db.collection("repayments").add({
            name,
            balance,
            paid,
            interest,
            state,
            email,
            username,
            phone,
            IDNum,
            hasPaid,
            time: firebase.firestore.FieldValue.serverTimestamp()
          })
        },
        onError: err => {
          setError(err);
        },
      })
      .render(paypalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paid]);

  if (paidFor) {
    return (
      <div>
        <Nav />
        <h1 style={{
            color: "white"
        }}>Your payment was successful!!</h1>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <h3 style={{
        color: "white"
      }}>
        {`Proceed to complete the payment of Sh. ${paid}`}
      </h3>
      <div ref={paypalRef} />
    </div>
  );
}

export default Product