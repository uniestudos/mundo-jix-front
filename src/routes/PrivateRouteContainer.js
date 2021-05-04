import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

import { Menu } from "components/Menu";
import { Header } from "components/Header";

// import { useAuth } from 'utils/context/auth'

// import { autoLogin } from 'services/login'

export const PrivateRouteContainer = ({ component: Component, ...rest }) => {
  // const location = useLocation();
  // const { data: usertype } = useSelector((state) => state.usertype);
  const { data: user } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Menu user={user ? user : { name: "teste", last_name: "teste" }} />
          <Header user={user ? user : { name: "teste", last_name: "teste" }} />
          <Component {...props} />
        </>
      )}
    />
  );
};

// import React from "react";
// import { useSelector } from "react-redux";
// import { Route, Redirect, useLocation } from "react-router-dom";

// import { Menu } from "components/Menu";
// import { Header } from "components/Header";

// // import { useAuth } from 'utils/context/auth'

// // import { autoLogin } from 'services/login'

// export const PrivateRouteContainer = ({ component: Component, ...rest }) => {
//   const location = useLocation();
//   const { data: usertype } = useSelector((state) => state.usertype);
//   const { data: user } = useSelector((state) => state.user);
//   // console.log(user, loading)

//   // if (loading) {
//   //     return <div>carregando...</div>
//   // } else {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? (
//           <>
//             <Menu user={user} />
//             <Header user={user} />
//             <Component {...props} />
//           </>
//         ) : (
//           <Redirect
//             to={{
//               pathname: `/auth/${usertype}/logout`,
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };
