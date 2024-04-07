import axios from "axios";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function PredictionForm() {
  const [formData, setFormData] = useState({
    store_nbr: 2,
    family: "AUTOMOTIVE",
    onpromotion: "0",
    type_y: "B",
    cluster: "3",
    dcoilwtico: 60.0,
    day: 15,
    month: 1,
    year: 2023,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // For numeric fields, parse the value as a float
    const numericFields = ["store_nbr", "dcoilwtico", "day", "month", "year"];
    const parsedValue = numericFields.includes(name)
      ? parseFloat(value)
      : value;
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Convert dcoilwtico to float before sending it
      const formDataWithNumericDcoilwtico = {
        ...formData,
        dcoilwtico: parseFloat(formData.dcoilwtico),
      };

      const headersList = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const requestOptions = {
        method: "POST",
        headers: headersList,
        body: JSON.stringify(formDataWithNumericDcoilwtico), // Send formDataWithNumericDcoilwtico
      };

      const response = await fetch(
        "http://18.143.164.143:8000/predict",
        requestOptions
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "An error occurred");
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setError(error.message || "An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Store Number:
                <input
                  type="number"
                  className="form-control"
                  name="store_nbr"
                  value={formData.store_nbr}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Product type:
                <select
                  className="form-control"
                  name="family"
                  value={formData.family}
                  onChange={handleChange}
                >
                  <option value="AUTOMOTIVE">Automotive</option>
                  <option value="BABY CARE">Baby Care</option>
                  <option value="BEAUTY">Beauty</option>
                  <option value="BEVERAGES">Beverages</option>
                  <option value="BOOKS">Books</option>
                  <option value="BREAD/BAKERY">Bread/Bakery</option>
                  <option value="CELEBRATION">Celebration</option>
                  <option value="CLEANING">Cleaning</option>
                  <option value="DAIRY">Dairy</option>
                  <option value="DELI">Deli</option>
                  <option value="EGGS">Eggs</option>
                  <option value="FROZEN FOODS">Frozen Foods</option>
                  <option value="GROCERY I">Grocery I</option>
                  <option value="GROCERY II">Grocery II</option>
                  <option value="HARDWARE">Hardware</option>
                  <option value="HOME AND KITCHEN I">Home and Kitchen I</option>
                  <option value="HOME AND KITCHEN II">
                    Home and Kitchen II
                  </option>
                  <option value="HOME APPLIANCES">Home Appliances</option>
                  <option value="HOME CARE">Home Care</option>
                  <option value="LADIESWEAR">Ladieswear</option>
                  <option value="LAWN AND GARDEN">Lawn and Garden</option>
                  <option value="LINGERIE">Lingerie</option>
                  <option value="LIQUOR,WINE,BEER">Liquor, Wine, Beer</option>
                  <option value="MAGAZINES">Magazines</option>
                  <option value="MEATS">Meats</option>
                  <option value="PERSONAL CARE">Personal Care</option>
                  <option value="PET SUPPLIES">Pet Supplies</option>
                  <option value="PLAYERS AND ELECTRONICS">
                    Players and Electronics
                  </option>
                  <option value="POULTRY">Poultry</option>
                  <option value="PREPARED FOODS">Prepared Foods</option>
                  <option value="PRODUCE">Produce</option>
                  <option value="SCHOOL AND OFFICE SUPPLIES">
                    School and Office Supplies
                  </option>
                  <option value="SEAFOOD">Seafood</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label col-md-12">
                On Promotion:
                <select
                  className="form-select"
                  name="onpromotion"
                  value={formData.onpromotion}
                  onChange={handleChange}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </label>
            </div>
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Oil Price:
                <input
                  type="number"
                  className="form-control"
                  name="dcoilwtico"
                  value={formData.dcoilwtico}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Store type:
                <select
                  className="form-control"
                  name="type_y"
                  value={formData.type_y}
                  onChange={handleChange}
                >
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>E</option>
                </select>
              </label>
            </div>
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Cluster:
                <input
                  type="text"
                  className="form-control"
                  name="cluster"
                  value={formData.cluster}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Day:
                <input
                  type="number"
                  className="form-control"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Month:
                <input
                  type="number"
                  className="form-control"
                  name="month"
                  max={12}
                  value={formData.month}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Year:
                <input
                  type="number"
                  className="form-control"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="col-md-6">
              {/* <label className="form-label col-md-12">&nbsp;</label> */}
              <br></br>
              <button type="submit" className="btn btn-primary">
                {" "}
                Submit{" "}
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 prediction-result">
              {/* {prediction && ( */}
              <div>
                {error && <div className="alert alert-danger">{error}</div>}
                Sales Prediction:{" "}
                {prediction && (
                  <div className="prediction-text"> {prediction}</div>
                )}
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PredictionForm;
