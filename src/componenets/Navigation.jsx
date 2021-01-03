import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

const Navigation = props => {
    return (
     
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="shadow-t" >
          
           <div className="container">
           <div className="d-flex align-items-center">
           <span className="mr-3 logo-img">
           <img className="header-logo" src="/job-seeker.svg" alt="Logo" />
           </span>
          <Link to ="/"><Navbar.Brand href="/">Job Sites</Navbar.Brand></Link> 
           </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav activeKey={props.location.pathname} className="mr-auto">
                <Link to="/add-jobsite"><Nav.Link href="/add-jobsite">Add Job Site</Nav.Link></Link>
                <Link to="/add-category"><Nav.Link href="/add-category">Add New Category</Nav.Link></Link>
                <Link to="/"><Nav.Link href="/">View Job Sites</Nav.Link></Link>
            </Nav>
  </Navbar.Collapse>
  </div>
</Navbar>
    );
    
}

export default withRouter(Navigation);