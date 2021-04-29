import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import './Orders.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../ContextAPI/StateProvider'
import moment from 'moment'
import CheckoutProduct from '../Checkout/CheckoutProduct'

function Orders() {
    const [{user, basket}, dispatch] = useStateValue()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if(user){
            db.collection('users')
              .doc(user?.uid)
              .collection('orders')
              .orderBy('created', 'desc')
              .onSnapshot(snapshot => (
                  setOrders(snapshot.docs.map(doc => ({
                      id: doc.id,
                      data: doc.data()
                  })))
            ))
        } else {
            setOrders([])
        }
        
    }, [user])

    return (
        <div className="Orders">
            <h1>Your Orders</h1>

            <div className="orders__order">
                {orders?.map(order => (
                    <div className="order">
                        <h3>Order</h3>
                        <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
                        <p className="order__id">
                            <small>{order.id}</small>
                        </p>

                        {order.data.basket?.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                image={item.image}
                                title={item.title} 
                                price={item.price}
                                rating={item.rating}
                                hidebutton
                            />
                        ))}

                        <CurrencyFormat
                            renderText={(value) => (
                                <h3>Order Total: {value}</h3>
                            )}
                            decimalScale={2}
                            value={order.data.amount / 100}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"} 
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders
