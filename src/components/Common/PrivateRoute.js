// import React from 'react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Redirect,
//     useHistory,
//     useLocation
//   } from "react-router-dom";
// import { connect } from 'react-redux';

// const PrivateRoute = ({ component: Component, auth, ...rest }) => (
//     <Route
//       {...rest}
//       render={props => {
//         if (auth.isLoading) {
//           return <div>Loading...</div>;
//         } else if (!auth.isAuthenticated) {
//           return <Redirect to='/login' />;
//         } else {
//           return <Component {...props} />;
//         }
//       }}
//     />
//   );
  
//   const mapStateToProps = state => ({
//     auth: state.auth
//   });
  
//   export default connect(mapStateToProps)(PrivateRoute);