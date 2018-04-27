import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axious-orders';
class Orders extends Component {
    state = {
        loading: true,
        orders : []
    }

    componentDidMount(){
        axios.get('orders.json')
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push(
                        {
                        ...res.data[key],
                        id: key
                        }
                    );
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders
                });
                console.log('orders:', res.data);
            })
            .catch(e => {
                this.setState({loading: false});
                console.exception(e);
            })
    }
    render(){
       return (
           <div>
               {
                   this.state.orders.map(order => <Order key={order.id} 
                   ingredients={order.ingredients} 
                   price={order.price} />)
               }
           </div>
       ); 
    }
}

export default withErrorHandler(Orders, axios);