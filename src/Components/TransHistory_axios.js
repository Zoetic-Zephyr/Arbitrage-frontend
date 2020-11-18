import React from 'react'
import Axios from 'axios'

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export default class TransHistory extends React.Component {
    state = {
        persons: [],
    };

    componentDidMount() {
        // let data = {username: 'testusername', 
        //         start_time: '00:00:00',
        //         end_time: '23:59:59'
        //     }

        // postData('http://0.0.0.0:8080/trans_history', data)
        // .then(data => {
        // console.log(data); // JSON data parsed by `data.json()` call
        // });

        let config = {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: 'testusername', 
                start_time: '00:00:00',
                end_time: '23:59:59'
            }),
        };

        
        Axios.post('http://0.0.0.0:8080/trans_history', 
        {
            username: 'testusername', 
            start_time: '00:00:00',
            end_time: '23:59:59'
        })
        // Axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            console.log(res)
            this.setState({ persons: res.data });
        });
    }

    render() {
        return <ul> {this.state.persons.map(person => <li key={person.id}>{person.name}</li>)} </ul>;
    }
    
}
