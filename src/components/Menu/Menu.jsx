import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {observer} from "mobx-react-lite";
import ticketsStore from '../../store/Tickets'

const useStyles = makeStyles({
    list: {
        display: 'flex',
        flexDirection: 'row',
        boxShadow: '0 0 5px #DFE5EC',
        borderRadius: '10px'
    },
    item: {
        width: '33%',
        padding: '17px 0',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        border: '1px solid #DFE5EC',
        '&:first-child': {
            borderRadius: '10px 0 0 10px',
        },
        '&:last-child': {
            borderRadius: '0 10px 10px 0',
        },
    },
    active: {
        backgroundColor: '#2196F3',
        color: '#FFFFFF',
        border: '1px solid black'
    }
})

const Menu = observer(() => {
    const c = useStyles()

    const [sort, setSort] = useState([
        {id: 'cheap',  label: 'Самый дешевый', active: false},
        {id: 'fast', label: 'Самый быстрый',  active: false},
        {id: 'optimal', label: 'Оптимальный', active: false},
    ]);

    const handleClick = (e) => {
        let newArr = sort.map(i => {
            return e.target.id === i.id ? {...i, active: true} : {...i, active: false};
        });
        setSort(newArr);

        let sortVal = newArr
            .filter(i => i.active)
            .map(i => i.id)
            .join()
        ticketsStore.initSort(sortVal);
    }

    return (
        <ul className={c.list}>
            {
                sort.map((i, idx) => {
                    return (
                        <li
                            key={idx}
                            id={i.id}
                            onClick={handleClick}
                            className={i.active ? `${c.item}  ${c.active}`: `${c.item}`}
                        >
                            {i.label}
                        </li>
                    )
                })
            }
        </ul>
    )
});

export default Menu
