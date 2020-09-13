import React from 'react'

import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const indegrantSummary = Object.keys(props.ingredients).map(igKey => {
    return <li key={igKey}>
      <span
        style={{ textTransform: 'capitalize' }}>
        {igKey}: {props.ingredients[igKey]}
      </span>
    </li>
  })
  return (
    <Aux>
      <h3> Your Order </h3>
      <p> All burger details:</p>
      <ol>
        {indegrantSummary}
      </ol>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.purscheCancel}> Cancel </Button>
      <Button btnType='Success' clicked={props.purscheContinue}> Continue </Button>
    </Aux>
  )
};

export default orderSummary;