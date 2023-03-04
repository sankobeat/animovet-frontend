import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import ReservationDetails from "./[id]";

export default function PrintReservation() {
  const componentRef = useRef();

  return (
    <>
      <ReactToPrint
        trigger={() => <button>Print this reservation</button>}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
        <ReservationDetails ref={componentRef} />
      </div>
    </>
  );
}
