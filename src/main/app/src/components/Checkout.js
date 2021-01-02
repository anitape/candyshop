import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";

const Checkout = () => {
    const { t } = useTranslation();
    const [newNote, setNewNote] = useState({fname: '', lname: '', street: '', postcode: '', city: '',  email: '', phone: ''});

    const checkNote = event => {
        console.log("Delivery Information is " + newNote);
    };

    const handleNoteChange = event => {
        const { name, value } = event.target;
        setNewNote(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    return (
        <div className="checkbox">
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <br/>
                        <Container>
                            <Row>
                                <Col>
                        <h1 className="header">{t('Checkout')}</h1>
                                </Col>
                                <Col>
                                    <h1 className="header text-right">1/2</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Form className="contactfm" onSubmit={checkNote}>
                            <h3>{t('Delivery Information')}</h3>
                            <hr/>
                            <br/>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>{t('First Name')}</Form.Label>
                                    <Form.Control type="text" className="form-control" name="fname" onInput={handleNoteChange}
                                                  placeholder={t('First Name')} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>{t('Last Name')}</Form.Label>
                                    <Form.Control type="text" className="form-control" name="lname" onInput={handleNoteChange}
                                                  placeholder={t('Last Name')}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group>
                                <Form.Label>{t('Street')}</Form.Label>
                                <Form.Control type="text" className="form-control" name="street" onInput={handleNoteChange}
                                       placeholder={t('Street')}/>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>{t('Postcode')}</Form.Label>
                                    <Form.Control type="text" className="form-control" name="postcode" onInput={handleNoteChange}
                                                  placeholder={t('Postcode')} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>{t('City')}</Form.Label>
                                    <Form.Control type="text" className="form-control" name="city" onInput={handleNoteChange}
                                                  placeholder={t('City')}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>{t('Email')}</Form.Label>
                                    <Form.Control type="text" className="form-control" name="email" onInput={handleNoteChange}
                                                  placeholder={t('Email')} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>{t('Phone Number')}</Form.Label>
                                    <Form.Control type="text" className="form-control" name="phone" onInput={handleNoteChange}
                                                  placeholder={t('Phone Number')}/>
                                </Form.Group>
                            </Form.Row>
                            <Button className="btn btn-info" type="submit"><Link to={{pathname: "/confirm", state: newNote}} style={{ textDecoration: 'none', color: 'white' }}>{t('Submit')}</Link></Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Checkout;

