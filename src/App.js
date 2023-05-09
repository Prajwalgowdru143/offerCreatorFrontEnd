import React, { useEffect, useState } from "react";
import "./App.css";
// import Video from "./Video/Video";
import axios from "./axios";
import Offer from "./ImagePopUp/Offer";

function App() {
  const [videos, setVideos] = useState([]);
  const [showOffer, setShowOffer] = useState(false);
  const [discountType, setDiscountType] = useState("");
  const [customerLimit, setCustomerLimit] = useState("unlimited");
  const [usePerCustomer, setUsePerCustomer] = useState("unlimited");
  const [responseData, setResponseData] = useState(null);

  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUsePerCustomerChange = (event) => {
    setUsePerCustomer(event.target.value);
  };

  const handleRadioChange = (event) => {
    setCustomerLimit(event.target.value);
  };

  const handleDiscountTypeChange = (event) => {
    setDiscountType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send the form data to the backend API
    axios.post('/v2/posts', formData)
    .then((response) => {
      console.log(response);
      setResponseData(response)
      setShowOffer(true);
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  useEffect(() => {
    async function fetchPosts() {
       await axios.get('/v2/posts').then((response)=>{
        setVideos(response.data);
        return response;
       }).catch((error) => {
        console.log(error);
      });
    }
    fetchPosts();
  }, []);
  console.log(videos);

  const radiocolor={
    backgroundColor: 'lightgray'
  }

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <div className="Input">
            <label htmlFor="min-order-value">Offer Code*</label>
            <input
              id="Offer Code*"
              name="OfferCode"
              value={formData.OfferCode}
              type="text"
              maxLength="8"
              onChange={handleChange}
            />
          </div>
          <div className="Input">
            <label htmlFor="min-order-value">Offer Title*</label>
            <input
              id="Offer Title*"
              name="OfferTitle"
              value={formData.OfferTitle}
              type="text"
              maxLength="60"
              onChange={handleChange}
            />
          </div>
          <div className="Input">
            <label htmlFor="min-order-value">Offer Description</label>
            <input
              id="OfferDescription"
              name="OfferDescription"
              value={formData.OfferDescription}
              type="text"
              maxLength="160"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div className="Input">
            <label htmlFor="discount-type-select">offer type*</label>
            <select
              id="discount-type-select"
              name="discounttypeselect"
              value={formData.discounttypeselect}
              onChange={handleDiscountTypeChange}
            >
              <option value="">--Please choose an option--</option>
              <option value="percentage">Percentage discount</option>
              <option value="flat">Flat discount</option>
              <option value="gift">Free Gift</option>
            </select>
          </div>

          {discountType === "percentage" && (
            <div className="Input">
              <label htmlFor="min-order-value">Discount %*</label>
              <input
                id="Discount %*"
                name="Discount"
                value={formData.Discount}
                type="text"
                onChange={handleChange}
              />
            </div>
          )}

          <div className="Input">
            <label htmlFor="applicable-on"> Applicable on*</label>
            <select
              id="applicable-on"
              name="applicableon"
              value={formData.applicableon}
              onChange={handleChange}
            >
              <option value="all">All orders</option>
              <option value="above-amount">Orders above certain amount</option>
              <option value="select-services">Select services</option>
            </select>
          </div>

          <div className="Input" >
            <label htmlFor="min-order-value">Minimum order value*</label>
            <input
              id="min-order-value"
              name="minordervalue"
              value={formData.minordervalue}
              type="number"
              min="0"
              onChange={handleChange}
            />
          </div>

          {discountType === "percentage" && (
            <div className="Input">
              <label htmlFor="Maximumdiscount">Maximum discount*</label>
              <input
                id="Maximumdiscount"
                name="Maximumdiscount"
                value={formData.Maximumdiscount}
                type="number"
                min="0"
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <div>
          <div className="Input">
            <label htmlFor="date-input">Start Date*</label>
            <input
              id="date-input"
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
            />
          </div>
          <div className="Input">
            <label htmlFor="date-input">Expiration Date*</label>
            <input
              id="date-input"
              type="date"
              name="expirydate"
              value={formData.expirydate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div>
            <label className="radiobtn" style={radiocolor}>
              <input
                type="radio"
                name="customerLimit"
                value="limited"
                checked={customerLimit === "limited"}
                onChange={handleRadioChange}
              />
              Limited
            </label>
            <label  className="radiobtn" >
              <input
              
                type="radio"
                name="customerLimit"
                value="unlimited"
                checked={customerLimit === "unlimited"}
                onChange={handleRadioChange}
              />
              Unlimited
            </label>
          </div>
          {customerLimit === "limited" && (
            <div className="Input">
              <label>Total customers</label>
              <input
                type="number"
                min="0"
                name="totalcustomers"
                value={formData.totalcustomers}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <div>
          <label for='customerChangeLimited' className="radiobtn" style={radiocolor}>
            <input
            id="customerChangeLimited"
              type="radio"
              value="limited"
              checked={usePerCustomer === "limited"}
              onChange={handleUsePerCustomerChange}
            />
            Limited
          </label>

          <label for='customerChangeUnLimited' className="radiobtn">
            <input
            id="customerChangeUnLimited"
              type="radio"
              value="unlimited"
              checked={usePerCustomer === "unlimited"}
              onChange={handleUsePerCustomerChange}
            />
            Unlimited
          </label>

          {usePerCustomer === "limited" && (
            <div className="Input">
              <label>
                Usage per customer</label>
                <input
                  type="number"
                  min="0"
                  name="Usagepercustomer"
                  value={formData.Usagepercustomer}
                  onChange={handleChange}
                />
            </div>
          )}
        </div>

        <button type="submit" className="Button">
          Create Offer
        </button >
      </form>

      <div className="ImagePopup">
        {/* <Offer trigger={offer} setTrigger={setOffer} /> */}
        {showOffer && <Offer trigger={showOffer} setShowOffer={setShowOffer} response={responseData.data} />}
      </div>
      {/**App container */}
    </div>
  );
}

export default App;
