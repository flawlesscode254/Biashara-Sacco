import React, { useState, useRef, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import db, {auth} from "./firebase"
import Nav from "./Nav"

function Product() {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const location = useLocation()

  const { name, price, email } = location?.state

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("repayments")
          .where("email", "==", email)
          .onSnapshot((snapshot) =>
            snapshot.docs.forEach(
              (doc) => (
                // eslint-disable-next-line
                setData(doc.data().amount), setInterest(doc.data().interest)
                // setCurrent(doc.data().state)
              )
            )
          );
      }
    });
    // eslint-disable-next-line
  }, []);

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
        {`Proceed to complete the payment of ${price}`}
      </h3>
      <div ref={paypalRef} />
    </div>
  );
}

export default Product