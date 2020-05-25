import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';
import StripeCheckout from 'react-stripe-checkout'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
toast.configure()


const ProductContext = React.createContext();

class ProductProvider  extends Component{
    state ={
        products:[],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct:detailProduct,
        cartSubTotal: 0,
        cartShip: 0,
        cartTotal: 0
    };
    componentDidMount(){
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];
        })
        this.setState(()=> {
            return {
                products: tempProducts
            }
        })
    }
    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                detailProduct:product
            }
        })
    }
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return {
                product: tempProducts,
                cart: [...this.state.cart, product]
            };
        }, () => {
            this.addTotals();
        })
    }
    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return{
                modalProduct: product,
                modalOpen: true
            }
        })
    }
    closeModal = () => {
        this.setState(() => {
            return{
                modalOpen:false
            }
        })
    }
    increment = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return {
                cart:[...tempCart]
            }
        },()=>{
            this.addTotals()
        })
    }
    decrement = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0) {
            this.removeItem(id)
        }
        else{
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart:[...tempCart]
                }
            }, () => {
                this.addTotals()
            })
        }
    }
    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total =0;

        this.setState(() => {
            return {
                cart:[...tempCart],
                products:[...tempProducts]
            }
        }, () => {
            this.addTotals()
        })
    }
    clearCart = () => {
        this.setState(() => {
            return { cart:[] };
        }, ()=>{
            this.setProducts();
            this.addTotals();
        })
    }
    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempShip = subTotal * 0.1;
        const ship = parseFloat(tempShip.toFixed(2))
        const total =  subTotal + ship

        this.setState(() => {
            return{
                cartSubTotal: subTotal,
                cartShip: ship,
                cartTotal: total
            }
        })
    }
   
    handleToken = async (token, addresses) => {
        const cartTotal = this.state.cartTotal
        const cart = this.state.cart;
        const response = await axios.post(
            'http://localhost:8080/checkout',
            {token, cartTotal, cart}
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        
        
        if (status === "success") {
          toast("Success! Check email for details", { type: "success" });
          this.clearCart()
          
        } else {
          toast("Something went wrong", { type: "error" });

        }
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart,
                handleToken: this.handleToken
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }

}
const ProductConsumer = ProductContext.Consumer;

export{ ProductProvider, ProductConsumer };