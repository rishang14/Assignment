import {CardElement,useStripe,useElements} from"@stripe/react-stripe-js"
import { useAuth } from "../Authentication/Authcontext"
const PaymentForm = () => { 
    const stripe=useStripe()  
    const element=useElements() 
    const {user}=useAuth()
    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !element) {
          return;
        }
        const response = await fetch('/.netlify/functions/create-payment', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({amount:1000}),
        }).then((res) => {
          return res.json();
        });
    
        const clientSecret = response.paymentIntent.client_secret;
    
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: element.getElement(CardElement),
            billing_details: {
              name: `${user.firstName}`
            },
          },
        });
    
        if (paymentResult.error) {
          alert(paymentResult.error.message);
        } else {
          if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment Successful!');
          }
        }
      };
    
    
  return (
    <>  
    <div className="h-[300px] flex flex-col items-center justify-center"> 
    <form className="h-[100px] w-full" onSubmit={paymentHandler}>
    <h2>Credit Card Payment :</h2>
    <CardElement/>  
    <button className="w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Pay now</button>
    </form>
    </div>
    </>
  )
}

export default PaymentForm