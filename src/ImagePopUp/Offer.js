import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./Offer.css";

function Offer(props) {
  return props.trigger ? (
    <div className="popupContainer">
      <div className="popupInner">
        <CloseIcon
          className="popupClose"
          onClick={() => props.setShowOffer(false)}
        ></CloseIcon>

        <div className="box"><p className="code">{props.response.OfferCode}</p></div>
        <div className="discount">GET&nbsp; <div>{props.response.Discount}</div> % OFF</div>
        <div className="service"><p>On all salon & spa</p> <p>services</p></div>
        <div className="expiry">Valid Till {props.response.expirydate}</div>
        <div className="adress"> <p>Anjana Beauty Salon</p><p>23, Sector 3, Rajiv Nagar, Raigad</p></div>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Offer;
