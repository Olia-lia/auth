import {Link,  Outlet} from 'react-router-dom';
import Modal from '../modal/modal';
import {useEffect, useState} from 'react';

// type props = {
//     iisFetchingError: boolean,
//     pageError: any

// }

const Layout = (props) =>{
    const {isFetchingError, pageError, isLoginned, logout} = props;
    const delay = 3000;
     
    const [modalOpened, setModal] = useState(false);

    useEffect(
        () => {
            if(isFetchingError) {
                setModal(true);
                let timer = setTimeout(() => setModal(false), delay);
                return () => {
                    clearTimeout(timer);
                };
            }
        },
        [isFetchingError]
    );


    return(
        <div className='app__body'>
            {modalOpened &&
              <Modal active={modalOpened} setActive={setModal}>
                  {<span>
                      {pageError.errors}
                  </span>} 
              </Modal>
            } 
            <header className='app__header'>
                {isLoginned && 
                    <button onClick={()=> {logout();}}>logout</button>}
               My header
            </header>
            <main className='app__main'><Outlet/></main>
           
            {/* <footer className='app__footer'>My footer</footer> */}
        </div>
      
    );
};
export default Layout;
