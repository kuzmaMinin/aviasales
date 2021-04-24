import React from "react";
import './App.css';
import Header from './components/Header/Header'
import Menu from "./components/Menu/Menu";
import Filter from "./components/Filter/Filter";
import Flights from "./components/Flights/Flights";
import {Container, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import ButtonComponent from "./components/Button/ButtonComponent";

const useStyles = makeStyles({
    container: {
        padding: '0 100px',
        backgroundColor: '#F3F7FA',
    },
    header: {
        margin: '30px 0 0'
    }
})

const App: React.FC =() => {
    const c = useStyles()

    return (
        <div className="App">
            <Container>
                <Grid container spacing={3} className={c.container}>
                    <Grid item xs={12} className={c.header}>
                        <Header/>
                    </Grid>

                    <Grid item xs={4}>
                        <Filter/>
                    </Grid>

                    <Grid item xs={8}>
                        <Menu/>
                        <Flights/>
                        <ButtonComponent/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
