import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import './notes.scss';
import { FALSE } from 'sass';

const TwoColumn = ({ leftContent, rightContent }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-lg-flex d-md-block border position-relative leftRightBox offerContainer">
      <div className={`leftPart bg-white border-end ${isOpen ? 'showLeftPart' : ''}`}>
        <Button
          style={{
            top: '16px',
            right: '-48px',
          }}
          className="d-xl-none openCloseBtn"
          onClick={handleSubmit}
          color="danger"
        >
          <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`} />
        </Button>
        <SimpleBar onClick={() => setIsOpen(false)} style={{ height: 'calc(100vh - 200px)' }}>
          {leftContent}
        </SimpleBar>
      </div>
      {/* <div
        className={`leftPart flex-shrink-0  bg-white border-end ${isOpen ? 'showLeftPart' : ''}`}
      >
        dd
        <Button className="d-lg-none d-md-block openBtn" color="danger">
          <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`} onClick={handleSubmit} />
        </Button>
        dd
        <SimpleBar style={{ height: 'calc(100vh - 200px)' }}>{leftContent}</SimpleBar>
      </div> */}
      <div className="rightPart">
        {rightContent}
        {isOpen ? <div className="contentOverlay" /> : ''}
      </div>
    </div>
  );
};

TwoColumn.propTypes = {
  leftContent: PropTypes.node,
  rightContent: PropTypes.node,
};

export default TwoColumn;
