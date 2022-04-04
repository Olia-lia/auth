import {connect} from 'react-redux';
import * as actions from '../../redux/actionsCreators';
import {logOut} from '../../../authorization/redux/actionsCreators';
import ClientPage from './clientPage';
import RequireAuthorization from '../../../hoc/requireAuthorization';

import {globalState} from '../../../typesGlobal';
import * as types from '../../clientTypes';  

const mapDispatchToProps = (dispatch) => {
    return {
        getResource:(endpoint: string) => {dispatch(actions.getResourse(endpoint));},
        logout: () => {dispatch(logOut());}
    };
};

const mapStateToProps = (state: globalState) => {
    return {
        users: state.client.users
    };
};

const clientPageContainer = connect(mapStateToProps, mapDispatchToProps) (ClientPage);
let AuthClientPageContainer = RequireAuthorization(clientPageContainer);

export default AuthClientPageContainer;