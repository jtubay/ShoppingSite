import React, { Component } from 'react'

import { ProductConsumer } from '../context';

import { Link } from 'react-router-dom'
import { ModalContainer, ButtonContainer  } from './Styled'

export default class Modal extends Component {
    render(){
        return (
            <ProductConsumer>
                {(value) => {
                    const {modalOpen, closeModal} = value;
                    const {img, title, price} = value.modalProduct;
                    if(!modalOpen){
                        return null;
                    }else{
                       return( <ModalContainer>
                            <div className="container">
                                <div id="modal" className="row">
                                    <div className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capatilize p-5">
                                        <h5>item added to cart</h5>
                                        <img src={img} className="img-fluid" alt="product"/>
                                        <h5>{title}</h5>
                                        <h5 className="text-muted">
                                            price : $ {price}
                                        </h5>
                                        <Link to="/">
                                            <ButtonContainer onClick ={()=>closeModal()}>
                                                store
                                            </ButtonContainer>
                                        </Link>
                                        <Link to="/cart">
                                            <ButtonContainer cart onClick ={()=>closeModal()}>
                                                go to cart
                                            </ButtonContainer>
                                        </Link>
                                    </div>
                                </div>


                            </div>
                        </ModalContainer>)
                    }
                }}
            </ProductConsumer>
        )
    }
}