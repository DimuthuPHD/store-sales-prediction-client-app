import axios from "axios";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function PredictionForm() {
  const [formData, setFormData] = useState({
    store_nbr: 2,
    family: "AUTOMOTIVE",
    onpromotion: "0",
    type_x: "Holiday",
    locale: "Local",
    locale_name: "Manta",
    city: "Quito",
    state: "Pichincha",
    type_y: "B",
    cluster: "3",
    dcoilwtico: 60.0,
    transactions: 1000,
    dayofweek: 1,
    dayofyear: 200,
    day: 15,
    month: 1,
    quarter: 1,
    year: 2023,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const headersList = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const requestOptions = {
        method: "POST",
        headers: headersList,
        body: JSON.stringify(formData),
      };

      const response = await fetch(
        "http://18.143.164.143:8000/predict",
        requestOptions
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        // setPrediction(null);
        throw new Error(errorResponse.error || "An error occurred");
      }

      const data = await response.json();

      // Handle response data
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setError(error.message || "An error occurred");
    }
  };

  return (
    <div>
      <h2>Enter Prediction Data</h2>
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
                Family:
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
                Type X:
                <select
                  type="text"
                  className="form-control"
                  name="type_x"
                  value={formData.type_x}
                  onChange={handleChange}
                >
                  <option>Holiday</option>
                  <option>Holiday</option>
                  <option>Transfer</option>
                  <option>Additional</option>
                  <option>Bridge</option>
                  <option>Work</option> Day
                  <option>Event</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Locale
                <select
                  name="locale"
                  className="form-control"
                  value={formData.locale}
                  onChange={handleChange}
                >
                  <option>Local</option>
                  <option>Regional</option>
                  <option>National</option>
                  <option>National</option>
                  <option>Local</option>
                </select>
              </label>
            </div>
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Locale Name:
                <select
                  className="form-control"
                  name="locale_name"
                  value={formData.locale_name}
                  onChange={handleChange}
                >
                  <option>Manta</option>
                  <option>Cotopaxi</option>
                  <option>Cuenca</option>
                  <option>Libertad</option>
                  <option>Riobamba</option>
                  <option>Puyo</option>
                  <option>Guaranda</option>
                  <option>Imbabura</option>
                  <option>Latacunga</option>
                  <option>Machala</option>
                  <option>Santo Domingo</option>
                  <option>El Carmen</option>
                  <option>Cayambe</option>
                  <option>Esmeraldas</option>
                  <option>Ecuador</option>
                  <option>Ambato</option>
                  <option>Ibarra</option>
                  <option>Quevedo</option>
                  <option>Ecuador</option>
                  <option>Santo Domingo de los Tsachilas</option>
                  <option>Santa Elena</option>
                  <option>Quito</option>
                  <option>Loja</option>
                  <option>Salinas</option>
                  <option>Guayaquil</option>
                  <option>Guayaquil</option>
                  <option>Cuenca</option>
                  <option>Ibarra</option>
                  <option>Quito</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label col-md-12">
                City:
                <select
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option>Quito</option>
                  <option>Santo Domingo</option>
                  <option>Latacunga</option>
                  <option>Riobamba</option>
                  <option>Ibarra</option>
                  <option>Guaranda</option>
                  <option>Puyo</option>
                  <option>Ambato</option>
                  <option>Guayaquil</option>
                  <option>Salinas</option>
                  <option>Babahoyo</option>
                  <option>Cuenca</option>
                  <option>Loja</option>
                  <option>Machala</option>
                  <option>Esmeraldas</option>
                  <option>Manta</option>
                </select>
              </label>
            </div>
            <div className="col-md-6">
              <label className="form-label col-md-12">
                State:
                <select
                  className="form-control"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option>Pichincha</option>
                  <option>Santo Domingo de los Tsachilas</option>
                  <option>Cotopaxi</option>
                  <option>Chimborazo</option>
                  <option>Imbabura</option>
                  <option>Bolivar</option>
                  <option>Pastaza</option>
                  <option>Tungurahua</option>
                  <option>Guayas</option>
                  <option>Santa Elena</option>
                  <option>Los Rios</option>
                  <option>Azuay</option>
                  <option>Loja</option>
                  <option>ElOro</option>
                  <option>Esmeraldas</option>
                  <option>Manabi</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Type Y:
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
                dcoilwtico:
                <input
                  type="number"
                  className="form-control"
                  name="dcoilwtico"
                  value={formData.dcoilwtico}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Transactions:
                <input
                  type="number"
                  className="form-control"
                  name="transactions"
                  value={formData.transactions}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Day of Week:
                <input
                  type="number"
                  className="form-control"
                  name="dayofweek"
                  value={formData.dayofweek}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="col-md-6">
              <label className="form-label col-md-12">
                Day of Year:
                <input
                  type="number"
                  className="form-control"
                  name="dayofyear"
                  value={formData.dayofyear}
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
                Quarter:
                <input
                  type="number"
                  className="form-control"
                  name="quarter"
                  value={formData.quarter}
                  onChange={handleChange}
                />
              </label>
            </div>
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
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {prediction && (
        <div>
          {error && <div className="alert alert-danger">{error}</div>}
          {prediction && <div>Prediction: {prediction}</div>}
        </div>
      )}
    </div>
  );
}

export default PredictionForm;
