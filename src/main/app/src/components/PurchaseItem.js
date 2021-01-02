import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PurchaseItem = (props) => {
    const name = props.order.name;
    const price = props.order.price;

    return(
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <div>{name}</div>
                    </Col>
                    <Col>
                        <div>{price} €</div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default PurchaseItem;