import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import ticketsStore from '../../store/Tickets'
import {observer} from "mobx-react-lite";
import {Checkbox} from "@material-ui/core";

const useStyles = makeStyles({
    list: {
        padding: '20px',
        boxShadow: '0 0 10px #DFE5EC',
        borderRadius: '10px',
        textAlign: "left"
    },
    title: {
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    checkbox: {
        marginRight: '10px',
        color: '#2196F3',
    }
});

const Filter = observer(() => {
    const c = useStyles();

    const [checkboxVal, setCheckboxVal] = useState([
        {id: 'withAllFilter', checked: true, label: 'Все'},
        {id: 'withZeroFilter', checked: false, label: 'Без пересадок'},
        {id: 'withOneFilter', checked: false, label: '1 пересадка'},
        {id: 'withTwoFilter', checked: false, label: '2 пересадки'},
        {id: 'withThreeFilter', checked: false, label: '3 пересадки'},
    ]);

    const handleChange = (e) => {
        let newArr = checkboxVal.map(i => {
            return e.target.id === i.id ? {...i, checked: !i.checked} : i;
        })
        setCheckboxVal(newArr);
        ticketsStore.setFilter(newArr)
    }

    return (
        <ul className={c.list}>
            <p className={c.title}>Количество пересадок</p>
            {
                checkboxVal.map((i, idx) => {
                    return (
                        <li key={idx}>
                            <Checkbox
                                checked={i.checked}
                                type="checkbox"
                                id={i.id}
                                className={c.checkbox}
                                onChange={handleChange}
                                color='#2196F3'
                            />
                            <label htmlFor={i.id}>{i.label}</label>
                        </li>
                    )
                })
            }
        </ul>
    )
});

export default Filter;