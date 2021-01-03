import React, { useState, useEeffect, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {db} from '../firebase';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Skeleton from 'react-loading-skeleton';

const CategoryDetails = props => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setData([]);
        setLoading(true);
        const categories = [];
        db.collection('categories').where('name', '==', props.match.params.category).get()
        .then(res => res.docs.map((doc,_i) => setData(prevData => {
            setLoading(false);
            return [
                ...prevData,
                {
                    id: _i+1,
                    description:doc.data().description,
                    quantity: doc.data().quantity
                    
                }
            ];
        })));
       

       

    },[props.match.params.category])

    const columns = [{
        dataField: 'id',
        text: 'ID',
        sort: true
      }, {
        dataField: 'description',
        text: 'Description',
        sort: true
      }, {
        dataField: 'quantity',
        text: 'Quantity',
        sort: true
      }];

      const pagination = paginationFactory({
        sizePerPage: 5,
        hideSizePerPage: true,
      });
    return (
        <div className="my-4">
            {
                !loading? <BootstrapTable keyField='id' data={ data } columns={ columns }  
                pagination={ pagination } />
                : <Skeleton count={6} height={45}/>
            }
        </div>
    );
}

export default withRouter(CategoryDetails);