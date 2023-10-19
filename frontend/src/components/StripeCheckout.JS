import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { payOrder } from '../actions/orderActions';
import { useDispatch } from 'react-redux';
import Message from './Message';
import { Form,Button } from 'react-bootstrap';

const StripeCheckout = ({ order, successPaymentHandler }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: order.user.name,
        email: order.user.email,
        address: {
          line1: order.shippingAddress.address,
          city: order.shippingAddress.city,
          state: order.shippingAddress.country,
          postal_code: order.shippingAddress.postalCode,
          country: order.shippingAddress.country,
        },
      },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    const { id } = paymentMethod;

    try {
      await dispatch(payOrder(order._id, { paymentMethod: id }));
      successPaymentHandler();
    } catch (error) {
      setError(error.message);
      setProcessing(false);
    }
  };

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="cardElement">
          <Form.Label>Card details</Form.Label>
          <CardElement />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={!stripe || processing}>
          {processing ? 'Processing...' : 'Pay now'}
        </Button>
      </Form>
    </>
  );
};

export default StripeCheckout;