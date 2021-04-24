import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    item: {
        borderRadius: '10px',
        boxShadow: '0 0 5px #DFE5EC',
        padding: '20px',
        marginBottom: '20px'
    },
    caption: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px'
    },
    flights: {
        width: '100%',
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    price: {
        margin: '0',
        fontSize: '24px',
        color: '#2196F3'
    },
    tableHead: {
        color: 'gray'
    },
});

const Flight = ({ticket}) => {
    const c = useStyles();

    function formatFlyTime(time) {
        let hours = Math.trunc(time / 60);
        let min = time % 60;
        return `${hours}ч ${min}мин`;
    }

    function formatDepartureTime(time) {
        let date = new Date(time)
        let h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
        let m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
        return `${h}: ${m}`;
    }

    function formatDate(flightDate, flightTime) {
        let departure = Date.parse(flightDate)
        let arrival = departure + flightTime * 60000
        return `${formatDepartureTime(departure)} - ${formatDepartureTime(arrival)}`;
    }

    function renderSwitch(param) {
        switch (param) {
            case 1:
                return ' пересадка'
            case 2:
                return ' пересадки'
            default:
                return ' пересадки'
        }
    }

    return (
        <li className={c.item}>
            <div className={c.caption}>
                <p className={c.price}>{ticket.price} Р</p>
                <img src={`http://pics.avs.io/99/36/${ticket.carrier}.png`} alt=""/>
            </div>
            <table className={c.flights}>
                <tbody>
                {
                    ticket.segments.map((i, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <tr className={c.tableHead}>
                                    <th>{i.origin}-{i.destination}</th>
                                    <th>В пути</th>
                                    <th>
                                        {i.stops.length ? i.stops.length + renderSwitch(i.stops.length) : 'без пересадок'}
                                    </th>
                                </tr>
                                <tr className={c.tableRow}>
                                    <td>{formatDate(i.date, i.duration)}</td>
                                    <td>{formatFlyTime(i.duration)}</td>
                                    <td>{i.stops.join(', ')}</td>
                                </tr>
                                {idx === 0 && <br/>}
                            </React.Fragment>
                        )
                    })
                }
                </tbody>
            </table>
        </li>
    );
}

export default Flight