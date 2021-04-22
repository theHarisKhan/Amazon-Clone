import React from 'react'
import { useStateValue } from '../ContextAPI/StateProvider'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import SubTotal from './SubTotal'

function Checkout() {
    const [{ basket }, dispatch] = useStateValue()

    return (
        <div className="checkout">

            <div className="checkout__left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" className="checkout__ad"/>

                <div>
                    <h2 className="checkout__title">Your Shopping Basket</h2>

                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            image={item.image}
                            title={item.title} 
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}

                </div>
            </div>

            <div className="checkout__right">
                <h2>The subtotal will go here</h2>
                <SubTotal />
            </div>

        </div>
    )
}

export default Checkout
