import React from 'react'
import BasicTable from './BasicTable'


// Func from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


export default class TransHistory extends React.Component {
    state = {
        transactions: [],
    };

    componentDidMount() {
        let data = {
            username: 'testusername', 
            start_time: '00:00:00',
            end_time: '23:59:59'
        };

        postData('http://0.0.0.0:8080/trans_history', data)
        .then(res => {
            console.log(Object.values(res.data.trans_history)); // JSON data parsed by `data.json()` call
            this.setState({ transactions: res.data.trans_history})
        });
    }

    render() {
        const {transactions} = this.state;

        return (
        <ul> {transactions.map(transaction => <li key={transaction.dt}>{transaction.exchange}</li>)} </ul>
        // return <BasicTable />
        )
    }
}
