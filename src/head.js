// Head.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './head.css';
import lg from './lg.jpg';

function Head() {
    return (
        <>
        <header>
        <nav className="bg-dark-subtle navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
         <div id='item'>   <img src={lg} alt="Logo" id='lg' className="d-inline-block align-text-top" />
            <span className='navbar-text'>Noureddine P-R</span>
            </div></a>
        </div>
      </nav>
      </header>
        </>
    );
}

export default Head;
