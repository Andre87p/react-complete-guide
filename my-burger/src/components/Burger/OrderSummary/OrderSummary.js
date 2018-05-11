import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => (
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}: </span>
                {props.ingredients[igKey]}
            </li>
        ));

    return (
        <Fragment>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button type="Success" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button type="Danger" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
};

export default orderSummary;