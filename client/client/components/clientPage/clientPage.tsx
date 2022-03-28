import React, { useState, useEffect } from 'react';
import {useParams, Link} from 'react-router-dom';
import * as types from '../../clientTypes'


const ClientPage: React.FC = (props) => {
    const {users, logout} = props;
    const {id} = useParams()

    const buttonStyle = {
        width: '130px',
        height: '30px',
      }
    
     

    // useEffect(() => {
    
    // }, [])

    return (
        <div>
            <h1>Your friends {users[0].status} </h1>
            <ul>{
                
                    users.map((user: types.UserInfo) => {
                        <li>
                            <Link key={user.id} to={`/user/${user.id}`}>
                                {user.user}
                            </Link> 
                        </li>
                    })
                }               
            </ul>
             <button onClick={logout} style={buttonStyle}>Log out</button>
        </div>
    )

}


export {ClientPage}