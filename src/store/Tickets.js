import {autorun, makeAutoObservable} from "mobx";

class Tickets {
    tickets = [];
    filteredTickets = [];
    filters = [];
    notesOnPage = 5;
    error = false;

    constructor() {
        makeAutoObservable(this)
        autorun(async () => {
            await this.fetchTickets();
            await this.initFilter();
        })
    }

    async fetchTickets() {
        let searchId;
        await fetch('https://front-test.beta.aviasales.ru/search')
            .then(response => response.json())
            .then(data => {
                return {searchId} = data;
            })
            .catch(err => {
                console.log(err, 'error');
                this.error = true;
                console.log(this.error);
            });
        await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
            .then(response => response.json())
            .then(data => {
                this.tickets = data.tickets;
            })
            .catch(err => {
                console.log(err, 'error');
                this.error = true;
                console.log(this.error);
            });
    }

    initFilter = () => {
        this.filteredTickets = this.tickets;
    }

    setFilter(val) {
        this.filters = val;
        let arrFilters = this.filters.map(i => i.checked && i.id).filter(i => i !== false);
        if (arrFilters) {
            this.filteredTickets = []
            arrFilters.forEach(item => {
                switch (item) {
                    case 'withZeroFilter':
                        this.universalFilter(0);
                        break;
                    case 'withAllFilter':
                        this.universalFilter();
                        break;
                    case 'withOneFilter':
                        this.universalFilter(1);
                        break;
                    case 'withTwoFilter':
                        this.universalFilter(2);
                        break;
                    case 'withThreeFilter':
                        this.universalFilter(3);
                        break;
                    default:
                        this.filteredTickets = []
                }
            })
        } else this.filteredTickets = []
    }

    universalFilter(transfersNum) {
        this.notesOnPage = 5;
        if (transfersNum === undefined) {
            this.filteredTickets = this.tickets;
        } else {
            let currFlights = this.tickets.filter(i => {
                return i.segments[0].stops.length === transfersNum && i.segments[1].stops.length === transfersNum;
            })
            this.filteredTickets.push(...currFlights);
        }
    }

    initSort(sort) {
        switch (sort) {
            case 'fast':
                this.filteredTickets = this.filteredTickets
                    .sort((a, b) => {
                        return (a.segments[0].duration + a.segments[1].duration) -
                            (b.segments[0].duration + b.segments[1].duration);
                    });
                return;
            case 'cheap':
                this.filteredTickets = this.filteredTickets.sort((a, b) => a.price - b.price);
                return;
            case 'optimal':
                this.filteredTickets = this.filteredTickets
                    .sort((a, b) => {
                        return (a.segments[0].stops.length + a.segments[1].stops.length) -
                            (b.segments[0].stops.length + b.segments[1].stops.length);
                    });
                return;
            default:
                return;
        }
    }

    addNotesOnPage = () => {
        this.notesOnPage += 5
        console.log(this.notesOnPage)
    }
}

export default new Tickets();