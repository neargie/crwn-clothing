import React from 'react';
import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51Jl7W3K8QBVrTyGhLny8SL5wcqP0EFGH0R0SWfavcTEUU6CVCLCcUmRMIHL63IxRd66zIdTH7hmhBi87drtFaPCw00nfkMZGOW";

    const onToken = (token) => {
        console.log(token);
        alert('Payment Successful');
    }
    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://sendeyo.com/updownload/file/script/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeButton;