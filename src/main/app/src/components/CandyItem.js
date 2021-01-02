import React, {useState} from 'react'
import Image from "react-bootstrap/Image";
import noteService from './ProductService';
import { useTranslation } from 'react-i18next';

const CandyItem = (props) => {
    const { t } = useTranslation();
    const [notes, setNotes] = useState([]);
    const name = props.candy.nimi;
    const price = props.candy.hinta;
    const img = props.candy.kuva;
    const candy = props.candy;


    /**
     * @function addProduct
     * Add a product to shopping cart.
     * @param {addProduct} {candy} - The candy contains all information of selected product.
     */
    const addProduct = ({candy}) => {
        const rand = (Math.floor(1 + Math.random() * (1000000-1)));
        console.log("Rand is " + rand);
        const cartcandy = {tunnus: {candy}.candy.id, name: {candy}.candy.nimi, price: {candy}.candy.hinta, image: {candy}.candy.kuva, id: rand};
        console.log("Adding product to cart" + cartcandy);
        noteService
            .create(cartcandy)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
                console.log("notes are " +notes);
            });
        const {cartChange1} = props;
        setTimeout(() => {cartChange1();}, 70);
     };

    return (
        <div className="article">
            <Image src={img} className="img"/>
            <div className="info">
                <div className="title">{name}</div>
                <div className="price">{price} €</div>
            </div>
            <button className="addtocart" onClick={() => addProduct({candy})}>{t('Add')}</button>
        </div>
    )
};

export default CandyItem;
