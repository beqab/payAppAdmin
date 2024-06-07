import React from 'react';
import { NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  img {
    object-fit: cover;
    margin-right: 12px;
    display: inline-block;
  }
  .noteText {
    width: 160px;
  }
`;
const SpecialOfferListItem = ({
  onClick,
  _id,
  active,
  SpecialOfferTitle,
  price,
  SpecialOfferDatef,

  images,
  status,
}) => (
  <NavItem className={`border-bottom cursor-pointer ${active === _id ? 'bg-light ' : ''}`}>
    <div
      onClick={onClick}
      className={`border-start p-3 border-4 border-${status ? 'success' : 'warning'}`}
    >
      <CardWrapper>
        <img src={images[0]} alt="" width={70} height={65} className=" rounded-2" />

        <div>
          <h5 className="text-truncate noteText">{SpecialOfferTitle}</h5>
          <div className="d-flex">
            {/* <small>{SpecialOfferDatef}</small> */}
            <small>{price} ₾</small>
            {/* <UncontrolledTooltip placement="top" target="delete">
              Delete
            </UncontrolledTooltip>
            <i onClick={onDeleteClick} className="bi bi-trash ms-auto" id="delete" /> */}
          </div>
        </div>
      </CardWrapper>
    </div>
  </NavItem>
);

SpecialOfferListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  SpecialOfferTitle: PropTypes.string.isRequired,
  SpecialOfferDatef: PropTypes.string.isRequired,

  _id: PropTypes.string,
  active: PropTypes.any,
};

export default SpecialOfferListItem;
