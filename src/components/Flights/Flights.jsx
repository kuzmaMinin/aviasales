import React from "react";
import ticketsStore from "../../store/Tickets";
import {observer} from "mobx-react-lite";
import Flight from "../Flight/Flight";

const Flights = observer(() => {
    return (
        <ul>
            {
                (ticketsStore.error) ? <p>Извините, произошла ошибка на сервере, попробуйте перезагрузить страницу</p> :
                ticketsStore.filteredTickets.map((i, idx) => (idx < ticketsStore.notesOnPage) && <Flight key={idx} ticket={i}/>)
            }
        </ul>
    )
});

export default Flights

