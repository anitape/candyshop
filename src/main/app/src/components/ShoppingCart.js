import React, {useEffect, useState} from 'react';
import axios from "axios";
import ShoppingItem from "./ShoppingItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const ShoppingCart = (props, {showAll}) => {
    const { t } = useTranslation();
    const [status2, setStatus2] = useState({showAll});
    const [cart, setCart] = useState([]);
    const cartTable = [];

    /**
     * @function cartChange2
     * Changes the status of showCart state.
     * setShowCart is used to update changed shopping cart when products are removed from the cart.
     * Changes the status of status2 state.
     * setStatus2 is used to update the number of products in shopping cart at the Navigation Bar
     * when deleting products from shopping cart. Then React renders the content that is got
     * from shoppingCart function which exists on App component.
     *
     */
    const cartChange2 = () => {
        setStatus2(!status2);
        console.log('status2 is: ' + status2);
    };

    /**
     *  @function getCart
     * Receives all products that are in shopping cart.
     * The products are sent by back-end in json format.
     * This data is used to show the products on client-side.
     */
    const getCart = () => {
        axios.get('http://localhost:8080/cart')
            .then(response => {
                console.log('promise fulfilled');
                console.log('gerCart() ' + response.data);
                setCart(response.data);
            })
    };

    /**
     * The getCart function runs only after first render.
     */
    useEffect(getCart, []);

    cart.map((cartproduct) => {
        cartTable.push(<ShoppingItem key={cartproduct.id} cartproduct={cartproduct} cartChange2={cartChange2}/>)
    });

    /**
     * @function getTotalSum
     * Counts the total sum of the products in shopping cart.
     */
    const getTotalSum = () => {
        return cart.reduce((sum, { price }) => sum + price, 0).toFixed(2);
    };

    /**
     * The useEffect function runs after each render.
     * This function helps to update the number of shopping cart's items at Navigation Bar.
     */
    useEffect(() => {
        const {showAllChanged} = props;
        showAllChanged(status2);
    });

    useEffect(() => {
        const {bag} = props;
        if (bag.length !== cart.length) {
            getCart();
            console.log("I changed cart");
        }});

    return (
        <div className="cartcontent">
            <h1 className="cartheader">{t('Shopping Cart')}</h1>
            <Container fluid className="cartcontainer">
                <Row>
                    <Col md={8} xs={9}>
                        {cartTable}
                    </Col>
                    <Col md={4} xs={9} className="subtotal">
                        <h3>{t('Subtotal')} ({cart.length} {t('Cproducts')})<br/>{getTotalSum()} €</h3>
                        <Button className="checkout" size="lg" style={{ textDecoration: 'none'}} block>
                            <Link to='/checkout' className="checkout" style={{ textDecoration: 'none', color:'white'}}>{t('Proceed to Checkout')}</Link></Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default ShoppingCart;
