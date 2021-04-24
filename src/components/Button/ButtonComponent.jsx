import React from "react";
import {makeStyles} from "@material-ui/styles";
import Button from '@material-ui/core/Button';
import ticketsStore from '../../store/Tickets'
import {observer} from "mobx-react";

const useStyles = makeStyles({
    showButton: {
        width: '100%',
        backgroundColor: '#2196F3',
        padding: '10px 0'
    }
})

const ButtonComponent = observer(() => {
    const c = useStyles()

    return (
        <Button
            color='primary'
            variant='contained'
            onClick={ticketsStore.addNotesOnPage}
            className={c.showButton}
        >
            Показать еще 5 билетов!
        </Button>
/*        <button
            onClick={ticketsStore.addNotesOnPage}
            className={c.showButton}
        >Показать еще 5 билетов!</button>*/
    )
});

export default ButtonComponent
