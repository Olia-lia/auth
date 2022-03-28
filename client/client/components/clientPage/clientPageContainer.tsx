import React from "react";
import {connect} from 'react-redux';
import * as actions from '../../redux/actionsCreators';
import {logOut} from '../../../authorization/redux/actionsCreators';
import ClientPage from "./clientPage";

import {globalState} from '../../../typesGlobal'
import * as types from '../../clientTypes'  

const mapDispatchToProps = (dispatch) => {
    return {
      getResource:() => {dispatch(actions.getResource())},
      logout: () => {dispatch(logOut())}
    }
};

const mapStateToProps = (state: globalState) => {
    return {
      users: state.client.users
    }
};

const clientPageContainer = connect(mapStateToProps, mapDispatchToProps) (ClientPage)

export default clientPageContainer;