import {Navigate, useLocation} from 'react-router-dom';
import { connect } from 'react-redux';

import { globalState } from 'client/typesGlobal';

const mapStateToProps = (state: globalState) => ({
    isLoginned: state.login.isLoginned
});

const RequireAuthorization = (Component) => {

    const RequiredComponent = (props) => {
        const location = useLocation();

  
        if(props.isLoginned == false) return <Navigate to='/' state={{from: location}}/>;
    

        return <Component {...props}/>;
    };
    let connectedRequiredComponent =  connect(mapStateToProps)(RequiredComponent);
    return connectedRequiredComponent;
};


export default RequireAuthorization;