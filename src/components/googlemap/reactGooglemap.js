import React, { useState, useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import PlacesAutocomplete from './search';
/* eslint-disable */

const containerStyle = {
  maxWidth: '1200px',
  height: '500px',
  width: '100%',
};

// const center = {
//   lat: 41.7166,
//   lng: 44.7833,
// };

const AutoComplete = () => {};

function MyComponent({
  field,
  form: { touched, values, errors, setFieldTouched, validateField, setFieldValue, handleBlur },
}) {
  const [center, setCenter] = useState({
    lat: 41.7166,
    lng: 44.7833,
  });

  console.log(field.value, 'vvvv');

  const [zoom, setZoom] = useState(12);
  useEffect(() => {
    setTimeout(() => {
      setZoom(13);
      if (field.value) {
        setCenter(field.value);
      }
    }, 2300);
  }, [field.value]);

  const onMapClick = (e) => {
    setFieldValue(field.name, {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    setTimeout(() => {
      validateField(field.name);
      setFieldTouched(field.name);
    }, 0);
  };

  const libs = ['places'];
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // googleMapsApiKey: 'AIzaSyDEIuceTHL6FKguxgEEzn4cWUGPhWdD8PQ',
    googleMapsApiKey: 'AIzaSyB8tWSctkE8Mk2ciIeQxqrseF8cvB7u94k',
    libraries: libs,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = (map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.setZoom(10);
    setMap(map);
  };

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const setValue = (data) => {
    setFieldValue(field.name, data.coords);
    setCenter(data.coords);
    setTimeout(() => {
      validateField(field.name);
      setFieldTouched(field.name);
    }, 0);
  };

  return isLoaded ? (
    <>
      <PlacesAutocomplete setSelectedValue={setValue} />
      <GoogleMap
        zoom={zoom}
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={{
          minZoom: 4,
          maxZoom: 30,
        }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>
          {field.value && (
            <Marker
              position={{
                lat: field.value.lat,
                lng: field.value.lng,
              }}
            />
          )}
        </>
      </GoogleMap>
      {errors[field.name] ? (
        <div className="invalid-feedback d-block ">
          {errors[field.name] ? 'მიუთითეთ ლოკაცია რუკაზე' : null}
        </div>
      ) : null}
    </>
  ) : (
    <>loading...</>
  );
}

export default MyComponent;
