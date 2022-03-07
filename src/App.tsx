import React from 'react';
import styles from './App.module.css';
import SurveyComponent from "./components/Survey/Survey";
import Header from "./components/Header/Header";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

function App() {

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.App}>
                <Header title="Code Challenge"/>
                <SurveyComponent/>
            </div>
        </ThemeProvider>
    );
}

export default App;
