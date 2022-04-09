import {Link,  Outlet} from 'react-router-dom';
import Modal from '../modal/modal';
import {useEffect, useState} from 'react';

// type props = {
//     iisFetchingError: boolean,
//     pageError: any

// }

const Layout = (props) =>{
    const {isFetchingError, pageError, fetchRequests} = props;
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
                    {      /* 
                    //<button onClick={()=>{getResourse('users');}}>getResousce</button> */}
                    <button onClick={()=>{fetchRequests();}}>getAll</button>
                </ul>
            </header>
            <main className='page__main'><Outlet/></main>
            {modalOpened &&
              <Modal active={modalOpened} setActive={setModal}>
                  {<span>
                      {pageError.errors}
                  </span>} 
              </Modal>
            } 
            <footer className='page__footer'>My App</footer>

          
        </div>
      
    );
};
export default Layout;
