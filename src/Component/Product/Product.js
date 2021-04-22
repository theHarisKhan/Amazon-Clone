import React from 'react'
import './Product.css'
import { useStateValue } from "../ContextAPI/StateProvider"

function Product({id,title,price,image,rating}) {
    const [{ basket }, dispatch] = useStateValue()

    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                price: price,
                image: image,
                rating: rating,
            },
        })
    }

    return (
        <div className="product" key={id}>
            <div className="product__info">
                <p className="product__title">{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_,i) => (   
                        <p>⭐</p>
                    ))}
                </div>
            </div>

            <img src={image} alt="" className="product__img" />
                <button className="addtobasket__btn" onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
