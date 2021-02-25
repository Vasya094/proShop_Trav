import React, {useState} from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


const PaymentScreen = ( { history } ) => {
  debugger
  const [checked, setChecked] = useState(true)
  const cart = useSelector( state => state.cart )
  const { shippingAddress } = cart
  if ( !shippingAddress ){
    history.push('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()
  const submitHendler = ( e ) => {
    e.preventDefault();
    dispatch(
      savePaymentMethod( paymentMethod )
    );
    history.push( '/placeorder' )
  };
  const onChangeHendler = ( e ) => {
    console.log("from change hendler")
    
    setPaymentMethod( e.target.value )
    setChecked( checked => !checked )
    
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHendler}>
        <Form.Group>
          <Form.Label as="legend">Select method</Form.Label>
        
        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked={checked}
            onChange={onChangeHendler}
          ></Form.Check>
          <Form.Check
            type="radio"
            label="Stripe"
              id="Stripe"
              checked={!checked}
            name="paymentMethod"
            value="Stripe"
            onChange={onChangeHendler}
          ></Form.Check>
        </Col></Form.Group>
        <Button type="submit" variant="primary">
          Continue...
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen
