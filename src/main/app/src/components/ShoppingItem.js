import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import noteService from './ProductService';
import {useTranslation} from "react-i18next";

const ShoppingItem = (props) => {
    const { t } = useTranslation();
    const id = props.cartproduct.id;
    const name = props.cartproduct.name;
    const price = props.cartproduct.price;
    const img = props.cartproduct.image;

    /**
     * @function removeProduct
     * Removes selected product from shopping cart.
     */
    const removeProduct = () => {
        noteService
            .remove(id);
        console.log("I deleted the product which id is " + id);
        const {cartChange2} = props;
        cartChange2();
    };

    return (
        <div className="cartitem">
            <Container fluid>
                <Row>
                    <Col>
                         <Image src={img} className="cartimg"/>
                    </Col>
                    <Col>
                        <div>{name}</div>
                        <div>{price} €</div>
                        <button className="addtocart" onClick={removeProduct}>{t('Delete')}</button>
                    </Col>
                </Row>
            </Container>
        </div>
)};

export default ShoppingItem;
