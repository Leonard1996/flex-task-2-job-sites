import React from 'react';
import { Button } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navigation from './componenets/Navigation';
import AddCategory from './componenets/AddCategory';
import AddJobSite from './componenets/AddJobSite';
import JobSiteTable from './componenets/JobSiteTable';
import Footer from './componenets/Footer';

function App() {
  
  return (
    <Router>
      <Navigation/>
      <div>
        
       <Switch>
        <Route  path="/add-category" component={AddCategory}/>
        <Route  path="/add-jobsite" component={AddJobSite}/>
        <Route  path="/" component={JobSiteTable}/>
       
      
       </Switch>
      
       
      </div>
      <Footer />
   </Router>
  );
}

export default App;
