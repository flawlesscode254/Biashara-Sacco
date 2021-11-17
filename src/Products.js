import './App.css';
import React from 'react';

function Products() {

    return (
        <div>
            <div style={{
                borderWidth: 0.5,
                borderColor: "black",
                justifyContent: "center",
                alignItems: "center",
                width: 200
            }}>
                <img
                    src="https://www.maclinestore.com/wp-content/uploads/2021/07/macbook-air-gold-select-201810.jpeg"
                    alt=""
                    style={{
                        width: 200,
                        height: 200,
                        aspectRatio: 4 / 3
                    }}
                />
                <p>Macbook Pro</p>
                <h3 style={{
                    color: "black",
                    fontWeight: "bolder",
                    letterSpacing: 2
                }}>$1800.00</h3>
                <button style={{
                    backgroundColor: "#32a852",
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 5,
                    border: "none",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    letterSpacing: 1,
                    cursor: "pointer",
                    fontWeight: "bolder"
                }}>Buy Now</button>
            </div>
        </div>
    )
}

export default Products