import React, { Component } from 'react';
import axios from 'axios';
import OrderSummary from './Components/order/OrderSummary';

const ProductContext = React.createContext();
class ProductProvider extends Component {


    state ={
        isLoading: false,
        products: [],
        attributes:[],
        values:[],
        attributeValues:[],
        categories:[],
        departments:[],
        shippingRegions:[],
        shippingMethods:[],
        searchresults:[],
        prodnum: 0,
        currentPage: 1,
        productsPerPage: 16,
        detailProduct: [],
        cart: [],
        orders:[],
        modalOpen:false,
        modalProduct: [],      
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        shipping:[],
        taxes:[],
        regions:[],
        checkoutOpen:false,
        OrderSummaryTotal:0
    }; 

    componentDidMount(){
        this.getListSets();
        this.getAttributesList();
        this.getDepartmentsList();
        this.getCategoriesList();
        this.setUpCart();
        this.retrieveRegions();
    } 





    

//-----------------------------------------------------------------------------------------------------------------------
//  THE INITIALIZING FUNCTIONS - THESE RUN WHEN THE COMPONENT MOUNTS AND FETCHES ALL INITIAL DATA THAT THE APP NEEDS
//-----------------------------------------------------------------------------------------------------------------------

    getListSets = (pnum) =>{ 
        this.setState(()=>{
                return{ isLoading : true }
        })
        const config={
            params:{
                'page': pnum
            }
        }
        axios.get('/products', config)
            .then((res)=>{ 
                let temps = res.data;
                let singleItem=[];
               const indexOfLastProduct = this.state.currentPage * this.state.productsPerPage;
               const indexOfFirstProduct = indexOfLastProduct - this.state.productsPerPage;
                let currentProductsList = [];
                temps.forEach( item =>{
                    singleItem = {...item, inCart:false, count:0, total:0};
                    temps = [...temps, singleItem];
                    currentProductsList = temps.slice(indexOfFirstProduct, indexOfLastProduct);
                })
                this.setState( () => {
                    return { products:currentProductsList, isLoading : false };
                    });
            })           
    }





    setUpCart=()=>{
        axios.get('/shoppingcart/generateUniqueId')
        .then((res)=>{
            localStorage.setItem('cart_id', res.data.cart_id);
        })
    }





    createLocalCart = () =>{
        const localCart = [];
        localStorage.setItem('localcart', JSON.stringify(localCart));
    }






    getAttributesList=()=>{
        let tempAttributes = [...this.state.attributes];
        axios.get('/attributes')
        .then((attributes)=>{
            tempAttributes = attributes;
            console.log(tempAttributes);
            this.setState(()=>{
                return {attributes: [...tempAttributes.data]}
            })
        })
    }





    getDepartmentsList = () =>{
        axios.get('/departments')
        .then((departments)=>{
            this.setState(()=>{
                return { departments }
            })
        })
    }





    getCategoriesList = () =>{
        axios.get('/categories/get')
        .then((categories)=>{
            this.setState(()=>{
                return { categories }
            })
        })
    }





    onNavigate = (page) =>{
        let newProductsSet = this.state.products;
        const page_num = Number(page);
        const config={
            params:{
                'page': page_num
            }
        }
        axios.get('/products', config )
        .then((res)=>{
            newProductsSet = res.data;
            this.setState( () => {
                return { products : newProductsSet, currentPage : page_num };
                });
        })
        console.log(this.state.page);
        
    }





    retrieveShipping = () =>{
        axios.get('/shipping')
        .then((res)=>{
            const shipping = res.data;
            this.setState(()=>{
                return { shipping }
            })
        })
    }






    retrieveTaxes = () =>{
        axios.get('/tax')
        .then((res) =>{
            const taxes = res.data;
            this.setState(()=>{
                return { taxes }
            })
        })
    }





