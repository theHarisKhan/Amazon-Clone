import React from 'react'
import './Checkout.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../ContextAPI/StateProvider'
import { getBasketTotal } from '../ContextAPI/reducer'
import { useHistory } from 'react-router-dom'

function SubTotal() {
    const history = useHistory()
    const [{ basket }, dispatch] = useStateValue()
    
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket?.length} items) : 
                            <strong>{`${value}`}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox"/>This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"} 
            />

            <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default SubTotal
