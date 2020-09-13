import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INDEGRIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: { // this ingredients is on object not array
      salad: 0,   // so we can't use map fun for ingredients
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrize : 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el)=> {
      return sum+el;
    },0);
    this.setState ({purchasable : sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount +1 ;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type]= updatedCount;
    const priceAddition = INDEGRIENT_PRICES[type]
    const oldPrize = this.state.totalPrize;
    const newPrize = oldPrize + priceAddition;
    this.setState({totalPrize : newPrize, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <=0 ) {
      return;
    }
    const updatedCount = oldCount - 1 ;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type]= updatedCount;
    const priceDeduct = INDEGRIENT_PRICES[type]
    const oldPrize = this.state.totalPrize;
    const newPrize = oldPrize - priceDeduct;
    this.setState({totalPrize : newPrize, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing : true });
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    alert('Order Successfull')
  }
  
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }

    return (
      <Aux>
        <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler} > 
          <OrderSummary ingredients = {this.state.ingredients}
          purscheCancel = {this.purchaseCancelHandler}
          purscheContinue = {this.purchaseContinueHandler}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientAdded = {this.addIngredientHandler}
          ingredientRemove = {this.removeIngredientHandler}
          disabled = {disabledInfo}
          price= {this.state.totalPrize}
          purchasable = {this.state.purchasable}
          ordered = {this.purchaseHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;