    retrieveRegions = () =>{
        axios.get('/shipping/regions')
        .then((res) =>{
            const regions = res.data;
            this.setState(()=>{
                return { regions }
            })
        })
    }








//-----------------------------------------------------------------------------------------------------------------------
// (PRODUCT DATA) RENDERING CODE - THESE CONTROL THE WAY THE COMPONENT DATA IS RENDERED AND THEIR BEHAVIOUR AS A WHOLE
//-----------------------------------------------------------------------------------------------------------------------


    getProduct = (product_id) => {
        const product = this.state.products.find( product => product.product_id === product_id );
        return product;
    }




    
    handleDetail = (product_id) =>{
        const product = this.getProduct(product_id);
        this.setState(()=> {
            return { detailProduct: product };
        });
        localStorage.setItem('currentdetails', JSON.stringify(product));
    };




    getValues = (id) =>{
    
        let payload={
            params:{
                attribute_id : id
            }
        }
        axios.get('/attributes/values',payload)
        .then((res)=>{
            let tempValues = res;
            this.setState(()=> {
                return { values: [...tempValues.data] }
            })
        })
    }





    setValue = (e) =>{
        let tempAttributes = this.state.attributeValues
        tempAttributes = e.target.value;
        this.setState(()=>{
            return { attributeValues:tempAttributes }
        })
    }

    



    openModal = (id) =>{
        const product = this.getProduct(id);
        this.setState( ()=>{
            return {modalProduct:product, modalOpen:true}
        })
        localStorage.setItem('currentmodal', JSON.stringify(product) );
    };





    closeModal = ()=>{
        this.setState( ()=> {
            return{ modalOpen:false }
        })
    };







//-----------------------------------------------------------------------------------------------------------------------
// CART FUNCTIONS -  THESE DEFINE HOW THE SHOPPING CART SYSTEMs BEHAVE AND ALSO MAKES API CALLS TO THE BACKEND
//-----------------------------------------------------------------------------------------------------------------------
   
    addToLocalCart = (data) =>{        
        this.createLocalCart();        
        const localCart = JSON.parse(localStorage.getItem('localcart') || []);
        localCart.push(data);
        console.log(localCart);
        localStorage.setItem('localcart', JSON.stringify(localCart));
    }    





    addToCart = (product_id) =>{
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getProduct(product_id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = parseFloat(product.discounted_price).toFixed(2);
        product.total = price;
        const quant = product.count
        this.setState( ()=> {
            return { products:tempProducts, cart:[...this.state.cart, product] };
            },
        () => {this.addTotals()},
        );

        const local_product = {
            product_id:product.product_id, 
            name:product.name,
            count:product.count, 
            image:product.image, 
            discounted_price:product.discounted_price, 
            total:product.total
        }

        this.addToLocalCart(local_product);

       localStorage.setItem('quantity', quant);
       const token = localStorage.getItem('xauthtoken');
       const cart_id = localStorage.getItem('cart_id');
       const options = {
            headers: [{'xauthtoken': token}, {'cart_id': cart_id}]
        }
        const attributes = this.state.attributeValues;
        const quantity = localStorage.getItem('quantity');
        const subtotal = product.discounted_price;
    
            axios.post('/shoppingcart/add', {   
                cart_id,
                product_id,
                attributes,
                quantity,
                subtotal
            }, options)
            .then((order)=>{
                this.setState(()=>{
                    return { order }
                })
            })
      localStorage.removeItem('attribute')
    };





    increment = (product_id) =>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find( item => item.product_id === product_id );

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * parseFloat(product.discounted_price).toFixed(2);

        this.setState( ()=>{
            return{ cart:[...tempCart]}
        },
        ()=>{
             this.addTotals();
        })

       
        let cart_id = localStorage.getItem('cart_id');
        let payload={
            params:{ 
                'product_id' : product_id,
                'cart_id' : cart_id
            }
        };
        axios.get('shoppingcart/item', payload)
        .then((res)=>{
            const id = res.data;
            const item_id = id.reduce(
                (arr, elem)=> arr.concat(elem.item_id),[]
                );
            const options = {
                params:{ 'item_id': item_id }
            }
            axios.put('/shoppingcart/update',{
                quantity : product.count
            }, options)
            .then((res)=>{
                console.log(res);
            })
        })
        
    }





