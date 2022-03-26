import React, { useState, useEffect } from 'react';
import {useParams, Link} from 'react-router-dom';
import { getResource } from '../../clientFetch';


const ClientPage: React.FC = (props) => {
    const {users} = props;
    const [friendUsers, setUsers] = useState([]);
    const {id} = useParams()

    // useEffect(() => {
    
    // }, [])

    return (
        <div>
            <h1>Your friends</h1>
                {
                    users.map(user => {
                        <Link key={user.id} to={`/user/${user.id}`}>
                            <li>{user.name}</li>
                        </Link>
                    })
                } 
        </div>
    )

}


export default ClientPage