import {Navigate, useLocation} from 'react-router-dom';

const RequireAuthorization = ({isLogined, children }) => {
    const location = useLocation() 
    console.log(isLogined)
    if(isLogined) {
        return <Navigate to='/login' state={{from: location}}/>
    }

    return children
}

export {RequireAuthorization}