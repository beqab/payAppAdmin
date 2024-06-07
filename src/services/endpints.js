const Endpoints = {
  auth: () => `/restaurant/register`,
  uploadImage: '/restaurant/profile/uploadImage',
  signIn: () => '/admin/login',
  mailConfirmation: '/restaurant/confirmemail',
  resendEmailVerification: () => '/restaurant/resendMailConfirmation',
  recoverPassword: `/restaurant/recoverPassword`,
  resetPassword: `/restaurant/resetPassword`,
  saveRestaurantInfo: () => `/restaurant/profile`,
  uploadMenuImgs: `/restaurant/profile/uploadmenu`,
  getRestaurantInfo: () => `/restaurant/`,
  translate: () => '/translate',
  profile: {
    get: () => '/restaurant/profile',
    checkSlag: '/restaurant/profile/checkSlag',
    editTranslate: '/restaurant/profile/editTranslate',
    changePassword: '/restaurant/changePassword',
  },
  categories: {
    get: () => '/admin/categories',
  },
  specialOffer: {
    post: () => '/specialOffer',
    delete: () => '/specialOffer/delete',
    getAll: () => '/specialOffer/getAll',
    changeStatus: () => '/specialOffer/changeStatus',
    editTranslate: '/specialOffer/editOfferTranslate',
  },
  bookings: {
    getAll: '/reservation/all/forRestaurant',
    changeStatus: '/reservation/changeStatus',
  },
};

export default Endpoints;
