import React from "react";
import {connect} from 'react-redux';
import Layout from './layout/layout';
import { getResource } from '../../client/redux/actionsCreators';

import {globalState} from '../../typesGlobal'
import {PageState} from '../pageTypes'


const mapStateToProps = (state:globalState) => {
  return {
      isFetchingError: state.page.isFetchingError,
      pageError: state.page.pageError,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getResource: (endpoint: string): void => {dispatch(getResource(endpoint))},
  }
};

const PageContainer = connect(mapStateToProps, mapDispatchToProps) (Layout)

export default PageContainer;
