import React, { useEffect, useState } from 'react'
import CheckoutProduct from '../Checkout/CheckoutProduct'
import { useStateValue } from '../ContextAPI/StateProvider'
import './Payment.css'
import FlipMove from 'react-flip-move'
import { Link, useHistory } from 'react-router-dom'
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../ContextAPI/reducer'
import axios from '../axios'
import { db } from '../firebase'

function Payment() {
    const history = useHistory()

    const [{user, basket}, dispatch] = useStateValue()

    const [disabled, setDisabled] = useState(null)
    const [error, setError] = useState(true)
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")
    const [clientSecret, setClientSecret] = useState(true)

    const stripe= useStripe()
    const elements = useElements()

    useEffect(()=>{
        // generate the stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
 
        getClientSecret()
    },[basket])

    console.log("Client Secret is >>>>>>", clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method : {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // PaymentIntent = payment confirmation

            db.collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created,
              })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET',
            })

            history.replace('/orders')
        })
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // & display any errors as the customer types their data
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }

    return (
        <div className="Payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Saddar Cantt Sialkot</p>
                        <p>Punjab, PAK</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        <FlipMove>
                            {basket.map(item => (
                                <CheckoutProduct
                                    id={item.id}
                                    image={item.image}
                                    title={item.title} 
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))}
                        </FlipMove>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                                
                            <div className="payment__price-Container">
                                <CurrencyFormat
                                    renderText={(value) => (
                                       <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"} 
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
