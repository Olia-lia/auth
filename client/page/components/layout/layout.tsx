import {Link, Outlet} from 'react-router-dom';
import Modal from '../modal/modal';
import {useState} from 'react';

const Layout = (props) =>{
    const {isFetchingError, pageError} = props
     
  const [modalOpened, setModal] = useState(true)

    return(
        <div className='page__body'>
            <header>
                <Link to="/login">login</Link>
                <Link to="/user">user</Link>
            </header>
            <main><Outlet/></main>
            <footer>My App</footer>

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