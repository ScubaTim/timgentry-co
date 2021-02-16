import React from "react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "../utils/useDarkMode"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss'
import { GlobalStyles } from '../styles/GlobalStyles';
import { lightTheme, darkTheme } from '../styles/Themes';

function MyApp({ Component, pageProps }) {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme

  if (!mountedComponent) return <div />
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Component theme={theme} themeToggler={themeToggler} {...pageProps} />
    </ThemeProvider>
  )

}

export default MyApp
