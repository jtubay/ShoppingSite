import React, { Component } from 'react';
import Product from './Product.jsx';
import Title from './Title.jsx';
import { ProductConsumer } from '../context'
import Footer from '../components/Footer'



export default class ProductList extends Component {
    render(){
        return (
            <React.Fragment>
                
                <div className="py-5 mainDiv">
                    <div className="container">
                        <Title name="our" title="products"/>
                        <div className="row">
                            <ProductConsumer>
                                {(value) => {
                                    return value.products.map(product => {
                                        return <Product key={product.id} product={product}/>
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}