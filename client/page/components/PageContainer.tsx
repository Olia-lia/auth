import React from "react";
import {connect} from 'react-redux';
import Layout from './layout/layout';
import { getResourse, fetchAll } from '../../client/redux/actionsCreators';

import {globalState} from '../../typesGlobal';
import {PageState} from '../pageTypes';


const mapStateToProps = (state:globalState) => {
    return {
        isFetchingError: state.page.isFetchingError,
        pageError: state.page.pageError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getResourse: (endpoint: string): void => {dispatch(getResourse(endpoint));},
        getAll: (): void => {dispatch(fetchAll());},
    };
};

const PageContainer = connect(mapStateToProps, mapDispatchToProps) (Layout);

export default PageContainer;
