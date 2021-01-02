import React, {useEffect, useState} from 'react';
import '../css/styles.css';
import axios from "axios";
import BirthdayItem from "./BirthdayItem";
import {useTranslation} from "react-i18next";


const Birthday = (props, {showAll1}) => {
    const { t } = useTranslation();
    const [birthdays, setBirthday] = useState([]);
    const birthdayTable = [];

    /**
     * State status1b uses the state that is defined at showAll state
     * in App component.
     */
    const [status1b, setStatus1b] = useState({showAll1});

    /**
     * @function cartChange1b
     * Changes the status of status1 state.
     * This function is used to update the number of products in shopping cart at the Navigation Bar
     * when adding products to shopping cart. Then React renders the content that is got
     * from shoppingCart function which exists on App component.
     *
     */
    const cartChange1b = () => {
        // console.log('cartChange1: before setStatus1(!status1) - ' + status1);
        setStatus1b(!status1b);
        // console.log('cartChange1: after setStatus1(!status1) - ' + status1);
    };

    /**
     * @function getBirthday
     * Receives all products sent by back-end in json format.
     * This data is used to show the products on client-side.
     */
    const getBirthday = () => {
        axios.get('http://localhost:8080/mall2')
            .then(response => {
                console.log('promise fulfilled');
                console.log(response.data);
                setBirthday(response.data);
            })
    };

    /**
     * The getBirthday function runs only after first render.
     */
    useEffect(getBirthday, []);

    birthdays.map((birthday, i) => {
        if(birthday.kategoria === "birthday")
            birthdayTable.push(<BirthdayItem key={birthday.id} birthday={birthday} cartChange1b={cartChange1b}/>)
    });

    /**
     * The useEffect function runs after each render.
     * This function helps to update the number of shopping cart's items at Navigation Bar.
     */
    useEffect(() => {
        //console.log("Status1 is " + status1);
        const {showAllChanged1} = props;
        showAllChanged1(status1b);
    });

    return (
        <div className="model">
            <div className="box">
                <div className="textbox">
                    <h1>{t('Birthday products')}</h1>
                </div>
                <div className="productbox">
                    <div className="catalog">
                        {birthdayTable}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Birthday;