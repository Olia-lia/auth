import {Route, Routes, Link} from 'react-router-dom';


import LoginContainer from './authorization/components/login/loginContainer';
import PageContainer from './page/components/PageContainer';
import AuthClientPageContainer from './client/components/clientPage/clientPageContainer';
import NotFoundPage from './page/components/notFoundPage/notFoundPage';


import * as authTypes from './authorization/authTypes';
import * as clientTypes from './client/clientTypes';


import 'normalize.css';
import './style.sass';


const App: React.FC = (props) => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<PageContainer/>}>
                    <Route path='/' element = {
                        <LoginContainer/>}/>
                    <Route path='/user' element={
                        <AuthClientPageContainer/>
                    }/>
                    <Route path='*' element={
                        <NotFoundPage/>}/>
                </Route>    
            </Routes>
        </div>
    );
};

export default App;