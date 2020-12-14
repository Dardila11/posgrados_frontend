import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useContext, createContext, useState } from "react";
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { Provider } from 'react-redux'
import store from 'src/redux/store'
import { ProvideAuth } from "src/views/auth/Context/use-auth.js";


const App = () => {
  const routing = useRoutes(routes);

  return (
    <ProvideAuth>

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {routing}
          {/* {<PrivateRoute exact path='director' component={Dashboard} />} */}
        </ThemeProvider>
      </Provider>
            
    </ProvideAuth>
  );
};

export default App;
