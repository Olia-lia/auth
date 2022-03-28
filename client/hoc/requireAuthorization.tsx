import {Navigate, useLocation} from 'react-router-dom';
import { connect } from 'react-redux';

import { globalState } from 'client/typesGlobal';

const mapStateToProps = (state: globalState) => ({
    isLoginned: state.login.isLoginned
})

const RequireAuthorization = (Component) => {

    const RequiredComponent = (props) => {
    const location = useLocation() 
  
    if(props.isLoginned) return <Navigate to='/login' state={{from: location}}/>
    

    return <Component {...props}/>
}
let connectedRequiredComponent =  connect(mapStateToProps)(RequiredComponent)
return connectedRequiredComponent
}


export {RequireAuthorization}