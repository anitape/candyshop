import React, {useEffect, useState} from 'react';
import '../css/styles.css';
import axios from "axios";
import CandyItem from "./CandyItem";
import { useTranslation } from 'react-i18next';

const Candies = (props, {showAll1}) => {
    const { t } = useTranslation();
    /**
     * State status1 uses the state that is defined at showAll state
     * in App component.
     */
    const [status1, setStatus1] = useState({showAll1});
    const [candies, setCandies] = useState([]);
    const candyTable = [];

    /**
     * @function cartChange1
     * Changes the status of status1 state.
     * This function is used to update the number of products in shopping cart at the Navigation Bar
     * when adding products to shopping cart. Then React renders the content that is got
     * from shoppingCart function which exists on App component.
     *
     */
    const cartChange1 = () => {
       // console.log('cartChange1: before setStatus1(!status1) - ' + status1);
        setStatus1(!status1);
       // console.log('cartChange1: after setStatus1(!status1) - ' + status1);
    };

    /**
     * @function getCandies
     * Receives all products sent by back-end in json format.
     * This data is used to show the products on client-side.
     */
    const getCandies = () => {
        axios.get('http://localhost:8080/mall2')
            .then(response => {
                console.log('promise fulfilled');
                console.log(response.data);
                setCandies(response.data);
            })
    };

    /**
     * The getCandies function runs only after first render.
     */
    useEffect(getCandies, []);

    candies.map((candy, i) => {
        if(candy.kategoria === "candies")
            candyTable.push(<CandyItem key={candy.id} candy={candy} cartChange1={cartChange1}/>)
    });

    /**
     * The useEffect function runs after each render.
     * This function helps to update the number of shopping cart's items at Navigation Bar.
     */
    useEffect(() => {
        //console.log("Status1 is " + status1);
        const {showAllChanged1} = props;
        showAllChanged1(status1);
    });

    return (
        <div className="model">
            <div className="box">
                <div className="textbox">
                    <h1>{t('Candies')}</h1>
                </div>
                <div className="productbox">
                     <div className="catalog">
                         {candyTable}
                     </div>
                </div>
            </div>
         </div>
    )
};

export default Candies;
