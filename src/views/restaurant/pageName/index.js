import React, { useState, useEffect } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import Axios from 'axios';
// import Axios from '../../../services/Axios';
import Endpoints from '../../../services/endpints';

const check = (ew) => {
  if (ew >= 48 && ew <= 57) return true;
  if (ew === 189) return true;
  if (ew >= 65 && ew <= 90) return true;
  if (ew >= 97 && ew <= 122) return true;
  return false;
};

const url = 'www.tablebook.ge/';
const PageName = ({ pageName, setPageName }) => {
  const [error, setError] = useState('');
  console.log(pageName, 'pageNamepageNamepageName');
  const handleChange = (e) => {
    setError('');
    const val = e.target.value;
    setPageName(`${val ? val.split(' ').join('-') : ''}`);
  };

  const handleKeyDown = (event) => {
    console.log(event);
    // if (!check(event.nativeEvent.which)) {
    //   event.preventDefault();
    // }
  };

  const inputBlur = async () => {
    const slag = pageName;
    if (!slag) {
      setError('ვებგვერდის სახელი აუცილებელია');
    } else {
      try {
        const res = await Axios.post(
          Endpoints.profile.checkSlag,
          {},
          {
            params: {
              slag,
            },
          },
        );
        setError('');
      } catch (err) {
        if (err?.response?.status === 402) {
          setError(err.response.data.msg);
        }
      }
    }
  };
  return (
    <FormGroup>
      <Label htmlFor="restaurantName">
        შექმენი ვებგვერდის სახელი (გამოიყენეთ ლათინური სიმბოლოები)
        <br />
        მაგალითად: {url}
        {pageName || 'dawesebulebis-saxeli'}
      </Label>
      <Input
        className={error ? 'is-invalid' : ''}
        value={pageName}
        onBlur={inputBlur}
        onKeyDown={handleKeyDown}
        onChange={(e) => handleChange(e)}
        placeholder="dawesebulebis-saxeli"
      />
      <div className="invalid-feedback">{error}</div>
    </FormGroup>
  );
};

export default PageName;
