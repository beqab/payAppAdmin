import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { FormGroup, Input, Label } from 'reactstrap';
/* eslint-disable */

const PlacesAutocomplete = ({ setSelectedValue }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description, ...rest }) =>
    () => {
      // console.log(rest, 'rrrrrrrrr');
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log('📍 Coordinates: ', { lat, lng });
        setSelectedValue({
          coords: { lat, lng },
          address: description,
        });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <FormGroup>
        <Label>მოძებნე რუკაზე</Label>
        <Input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="მისამართი, სახელი ა.შ"
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === 'OK' && <ul>{renderSuggestions()}</ul>}
      </FormGroup>
    </div>
  );
};

export default PlacesAutocomplete;
