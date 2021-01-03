import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { db } from '../firebase';
import CategoryTable from './CategoryTable';
import { Route } from 'react-router-dom';

import 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const JobSiteTable = (props) => {
  
    

    const [rowData, setRowData] = useState([]);

    

    function LinkComponent(props) {
       
        return (
          <Link to={"/"+props.value}>
            {props.value}
          </Link>
        );
      }
      

    useEffect(()=> {
        db.collection('job_sites').get().then(res => res.docs.map(doc=> setRowData(prevRowData => {
            return [
                ...prevRowData,
                {
                    name: doc.data().name,
                    status: Math.random() > 0.5? 'Active':'Pending'
                }
            ]
        })))
    }, [])


   const columnDefs = [
        {
          headerName: "Name",
          field: "name",
          width: 200,
          cellRenderer: "LinkComponent",
          resizable: true,
          flex:3,
          rowDrag: true,
        },
        {
          headerName: "Status",
          field: "status",
          width: 100,
          resizable: true,
          flex:1,
      
         
        }
    ]
    return (
      <div className="container">
        <div className="row my-4">
          <div className="ag-theme-alpine my-4 margin-leo col-lg-4 theme-job" >
            <AgGridReact
               
                rowData={rowData}
                rowDragManaged={true}
                 columnDefs={columnDefs}
                  frameworkComponents={{
                    LinkComponent
                  }}>
                <AgGridColumn onClick={()=> console.log('hello')} rowDrag={true} field="name"></AgGridColumn>
                <AgGridColumn field="status"></AgGridColumn>
            </AgGridReact>
            
        </div>
        <div className="col-lg-8 my-4 side-job">

         <Route   path="/:name" component={CategoryTable}/>
        </div>
      </div>
      </div>
      
      
       
   
       
    );
};

export default withRouter(JobSiteTable);