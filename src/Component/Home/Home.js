import React from 'react'
import Product from '../Product/Product'
import './Home.css'
import Data from '../Data'

function Home() {
    const { products } = Data

    return (
        <div className="home">
            
            <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg" alt="" className="home__banner-img"/>

            <div className="container">

                <div className="home__row">
                    {products.slice(0,2).map(item => (
                        <Product
                            id={item.id} 
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>

                <div className="home__row">
                {products.slice(3,6).map(item => (
                        <Product
                            id={item.id} 
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>

                <div className="home__row">
                {products.slice(-1,7).map(item => (
                        <Product
                            id={item.id} 
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Home
