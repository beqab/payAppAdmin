import React from 'react';
import * as Icon from 'react-feather';

import { Link } from 'react-router-dom';
import { DropdownItem } from 'reactstrap';
import { useSelector } from 'react-redux';
import { User, FileText, Star, Settings, Droplet } from 'react-feather';
import user1 from '../../assets/images/users/user1.jpg';

const ProfileDD = () => {
  const profileReducer = useSelector((state) => state.profileReducer);
  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img src={user1} alt="user" className="rounded-circle" width="60" />
        <span>
          {/* <h6 className="mb-0">John Deo</h6> */}
          <small>{profileReducer?.profile?.email}</small>
        </span>
      </div>
      <Link to="/apps/bookings">
        <DropdownItem className="px-4 py-3">
          <Icon.BookOpen />
          &nbsp; ჯავშნები
        </DropdownItem>
      </Link>
      <Link to="/apps/specialOffer">
        <DropdownItem className="px-4 py-3">
          <Icon.Award />
          &nbsp; სპეციალური შეთავაზება
        </DropdownItem>
      </Link>
      {/* <DropdownItem className="px-4 py-3">
        <Icon.FileText />
        &nbsp; სავიზიტო გვერდი
      </DropdownItem> */}
      {/* <DropdownItem className="px-4 py-3">
        <Droplet size={20} />
        &nbsp; Customize
      </DropdownItem> */}
      <DropdownItem divider />

      <Link to="/apps/settings">
        <DropdownItem className="px-4 py-3">
          <Settings size={20} />
          &nbsp; პარამეტრები
        </DropdownItem>
      </Link>
      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
