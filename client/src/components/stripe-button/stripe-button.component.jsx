import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_WBqax2FWVzS9QlpJScO07iuL';

  const onToken = token => {
    axios({
      data: {
        amount: priceForStripe,
        token
      },
      method: `post`,
      url: `payment`,
    }).then(response => {
      alert('Payment Succesful!');
    }).catch(err => {
      console.log(`Payment error: `, JSON.parse(err));
      alert(`There was an issue with your payment. Please sure you use to provided credit card`);
    })
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Crown Fashion Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
