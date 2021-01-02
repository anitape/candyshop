import React, {useState} from 'react'
import Image from "react-bootstrap/Image";
import noteService from "./ProductService";
import { useTranslation } from 'react-i18next';

const BirthdayItem = (props) => {
    const { t } = useTranslation();
    const [notes2, setNotes2] = useState([]);
    const name = props.birthday.nimi;
    const price = props.birthday.hinta;
    const img = props.birthday.kuva;
    const birthday = props.birthday;

    /**
     * @function addProduct
     * Add a product to shopping cart.
     * @param {addProduct} {birthday} - The birthday contains all information of selected product.
     */
    const addProduct = ({birthday}) => {
        const rand = (Math.floor(1 + Math.random() * (1000000-1)));
        console.log("Rand is " + rand);
        const cartbirthday = {tunnus: {birthday}.birthday.id, name: {birthday}.birthday.nimi, price: {birthday}.birthday.hinta, image: {birthday}.birthday.kuva, id: rand};
        console.log("Adding product to cart" + cartbirthday);
        noteService
            .create(cartbirthday)
            .then(returnedNote => {
                setNotes2(notes2.concat(returnedNote));
                console.log("notes are " + notes2);
            });
         const {cartChange1b} = props;
         setTimeout(() => {cartChange1b();}, 70);
    };

    return (
        <div className="article">
            <Image src={img} className="img"/>
            <div className="info">
                <div className="title">{name}</div>
                <div className="price">{price} €</div>
            </div>
            <button className="addtocart" onClick={() => addProduct({birthday})}>{t('Add')}</button>
        </div>
    )
}

export default BirthdayItem;