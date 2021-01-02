import React, {useState} from 'react'
import Image from "react-bootstrap/Image";
import noteService from "./ProductService";
import { useTranslation } from 'react-i18next';

const HalloweenItem = (props) => {
    const { t } = useTranslation();
    const [notes1, setNotes1] = useState([]);
    const name = props.halloween.nimi;
    const price = props.halloween.hinta;
    const img = props.halloween.kuva;
    const halloween = props.halloween;

    /**
     * @function addProduct
     * Add a product to shopping cart.
     * @param {addProduct} {halloween} - The halloween contains all information of selected product.
     */
    const addProduct = ({halloween}) => {
        const rand = (Math.floor(1 + Math.random() * (1000000-1)));
        console.log("Rand is " + rand);
        const carthalloween = {tunnus: {halloween}.halloween.id, name: {halloween}.halloween.nimi, price: {halloween}.halloween.hinta, image: {halloween}.halloween.kuva, id: rand};
        console.log("Adding product to cart" + carthalloween);
        noteService
            .create(carthalloween)
            .then(returnedNote => {
                setNotes1(notes1.concat(returnedNote));
                console.log("notes are " + notes1);
            });
        const {cartChange1a} = props;
        setTimeout(() => {cartChange1a();}, 70);
    };

    return (
        <div className="article">
            <Image src={img} className="img"/>
            <div className="info">
                <div className="title">{name}</div>
                <div className="price">{price} €</div>
            </div>
            <button className="addtocart" onClick={() => addProduct({halloween})}>{t('Add')}</button>
        </div>
    )
}

export default HalloweenItem;