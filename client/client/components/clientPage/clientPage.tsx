import React from 'react';
import {useParams, Link} from 'react-router-dom';
import * as types from '../../clientTypes';


const ClientPage: React.FC = (props) => {
    const {users, logout} = props;
  

    const buttonStyle = {
        width: '130px',
        height: '30px',
    };

    return (
        <div>
            <h1>Your page</h1> {
                users.map((user: types.UserInfo) => { 
                    const {id} = useParams();
                    return (
                        <Link key={user.id} to={`/user/${user.id}`}>
                            {user.user}
                        </Link>
                    );})}
            <button onClick={logout} style={buttonStyle}>Log out</button>
        </div>
    );
};


export default ClientPage;