import React, { Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../data/countries.json";
import "leaflet/dist/leaflet.css";
import "../component/MyMap.css";
class MyMap extends Component {
  state = { color: "#ff0000" };
  componentDidMount() {
    console.log(mapData);
  }
  countryStyle = {
    fillColor: "red",
    fillOpacity: 1,
    color: "black",
    weight: 2,
    dashArray: 5,
  };
  onCountryClick = (e) => {
    console.log(e);
    e.target.setStyle({
      color: "blue",
      fillColor: this.state.color,
    });
  };
  onColorChange = (event) => {
    this.setState({ color: event.target.value });
  };
  oneachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    console.log(country);
    console.log(layer);
    layer.bindPopup(countryName);
    layer.options.fillOpacity = Math.random();
    layer.on({
      click: this.onCountryClick,

      mouseover: (event) => {
        event.target.setStyle({
          color: "blue",
          fillColor: "yellow",
        });
        console.log(event);
      },
    });
  };
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>My Map</h1>
        <MapContainer style={{ height: "80vh" }} zoom={2} center={[20, 100]}>
          <GeoJSON
            data={mapData.features}
            style={this.countryStyle}
            onEachFeature={this.oneachCountry}
          />
        </MapContainer>
        <input
          type="color"
          name="colortype"
          value={this.state.color}
          onChange={this.onColorChange}
        />
      </div>
    );
  }
}

export default MyMap;
