// https://github.com/diegohaz/arc/wiki/Selectors
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#resource
export const initialState = {};
// need to keep it in sync with
export const initialUserState = {
  uuid: '', // User id
  pv: {}, // profiles viewed
  cs: {}, // cities searched
  pc: { requestCallback: [], bookTour: [], requestTour: [] }, // profiles contacted
  fs: [], // filters selected
  ps: [], // profiles saved
  psh: [], // profiles shared
  v: [], // dates visited
  a: {}, // care assessment,
  tr: [], // Tour request details;
  sc: {}, // request seniorly concierge contact
  userDetails: {},
  commMessage: '', // Message to communities
  shownNotifications: {}, // notifications shown
  shownNotificationsForDate: {}, // For notifications seen on date
};

export const getUserModel = (state = initialState, data) => {
  initialUserState.userDetails = data;
  return { ...state, userModel: initialUserState.userDetails };
};

export const getUserConverted = (state, profile_slug) => {
  // PROFILE SLUG IS ENTIRE PROPS
  // console.log('********In User selector seeing params',state,'***********Slug',profile_slug);
  return (
    state.users.userDetail &&
    state.users.userDetail.hasOwnProperty('email') &&
    (profile_slug.detail &&
      state.users.userDetail.slug === profile_slug.detail.id)
  );
  // state.users && state.users.pc.hasOwnProperty(profile_slug
  // )
};
