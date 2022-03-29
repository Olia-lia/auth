import {Link, NavLink, Outlet} from 'react-router-dom';
import Modal from '../modal/modal';
import {useState} from 'react';

const Layout = (props) =>{
    const {isFetchingError, pageError, getResource} = props
     
  const [modalOpened, setModal] = useState(true)

    return(
        <div className='page__body'>
            <header>
              <ul>
                <li>
                  <Link to="/login">login</Link>
                </li>
                <li>
                  <Link to="/user">user</Link>
                </li>

                <button onClick={()=>{getResource('users')}}>getResousce</button>
              </ul>
            </header>
            <main className='page__main'><Outlet/></main>
            {/* <footer>My App</footer> */}

          {isFetchingError &&
            <Modal active={modalOpened} setActive={setModal}>
              {<span>
                {pageError.errors}
              </span>} 
            </Modal>
          } 
        </div>
    
    )
}

export default Layout