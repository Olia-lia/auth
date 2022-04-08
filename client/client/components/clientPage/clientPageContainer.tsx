import {connect} from 'react-redux';
import * as actions from '../../redux/actionsCreators';
import ClientPage from './clientPage';
import RequireAuthorization from '../../../hoc/requireAuthorization';

import {globalState} from '../../../typesGlobal';
import * as types from '../../clientTypes';  
import { fetchRequests } from '../../redux/actionsCreators';

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRequest:(endpoint: string, method: string ) => {dispatch(actions.fetchRequest(endpoint, method));},
        fetchRequests: () => {dispatch(actions.fetchRequests());}
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