import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",

  marginBottom: "30px",
};

export default function MapDisplay({ placement, setplacement }) {
  const [pins, setPins] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DJANGO}/pins/`)
      .then((res) => {
        setPins(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const onMarkerClick = (evt) => {
    const { latLng } = evt;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setplacement({ userlat: lat, userlng: lng });
  };
  const coordinates = {
    lat: placement.userlat,
    lng: placement.userlng,
  };
  const coordin = {
    lat: placement.userlat,
    lng: -117,
  };
  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  };

  return (
    <LoadScript googleMapsApiKey={`${process.env.REACT_APP_MAP}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={18}
        onClick={onMarkerClick}
      >
        {/* Child components, such as markers, info windows, etc. */}

        <>
          {/* <Marker position={center} /> */}
          {/* <InfoBox onLoad={onLoad} options={options} position={center}>
            <div
              style={{ backgroundColor: "yellow", opacity: 0.75, padding: 12 }}
            >
              <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                Hello, World!
              </div>
            </div>
          </InfoBox> */}
          <Marker position={coordinates} /> <Marker position={coordin} />
          <MarkerClusterer options={options}>
            {(clusterer) =>
              pins.map((pin) => {
                const coord = {
                  lat: parseFloat(pin.latitude),
                  lng: parseFloat(pin.longitude),
                };

                return (
                  <Marker
                    key={pin.id}
                    position={coord}
                    clusterer={clusterer}
                    icon={
                      "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }
                  />
                );
              })
            }
          </MarkerClusterer>
        </>
      </GoogleMap>
    </LoadScript>
  );
}
