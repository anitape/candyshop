import React, {useEffect, useState} from 'react';
import '../css/styles.css';
import axios from "axios";
import HalloweenItem from "./HalloweenItem";
import {useTranslation} from "react-i18next";

const Halloween = (props, {showAll1}) => {
    const { t } = useTranslation();
    const [halloweens, setHalloween] = useState([]);
    const halloweenTable = [];

    /**
     * State status1a uses the state that is defined at showAll state
     * in App component.
     */
    const [status1a, setStatus1a] = useState({showAll1});

    /**
     * @function cartChange1a
     * Changes the status of status1 state.
     * This function is used to update the number of products in shopping cart at the Navigation Bar
     * when adding products to shopping cart. Then React renders the content that is got
     * from shoppingCart function which exists on App component.
     *
     */
    const cartChange1a = () => {
        // console.log('cartChange1: before setStatus1(!status1) - ' + status1);
        setStatus1a(!status1a);
        // console.log('cartChange1: after setStatus1(!status1) - ' + status1);
    };

    /**
     * @function getHalloween
     * Receives all products sent by back-end in json format.
     * This data is used to show the products on client-side.
     */
    const getHalloween = () => {
        axios.get('http://localhost:8080/mall2')
            .then(response => {
                console.log('promise fulfilled');
                console.log(response.data);
                setHalloween(response.data);
            })
    };

    /**
     * The getHalloween function runs only after first render.
     */
    useEffect(getHalloween, []);

    halloweens.map((halloween, i) => {
        if(halloween.kategoria === "halloween")
            halloweenTable.push(<HalloweenItem key={halloween.id} halloween={halloween} cartChange1a={cartChange1a}/>)
    });

    /**
     * The useEffect function runs after each render.
     * This function helps to update the number of shopping cart's items at Navigation Bar.
     */
    useEffect(() => {
        //console.log("Status1 is " + status1);
        const {showAllChanged1} = props;
        showAllChanged1(status1a);
    });

    return (
        <div className="model">
            <div className="box">
                <div className="textbox">
                    <h1>{t('Halloween products')}</h1>
                </div>
                <div className="productbox">
                    <div className="catalog">
                        {halloweenTable}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Halloween;
