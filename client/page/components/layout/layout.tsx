import {Link, NavLink, Outlet} from 'react-router-dom';
import Modal from '../modal/modal';
import {useEffect, useState} from 'react';

const Layout = (props) =>{
    const {isFetchingError, pageError, getResourse, getAll} = props;
    const delay = 3000;
     
    const [modalOpened, setModal] = useState(false);

    useEffect(
        () => {
            if(isFetchingError) {
                setModal(true);
                let timer = setTimeout(() => setModal(false), delay)
                return () => {
                    clearTimeout(timer);
                };
            }
        },
        [isFetchingError]
    );

    return(
        <div className='page__body'>
            <header>
                <ul className='nav__list'>
                    <li>
                        <Link to="/user">user</Link>
                    </li>

                    <button onClick={()=>{getResourse('users');}}>getResousce</button>
                    <button onClick={()=>{getAll();}}>getAll</button>
                </ul>
            </header>
            <main className='page__main'><Outlet/></main>
            {/* <footer>My App</footer> */}

            {modalOpened &&
              <Modal active={modalOpened} setActive={setModal}>
                  {<span>
                      {pageError.errors}
                  </span>} 
              </Modal>
            } 
        </div>
      
    );
};
export default Layout;
