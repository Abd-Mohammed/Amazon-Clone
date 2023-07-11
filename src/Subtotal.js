import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import reducer, { getTotalItems } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";

export default function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getTotalItems(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button
        onClick={(e) => {
          navigate("/payment");
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
