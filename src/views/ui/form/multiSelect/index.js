/* eslint-disable */
import React, { useState } from 'react';
import Select from 'react-select';
import { Col, FormGroup, Label } from 'reactstrap';

const MultiSelect = ({
  maxSelectable = 3,
  options,
  field,

  // label2,
  form: {
    touched,
    values,
    label,

    errors,
    setFieldTouched,
    validateField,
    setFieldValue,
    handleBlur,
    ...rrr
  },
  label2,
  ...props
}) => {
  // console.log(props, label2, 'propspropspropsprops');
  return (
    <FormGroup
      onBlur={() => {
        validateField(field.name);
        setFieldTouched(field.name);
      }}
    >
      <Col md="12">
        <Label htmlFor={'field.name'}> {label2} </Label>
        <Select
          {...props}
          className={errors[field.name] && touched[field.name] ? ' is-invalid' : ''}
          blurInputOnSelect={() => {
            handleBlur();
          }}
          isMulti
          options={options}
          value={field.value}
          onChange={(d) => {
            setFieldValue(field?.name, d);
            setTimeout(() => {
              validateField(field?.name);
              setFieldTouched(field?.name);
            }, 0);
          }}
        />
        <div className="invalid-feedback">{errors[field.name]}</div>
      </Col>
    </FormGroup>
  );
};

export default MultiSelect;
