import { useEffect } from 'react';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Container } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import Header from './header/Header';
// import Customizer from './customizer/Customizer';
import Sidebar from './sidebars/vertical/Sidebar';
import HorizontalHeader from './header/HorizontalHeader';
import HorizontalSidebar from './sidebars/horizontal/HorizontalSidebar';
import Axios from '../services/Axios';
import Endpoints from '../services/endpints';
import { getProfile, logOut } from '../store/profile/profileSlice';
import { ToggleMobileSidebar } from '../store/customizer/CustomizerSlice';

const FullLayout = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { loading, profile } = useSelector((state) => {
    return state.profileReducer;
  });
  // console.log(restaurantInfo, 'restaurantInforestaurantInforestaurantInfo');
  // const token = localStorage.getItem('token');

  // useEffect(() => {}, []);
  // useEffect(() => {
  //   if (!loading && profile?.token && url) {
  //     // alert(profile?.user?.token);
  //     console.log('Axios.defaults.headers', profile?.token);
  //     // console.log(profile, 'profileprofileprofile');
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${profile?.token}`;
  //     axios.defaults.headers.common['Content-Type'] = `"application/json`;
  //     axios.defaults.baseURL = url;
  //   }
  // }, [loading, profile?.token, url]);
  // useEffect(() => {
  //   // alert(pathname);
  //   if (token) {
  //     Axios.get(Endpoints.getRestaurantInfo(), {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res, 'FullLayout');
  //         dispatch(getProfile({ token: res.data.token, email: res.data.email }));
  //       })
  //       .catch((err) => {
  //         console.log(err, 'errrrrrrrrrrrmdkfgmdfmgdkgmk');
  //         console.log(err, 'FullLayout');
  //         console.log(err);

  //         dispatch(logOut());
  //         // console.log('/authFormik');
  //         navigate('/auth/loginFormik');
  //       });
  //   }
  // }, [pathname]);

  const customizerToggle = useSelector((state) => state.customizer.customizerSidebar);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const showMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const LayoutHorizontal = useSelector((state) => state.customizer.isLayoutHorizontal);
  const isFixedSidebar = useSelector((state) => state.customizer.isSidebarFixed);
  return (
    <main>
      <div
        className={`pageWrapper d-md-block d-lg-flex ${toggleMiniSidebar ? 'isMiniSidebar' : ''}`}
      >
        <ToastContainer />
        {/******** Sidebar **********/}
        {LayoutHorizontal ? (
          ''
        ) : (
          <aside className={`sidebarArea ${showMobileSidebar ? 'showSidebar' : ''}`}>
            <Sidebar />
          </aside>
        )}
        {/********Content Area**********/}

        <div className={`contentArea ${topbarFixed ? 'fixedTopbar' : ''}`}>
          {/********header**********/}
          {LayoutHorizontal ? <HorizontalHeader /> : <Header />}
          {LayoutHorizontal ? <HorizontalSidebar /> : ''}
          {/********Middle Content**********/}
          <Container fluid className="p-4 boxContainer">
            <div className={isFixedSidebar && LayoutHorizontal ? 'HsidebarFixed' : ''}>
              <Outlet />
            </div>
            {/* <Customizer className={customizerToggle ? 'showCustomizer' : ''} /> */}
            {showMobileSidebar || customizerToggle ? (
              <div onClick={() => dispatch(ToggleMobileSidebar())} className="sidebarOverlay" />
            ) : (
              ''
            )}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
