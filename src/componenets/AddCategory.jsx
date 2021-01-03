import React, { useRef, useState, useEffect} from 'react';
import { db } from '../firebase';
import { Card, Button, Form, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const AddCategory = props => {

    const nameRef = useRef(null);
    const quantityRef = useRef(null);
    const descriptionRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [submited, setSubmited] = useState(false)
   
    useEffect(()=> {
        if (loading){
            const id = uuidv4();
        db.collection('categories').doc(id).set({
            name:nameRef.current.value,
            quantity:parseFloat(quantityRef.current.value),
            description:descriptionRef.current.value
        }).then(resp => {
            setLoading(false);
            setSubmited(true);
            setTimeout(()=>{
                setSubmited(false);
            },2000);
        })
        .catch(err => alert(err));

        }
        
    }, [loading])

    const handleSubmit = e => {
        e.preventDefault();
        if (!nameRef.current.value || !quantityRef.current.value || !descriptionRef.current.value){
            setError(true);
          setTimeout(()=>{
            setError(false);
          }, 2000) 
        } else {
            setLoading(true);
        }
        
        
        
    }
    return (

        <Container className="my-4 margin-leo">

            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Header>Add a new category</Card.Header>
                        <Card.Body>
                            {/* <Card.Title>Input category data</Card.Title> */}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicText">
                                    <Form.Label className="pl-2">Category name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter category name"   ref={nameRef}/>

                                </Form.Group>

                                <Form.Group controlId="formBasicNumber">
                                    <Form.Label className="pl-2">Quantity</Form.Label>
                                    <Form.Control type="number" placeholder="Quantity"  ref={quantityRef}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicTextarea">
                                    <Form.Label className="pl-2">Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Description" ref={descriptionRef}/>
                                </Form.Group>
                              
                                 {
                                     loading? <Spinner variant="primary" animation="border" /> :   <Button variant="outline-primary" type="submit">
                                    Submit
                                 </Button>
                                 }
                               
                            </Form>
                            {
                                     error? <Alert variant="danger" className="my-4">One or more fields are empty!</Alert>: null
                                 }
                                 {
                                     submited? <Alert variant="primary" className="my-4">Category added successfully</Alert> : null
                                 }

                          
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>



    );

}

export default AddCategory;