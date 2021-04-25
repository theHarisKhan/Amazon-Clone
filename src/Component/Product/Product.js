import React from 'react'
import './Product.css'
import { useStateValue } from "../ContextAPI/StateProvider"

function Product({id,title,price,image,rating,ShortIt}) {
    const [{ basket }, dispatch] = useStateValue()

    const truncate = (str,n) => {
        return str?.length > n ? str.substr(0,n-1) + "..." : str
    }

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

            <img src={image} alt="" className="product__img" />

            <div className="product__info">
                <p className="product__title">{ShortIt ? truncate(title,32) : title}</p>
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
            
            <button className="addtobasket__btn" onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
