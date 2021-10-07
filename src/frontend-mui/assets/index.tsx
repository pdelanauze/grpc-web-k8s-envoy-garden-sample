import * as React from 'react';
import ReactDOM from 'react-dom';
import {createTheme, CssBaseline, darkScrollbar, ThemeProvider} from "@mui/material";
import App from "./App";
import {createActionsHook, createEffectsHook, createReactionHook, createStateHook, Provider} from "overmind-react";
import {config, Context} from "./overmind";
import {createOvermind} from "overmind";

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()
export const useEffects = createEffectsHook<Context>()
export const useReaction = createReactionHook<Context>()
const overmind = createOvermind(config)


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar()
      },
    },
  },
});


function AppContainer() {
  return <ThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline/>
      <Provider value={overmind}>
        <App/>
      </Provider>
    </React.Fragment>
  </ThemeProvider>
}

ReactDOM.render(<AppContainer/>, document.querySelector('#app-container'));
