import React from 'react'
import { useStateValue } from '../ContextAPI/StateProvider'
import './Checkout.css'

function CheckoutProduct({id,image,title,price,rating}) {
    const [{ basket }, dispatch] = useStateValue()

    const RemoveFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    return (
        <div className="checkoutProduct" key={id}>

            <img src={image} className="checkout__img" alt=""/>

            <div className="checkoutProduct__info">
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

                <button className="removefrombasket__btn" onClick={RemoveFromBasket}>Remove to Basket</button>
            </div>

        </div>
    )
}

export default CheckoutProduct
