import React, { useEffect } from 'react';
import {useParams, Link} from 'react-router-dom';
import * as types from '../../clientTypes';


const ClientPage: React.FC = (props) => {
    const {users} = props;
    

    return (
        <div className="client__page">
            <h1>Your page</h1> {

                users.map((user: types.UserInfo) => { 
                    const {id} = useParams();
                    return (<Link key={user.id} to={`/user/${user.id}`}>
                        {user.user}
                    </Link>);
                })
            }
        </div>
    );
};


export default ClientPage;