import React, {useEffect, useState} from 'react';
import './css/styles.css';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Candies from './components/Candies';
import ShoppingCart from "./components/ShoppingCart";
import Halloween from "./components/Halloween";
import Birthday from "./components/Birthday";
import Checkout from "./components/Checkout";
import Confirm from "./components/Confirm";
import ThankYou from "./components/ThankYou";
import axios from "axios";
import cart from './css/cart-icon-orange.png';
import logo from './css/logo1.jpg';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function App() {

    const { t } = useTranslation();
    const [showAll, setAll] = useState(true);
    const [showAll1, setAll1] = useState(true);
    const [showNull, setNull] = useState(true);
    const [bag, setBag] = useState([]);

    /**
     * @function showAllChanged
     * Receives param and uses it to change the status of showAll state.
     * @param status - Status params contains a new status that is going to be used to change the showAll state.
     */
    const showAllChanged = (status) => {
        setAll(status)
    };

    const showEmptyCart = (status) => {
        setNull(status)
    };

    const showAllChanged1 = (status1) => {
        console.log("Status1 is " + status1);
        setAll1(status1);
        console.log("ShowAll1 is " + status1);
    };


    /**
     * @function shoppingCart
     * Receives all products that exists in shopping cart
     * sent by back-end in json format.
     * This data is used to show the number of products in shopping cart on client-side.
     */
    const shoppingCart = () => {
        axios.get('http://localhost:8080/cart')
            .then(response => {
                console.log('promise fulfilled');
                console.log('setBag() App ' + response.data);
                setBag(response.data);
            });
    };

    /**
     * The shoppingCart function runs only after first render.
     */
    useEffect(shoppingCart, []);

    /**
     * The shoppingCart runs each time when showAll status is changed.
     */
    useEffect(() => {
        setTimeout(() =>
            shoppingCart(), 150)}, [showAll]);

    useEffect(shoppingCart, [showAll1]);
    useEffect(shoppingCart, [showNull]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="language"
        >
            <div className="language">{children} &#x25bc;</div>
        </a>
    ));

  return (
    <div>
        <div className="navtop">
            <Container fluid>
                <Row>
                    <Col md={4} className="text-left"><img src={logo} className="logo"/></Col>
                    <Col md={7}>
                        <div className="font"><b>{t('Info')}</b></div>
                        <div>{t('Info2')}</div>
                    </Col>
        <Col md={1} className="text-right">
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
                {t('Select Language')}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage('fi')}>fi</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('en')}>en</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown></Col>
                </Row></Container>
        </div>
        <Navbar expand="lg" className="mainnav">
            <Navbar.Brand href="/"><h1 className="brandtext">{t('Candyshop')}</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title={t('Products')}  id="basic-nav-dropdown" >
                        <NavDropdown.Item href='/candies'>{t('Candies')}</NavDropdown.Item>
                        <NavDropdown.Item href="/birthday">{t('Birthday')}</NavDropdown.Item>
                        <NavDropdown.Item href="/halloween">{t('Halloween')}</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav.Link href="/shoppingbag"><p className="justify-content-end shopbaglink text-right"><img src={cart} className="cart-icon"/>
                    <span className="showbag">{bag.length}</span></p></Nav.Link>
            </Navbar.Collapse>
        </Navbar>
        <hr/>
            <Router>
                <main>
                    <Route path="/shoppingbag" render={() => (<ShoppingCart showAll={showAll} showAllChanged={showAllChanged} bag={bag}/>
                    )} />
                    <Route exact path="/" component={Home} />
                    <Route path="/candies" render={() => (<Candies showAll1={showAll1} showAllChanged1={showAllChanged1} t={t}/>
                    )} />
                    <Route path="/birthday" render={() => (<Birthday showAll1={showAll1} showAllChanged1={showAllChanged1}/>
                    )} />
                    <Route path="/halloween" render={() => (<Halloween showAll1={showAll1} showAllChanged1={showAllChanged1}/>
                    )} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/confirm" render={() => (<Confirm showNull={showNull} showEmptyCart={showEmptyCart} />
                    )} />
                    <Route path="/thankyou" component={ThankYou}/>
                </main>
            </Router>
    </div>
  );
}

export default App;
