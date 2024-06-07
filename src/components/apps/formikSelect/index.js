import React from 'react';
import { useField, ErrorMessage } from 'formik';
import { FormGroup, Input, Label } from 'reactstrap';

const FormikSelect = ({ options, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormGroup>
      <Label tag="h5" htmlFor={props.id || props.name}>
        {label}
      </Label>
      <Input {...field} {...props} type="select" name="persons">
        {options}
      </Input>
      {meta.touched && meta.error ? <div className=" text-danger">{meta.error}</div> : null}
    </FormGroup>
  );
};

export default FormikSelect;
