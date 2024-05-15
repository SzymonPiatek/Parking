import React, { useState, useEffect } from 'react';
import axios from 'axios';


function HomePage() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/')
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}


export default HomePage;
