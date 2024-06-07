import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-decoration: unset;
  padding: 10px 30px;
`;

const AuthLinks = (props) => {
  return (
    <Wrapper>
      <Link to="/auth/loginformik">ავტორიზაცია</Link>
      <Link to="/auth/registerformik">რეგისტრაცია</Link>
    </Wrapper>
  );
};

export default AuthLinks;
