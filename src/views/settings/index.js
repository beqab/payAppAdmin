import { useState, useEffect } from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';

import {
  Button,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabPane,
} from 'reactstrap';
import { ErrorMessage, Field, Formik } from 'formik';
import styled from 'styled-components';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import Axios from '../../services/Axios';
import Endpoints from '../../services/endpints';
// import ProfileInfo from './profileInfo';
import ChangePassword from './changePassword';
// import BankAndPayment from './bankAndPayment';
// import Invoices from './invoices';

const TabWrapper = styled.div`
  @media (max-width: 767px) {
    margin-left: -14px !important;
    margin-right: -14px !important;
  }
`;

const Settings = () => {
  const [activeTab, setActiveTab] = useState('changePassword');
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await Axios.get(Endpoints.profile.get(localStorage.getItem('token')));
        console.log(res.data.user);
        setUser(res.data.user);
      } catch (err) {
        console.log(err, 'errr');
      }
    };
    getUserInfo();
  }, []);
  return (
    <>
      {/* <BreadCrumbs /> */}
      {/* <Card> */}
      {/* <CardBody className="p-4"> */}
      <ComponentCard className="p-3" title="პარამეტრები">
        <TabWrapper>
          <Nav tabs>
            <NavItem>
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('changePassword');
                }}
                href=""
                active={activeTab === 'changePassword'}
              >
                პაროლის შეცვლა
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('notifications');
                }}
                href=""
                active={activeTab === 'notifications'}
              >
                შეტყობინებები
              </NavLink>
            </NavItem>
          </Nav>
        </TabWrapper>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <div className="py-4">
                {/* {!user ? 'loading...' : activeTab === 'main' ? <ProfileInfo user={user} /> : null} */}
                {activeTab === 'changePassword' ? <ChangePassword /> : null}
                {activeTab === 'notifications' ? <div> გვერდი მალე დაემატება </div> : null}
                {/* {!user ? '' : activeTab === 'pay' ? <BankAndPayment user={user} /> : null} */}
                {/* {activeTab === 'invoice' ? <Invoices /> : null} */}
              </div>

              {/* <div className="p-4">{activeTab === 'pay' ? <ChangePassword /> : null}</div> */}
            </Col>
          </Row>
        </TabPane>
      </ComponentCard>
      {/* </CardBody> */}
      {/* </Card> */}
    </>
  );
};

export default Settings;