    decrement = (product_id) =>{
        let tempCart =[...this.state.cart];
        const selectedProduct = tempCart.find( item => item.product_id === product_id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;

        let cart_id = localStorage.getItem('cart_id');
        let payload={
            params:{ 
                'product_id' : product_id,
                'cart_id' : cart_id
            }
        }
        axios.get('shoppingcart/item', payload)
        .then((res)=>{
            const id = res.data;
            const item_id = id.reduce(
                (arr, elem)=> arr.concat(elem.item_id),[]
                )
            if(product.count === 0){
                this.removeItem(product_id);
            }        
            else{
                product.total = product.count * parseFloat(product.discounted_price).toFixed(2);
                this.setState(()=>{
                    return{ cart:[...tempCart] }
                },
                ()=>{
                    this.addTotals();
                });
            }   

            const options = {
                params:{ 'item_id': item_id }
            }
            axios.put('/shoppingcart/update',{
                quantity : product.count
            }, options)
            .then((res)=>{
                console.log(res);
            })
        })
    }





    removeItem = (product_id) =>{
        //set up all the necessary temporary variable needed.
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        //filter out item from the temporary cart using it's id
        tempCart = tempCart.filter(item => item.product_id !== product_id);
        //retrieve the index of the removed item
        const index = tempProducts.indexOf(this.getProduct(product_id));
        let removedProduct = tempProducts[index];
        //use the index of the removed product to reset it's incart,count and total attributes
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        //return replacement values to the state
        //the cart with temporary cart & the products which is without the removed index
        this.setState(()=>{
            return{
                cart: [...tempCart],
                products: [...tempProducts]
            };
          },
            ()=>{
        //re-run the addTotals method to ensure that the total calculations are updated
                this.addTotals();
            }
        );
    
        let cart_id = localStorage.getItem('cart_id');
        let payload={
            params:{ 
                'product_id' : product_id,
                'cart_id' : cart_id
            }
        };
        axios.get('shoppingcart/item', payload)
        .then((res)=>{
            const id = res.data;
            const item_id = id.reduce(
                (arr, elem)=> arr.concat(elem.item_id),[]
                )
                let config = {
                    params:{
                        'item_id' : item_id
                    }
                }
            axios.delete('/shoppingcart/removeProduct', config)
            .then((res)=>{
                console.log(`${res} product deleted`)
            })
        })
    };
    




    clearCart = ()=>{        
    let cart_id = localStorage.getItem('cart_id');        
    let config = {
        params:{
            'cart_id' : cart_id
        }
    }
    axios.delete('/shoppingcart/empty', config)
    .then((res)=>{
        console.log('cart cleared')
    });
  

        //reset the cart array in the state to null
            this.setState( ()=>{
                return { cart: [] };
            },
            ()=>{
        //reset the products and cartTotal arrays and replace with a new copy of the state-data
                this.getListSets();
                this.addTotals();
            }
            
    )}





    addTotals = () =>{
      //create a temprory var to store current value of the subtotal of all items added to the cart
        let subTotal = 0;
      //map through the cart everytime a new item is added and add their subtotals
        this.state.cart.map(item =>(subTotal+=item.total));
        const sub_total = parseFloat(subTotal).toFixed(2);
        const tempTax = sub_total*0.1;
        const tax = parseFloat(tempTax).toFixed(2);
        const tot = sub_total + tax;
        const total = parseFloat(tot).toFixed(2);
        this.setState(()=>{
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
 






//-----------------------------------------------------------------------------------------------------------------------
// ORDER SUMMARY FUNCTIONS - THESE HANDLE ALL THE BEHAVIOUR OF ALL THE COMPONENTS WHICH COMPRISE THE ORDER SUMMARY SYSTEM
//-----------------------------------------------------------------------------------------------------------------------

    createOrder = () =>{
         const cart_id = localStorage.getItem('cart_id');
         const token = localStorage.getItem('xauthtoken');
         const shipping_id = 5;
         const tax_id = 2;
         const options = {
             params:{ 'cart_id': cart_id },
             headers: {'xauthtoken': token}
         }
 
         axios.post('/orders', {
             cart_id,
             shipping_id,
             tax_id
         },options)
         .then ((res)=>{
             localStorage.setItem('orderid', res);
         })
 
         axios.get('/orders/inCustomer', options)
         .then((order)=>{
            let tempOrderList = order.data;
            this.setState(()=>{
                 return { orders: tempOrderList }
             })
         })
     }




     culminate = () =>{
        const taxes = this.state.taxes;
        const taxPercentage = taxes.reduce(
            (arr, elem) => arr.concat(elem.tax_percentage), 0
            );
        console.log(taxPercentage);

        const tempTotal = this.state.cartTotal;
        const tax = tempTotal/taxPercentage ;
        const priceList = tempTotal.reduce(
            (arr, elem)=> arr.concat(elem.total_amount),[]
            )
        const rawTotal = priceList.map(function(i) { 
            return /^\d+(\.\d+)?$/.test(i) ? parseFloat(i) : 0;
        }) 
        const total = rawTotal + tax;
        this.setState(()=>{
            return { OrderSummaryTotal: total }
        })
    }


   


    getMyShippingMethods = (id) =>{
        const options={
            params:{
                'shipping_region_id':id
            }
        }
        axios.get('/shipping/forRegion', options)
        .then((res)=>{
            let tempShipping = this.state.shipping;
            tempShipping = res.data;
            this.setState(()=>{
                return { shipping : tempShipping }
            })
        })
    }






    getMyTaxPrice = (shipping_region_id) =>{
        const srid = shipping_region_id;
        if(srid === 3 ){
            const option = {
                params:{
                    tax_id : 2
                }
            }
            axios.get('/tax/id', option)
            .then ((res)=>{
                const taxes = res.data;
                this.setState(()=>{
                    return { taxes }
                })
            })

            this.culminate();
        }

        else{
            const option={
                params:{
                    tax_id : 1
                }
            }
            axios.get('/tax/id', option)
            .then((res)=>{
                const taxes = res.data;
                this.setState(()=>{
                    return { taxes }
                })
            })
        }
    }





    

//------------------------------------------------------------------------------------------------------------------------
//CHECKOUT FUNCTIONS - ALL CHECKOUT-RELATED CODE WHICH RUNS DURING THE CUSTOMER PAYMENT PROCESS START HERE
//------------------------------------------------------------------------------------------------------------------------

  openCheckoutModal = () =>{
        this.setState(()=>{
            return { checkoutOpen:true }
        })
    }





    closeCheckoutModal = () =>{
        const state = this.state.checkoutOpen;
        if(state==false){
            return null
        }
        else{
            this.setState(()=>{
                return { checkoutOpen:false }
            })
        }
        
    }








//-----------------------------------------------------------------------------------------------------------------------
// COMPONENT RENDER FUNCTION - RETURNS ALL THE FUNCTIONS AND STATE ITEMS THAT WILL BE AVAILABLE VIA THE CONTEXT-CONSUMER
//-----------------------------------------------------------------------------------------------------------------------
    render() {
        

        return (
            <ProductContext.Provider value={{
                ...this.state,
                getListSets: this.getListSets,
                onNavigate: this.onNavigate,
                paginate: this.paginate,
                getValues: this.getValues,
                getMyShippingMethods: this.getMyShippingMethods,
                getMyTaxPrice: this.getMyTaxPrice,
                culminate: this.culminate,
                createBackCart: this.createBackCart,
                createOrder: this.createOrder,
                handleDetail: this.handleDetail,
                setValue: this.setValue,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                toggleCheckout: this.toggleCheckout,
                openCheckoutModal: this.openCheckoutModal,
                closeCheckoutModal: this.closeCheckoutModal           
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}


const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };