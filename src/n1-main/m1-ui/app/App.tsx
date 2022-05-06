import React from 'react';
import style from './App.module.css';
import {Main} from "../components/main/Main";
import bacSun from "./../../../picture/bacSun2.jpg"

function App() {

    const styles = {
        background: `url(${bacSun})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }
    return (
        <div style={styles} className={style.wrapper}>
            <Main/>
        </div>
    );
}

export default App;
