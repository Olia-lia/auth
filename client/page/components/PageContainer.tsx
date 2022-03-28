import React from "react";
import {connect} from 'react-redux';
import Layout from './layout/layout'

import {globalState} from '../../typesGlobal'
import {PageState} from '../pageTypes'


  const mapStateToProps = (state:globalState) => {
    return {
        isFetchingError: state.page.isFetchingError,
        pageError: state.page.pageError,
    }
};

const PageContainer = connect(mapStateToProps, null) (Layout)

export default PageContainer;
