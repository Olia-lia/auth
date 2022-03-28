import {useEffect, useState} from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import LoginContainer from './authorization/components/login/loginContainer';
import PageContainer from './page/components/PageContainer'
import ClientPageContainer from './client/components/clientPage/clientPageContainer';


import * as authTypes from './authorization/authTypes';
import * as clientTypes from './client/clientTypes'

import {RequireAuthorization} from './hoc/requireAuthorization'

import 'normalize.css';
import './style.sass';



const App: React.FC = (props) => {


  return (
      <div>
       
  
          <Routes>
            <Route path='/' element={<PageContainer/>}>
              <Route path='/login' element = {
                <LoginContainer/>}/>
              <Route path='/user' element={
               <RequireAuthorization>

                  <ClientPageContainer/>
           
                </RequireAuthorization>
              }/>
            </Route>    
          </Routes>
         
      
      </div>
  )
}

export default App;