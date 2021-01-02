import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import leftimg from "../css/candies-5.jpg";
import rightimg from "../css/halloween-1.jpg";
import centerimg from "../css/birthday-2.jpg";
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    return (
        <div className="main">
        <div className="site">
            <div className="homepage">
                <Container>
                    <Row>
                        <Col xs={5}><h1 className="maintitle">{t('Welcome to Candyshop!')}</h1></Col>
                        <Col xs={12}>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
                <br/>
            <Container fluid>
                <Row>
                    <Col>
                        <Card className="leftcard">
                            <Card.Img  src={leftimg} variant="top"  />
                            <Card.Body>
                                <Card.Title>{t('Candies')}</Card.Title>
                                <Card.Text>
                                    {t('Candies Introduction')}
                                </Card.Text>
                                <Button className="addtocart">{t('Shop Now')}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="centercard">
                            <Card.Img variant="top" src={centerimg} />
                            <Card.Body>
                                <Card.Title>{t('Birthday Party')}</Card.Title>
                                <Card.Text>
                                    {t('Birthday Introduction')}
                                </Card.Text>
                                <Button className="addtocart">{t('Shop Now')}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="rightcard">
                            <Card.Img variant="top" src={rightimg} />
                            <Card.Body>
                                <Card.Title>{t('Halloween Party')}</Card.Title>
                                <Card.Text>
                                    {t('Halloween Introduction')}
                                </Card.Text>
                                <Button className="addtocart">{t('Shop Now')}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
                <br/><br/>
            </div>
        </div>
            <div className="navbar navbar-inverse navbar-fixed-bottom footer">
                <div className="container">
                    <p className="navbar-text">{t('Candyshop')}© 2020 </p>
                </div>
            </div>
        </div>
    )
}

export default Home;