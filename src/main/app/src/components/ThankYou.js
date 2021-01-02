import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";

const ThankYou = () => {
    const { t } = useTranslation();
    return(
        <div className="checkbox">
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 2 }}>
                        <br/>
                        <h2 className="header">{t('Thank You')}</h2>
                        <div className="text-justify">{t('Thank You Info')}</div>
                        <br/><br/>
                        <Button variant="info"><Link to="/" style={{ textDecoration: 'none', color: 'white' }}>{t('Go to Homepage')}</Link></Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default ThankYou;