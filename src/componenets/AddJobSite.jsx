import React, { useState, useEffect, useRef } from 'react';
import { Form, Container, Row, Col, Button, Card, Spinner, Alert } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import { db } from '../firebase';
import './Autosuggest.css';
import { v4 as uuidv4 } from 'uuid';


const AddJobSite = props => {
    const [categories, setCategories] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState("");
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [submited, setSubmited] = useState(false);
    const nameRef = useRef(null);
    const pmRef = useRef(null);

    useEffect(() => {
        db.collection('categories').get().then(resp => {
            resp.docs.forEach(doc => setCategories(prevCat => {
                return [
                    ...prevCat,
                    doc.data().name
                ];
            }));
            setCategories(prevCat => [...new Set(prevCat)]);
        }).catch(err => console.log(err));
    }, [])


    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : categories.filter(cat =>
            cat.toLowerCase().includes(value)
        );
    };

    const getSuggestionValue = suggestion => suggestion;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion}
        </div>
    );

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value))
    };

    const handleChange = (e, { newValue }) => {
        setValue(newValue);
    }
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Type a category name',
        value,
        onChange: handleChange
    };

    function onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, enter }) {
        if (values.indexOf(suggestion) === -1)
            setValues(prevVal => {
                return [
                    ...prevVal,
                    suggestion
                ]
            })

    }


    useEffect(() => {
        if (loading) {
            const id = uuidv4();
            db.collection('job_sites').doc(id).set({
                name: nameRef.current.value,
                pm: pmRef.current.value,
                categories: [...values]
            }).then(resp => {
                setLoading(false);
                setSubmited(true);
                setTimeout(() => {
                    setSubmited(false);
                }, 2000);
            })
                .catch(err => alert(err));

        }

    }, [loading])

    const handleSubmit = e => {
        e.preventDefault();
        if (!nameRef.current.value || !pmRef.current.value || values.length===0) {
          
            setError(true);
            setTimeout(() => {
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
                        <Card.Header>Add a new job site</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Col>
                                        <Form.Label className="pl-3">Job site name</Form.Label>
                                        <Form.Control placeholder="Name" type="text" ref={nameRef} />
                                    </Col>
                                </Form.Row>
                                <Form.Row className="my-4">
                                    <Col sm={12} md={6}>
                                        <Form.Label className="pl-3">Category</Form.Label>

                                        <Autosuggest
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                                            getSuggestionValue={getSuggestionValue}
                                            renderSuggestion={renderSuggestion}
                                            inputProps={inputProps}
                                            onSuggestionSelected={onSuggestionSelected}
                                        />
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                            <Form.Label className="pl-2">PM</Form.Label>
                                            <Form.Control as="select" custom ref={pmRef}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        {
                                            values.map((value, _id) => <Button key={_id} className="m-2" variant="primary">{value}</Button>)
                                        }
                                    </Col>
                                    <Col>
                                    <Form.Row className="my-2 test">
                                    <Col className="d-flex justify-content-end">
                                        {
                                            loading ? <Spinner variant="primary" animation="border" /> : <Button variant="outline-primary" type="submit">
                                                Submit
                                 </Button>
                                        }
                                    </Col>
                                </Form.Row>
                                    </Col>
                                </Form.Row>
                                
                                <Form.Row>
                                    <Col>

                                        {
                                            error ? <Alert variant="danger" className="my-4">One or more fields are empty!</Alert> : null
                                        }
                                        {
                                            submited ? <Alert variant="primary" className="my-4">Category added successfully</Alert> : null
                                        }
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
    );
}

export default AddJobSite;