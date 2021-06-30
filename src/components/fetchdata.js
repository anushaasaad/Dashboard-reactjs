import React, { Component } from 'react'

export class fetchdata extends Component {
    constructor() {
        super();

    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then(data => {
            console.log(data);
        })
    }
    render() {
        return (
            <div>
                test
            </div>
        )
    }
}

export default fetchdata
