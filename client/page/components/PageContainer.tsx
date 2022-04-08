import React from "react";
import {connect} from 'react-redux';
import Layout from './layout/layout';
import { fetchRequest, fetchRequests } from '../../client/redux/actionsCreators';
import {logOut} from '../../authorization/redux/actionsCreators';
import {globalState} from '../../typesGlobal';

const mapStateToProps = (state:globalState) => {
    return {
        isFetchingError: state.page.isFetchingError,
        pageError: state.page.pageError,
        isLogined: state.login.isLoginned,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //getResourse: (endpoint: string): void => {dispatch(fetchRequest()));},
        fetchRequests: (): void => {dispatch(fetchRequests());},
        logout: () => {dispatch(logOut());}
    };
};

const PageContainer = connect(mapStateToProps, mapDispatchToProps) (Layout);

export default PageContainer;
