import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import  { ButtonGroup, Button } from 'react-bootstrap';
import { withRouter, Route } from 'react-router-dom';
import { db } from '../firebase';
import CategoryDetails from './CategoryDetails';

const CategoryTable = props => {
    const [categories, setCategories] = useState([]);
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
     
        db.collection('job_sites').where('name', '==', props.match.params.name).limit(1).get().
        then(res => res.docs.map(doc => 
            {
                setCategories([...doc.data().categories]);
                setLoading(false);
            }
            ))
        .catch(err => {
            setLoading(false);
            alert(err);
        });
       
    }, [props])

    const handleClick = e => {
        
  
       props.history.push(`${props.match.url}/${e.target.innerText}`);
    }


    const buttons = categories.map((category, _i) =>  <Button onClick={handleClick} key={_i} variant="outline-secondary">{category}</Button>);
    const buttonGroup = <ButtonGroup>{buttons}</ButtonGroup>
   
    return(
       
        <div className="container">
            <div className="row">
                <div className="col">
                {
                 !loading? buttonGroup : <Skeleton height={38} />
                }
                </div>

            </div>
            <div className="row">
                <div className="col">
                   
                    <Route exact path={`${props.match.path}/:category`} component={CategoryDetails}/>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(CategoryTable);