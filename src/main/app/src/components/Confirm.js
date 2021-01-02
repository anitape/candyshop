import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from "axios";
import PurchaseItem from "./PurchaseItem";
import noteService from "./ProductService";
import {useTranslation} from "react-i18next";

const Confirm = (props, {showNull}) => {
    const { t } = useTranslation();
    const [status3, setStatus3] = useState({showNull});
    const [purchase, setPurchase] = useState([]);
    const purchaseTable = [];
    let location = useLocation();
    let history = useHistory();

    /**
     * @function cartChange3
     * Changes the status of status3 state.
     * setStatus3 is used to update the number of products in shopping cart at the Navigation Bar
     * when client confirms the order. Then React renders the content that is got
     * from shoppingCart function which exists on App component.
     *
     */
    const cartChange3 = () => {
        console.log("showAll is " + {showNull});
        console.log('cartChange3: before setStatus3(!status3) - ' + status3);
        setStatus3(!status3);
        console.log('cartChange3: before setStatus3(!status3) - ' + status3);
    };


    /**
     *  @function getOrder
     * Shows all products that client is going to order.
     * The products are sent by back-end in json format.
     * This data is used to show the products on client-side.
     */
    const getOrder = () => {
        axios.get('http://localhost:8080/cart')
            .then(response => {
                console.log('promise fulfilled');
                console.log(response.data);
                setPurchase(response.data);
            });
    };

    /**
     * The getOrder function runs only after first render.
     */
    useEffect(getOrder, []);

    /**
     * The cartChane3 function runs one time after first render.
     */
    useEffect(cartChange3, []);

    /**
     * The useEffect function runs after each render.
     * This function helps to update the number of shopping cart's items at Navigation Bar.
     */
    useEffect(() => {
        console.log("Status3 is " + status3);
        const {showEmptyCart} = props;
        showEmptyCart(status3);
    });

    purchase.map((order, i) => {
        purchaseTable.push(<PurchaseItem key={order.id} order={order}/>);
    });

    /**
     * @function emptyAll
     * Removes all products from shopping cart.
     * Updates status of Shopping Cart at Navigation Bar.
     * The it waits when all products are removed and the status is changed.
     * After that it redirect the page to view of ThankYou component.
     */
    const emptyAll = () => {
        noteService.removeAll();
        console.log("I removed all");
        cartChange3();
        setTimeout(() => {
            history.push("/thankyou");
        }, 100);
    };

    /**
     * @function getTotalSum
     * Counts the total sum of the products in shopping cart.
     */
    const getTotalSum = () => {
        return purchase.reduce((sum, { price }) => sum + price, 0).toFixed(2);
    };

    return(
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
                                    <h1 className="header text-right">2/2</h1>
                                </Col>
                            </Row>
                        </Container>
                        <hr/>
                        <h6>{t('Order')} ({purchase.length} {t('Cproducts')})</h6>
                        {purchaseTable}
                        <br/>
                        <h6>{t('Subtotal')} {getTotalSum()} €</h6>
                        <hr/>
                        <h6>{t('Delivery Information')}</h6>
                        <div>{location.state.fname} {location.state.lname}</div>
                        <div>{location.state.street}</div>
                        <div>{location.state.postcode} {location.state.city}</div>
                        <div>{t('Email')}: {location.state.email}</div>
                        <div>{location.state.phone}</div>
                        <br/>
                        <h6>{t('Payment Method')}</h6>
                        <div>{t('Invoice')}</div>
                        <br/>
                        <Button variant="info" onClick={emptyAll}>{t('Confirm')}</Button>
                        <Button variant="link"><Link to="/checkout">{t('Go Back')}</Link></Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Confirm;