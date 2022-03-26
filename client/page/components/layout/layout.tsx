import {Link, Outlet} from 'react-router-dom';

const Layout = () =>{
    return(
        <div className='page'>
            <header>
                <Link to="/login">login</Link>
            </header>
            <main><Outlet/></main>
            <footer>My App</footer>
        </div>
    
    )
}

export default Layout