import React, { useState, useEffect } from 'react';
import {useParams, Link} from 'react-router-dom';
import { getResource } from '../../clientFetch';


const ClientPage: React.FC = (props) => {
    const {users, logout} = props;
    const [friendUsers, setUsers] = useState([]);
    const {id} = useParams()

    const buttonStyle = {
        width: '130px',
        height: '30px',
      }
    
     

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
             <button onClick={logout} style={buttonStyle}>Log out</button>
        </div>
    )

}


export default ClientPage