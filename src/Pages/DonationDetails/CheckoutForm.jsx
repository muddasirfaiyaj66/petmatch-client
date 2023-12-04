import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const CheckoutForm = ({ refetch, id ,data }) => {
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState()
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const [amount, setAmount] = useState(0)
    const { image, name,  maxDonationAmount,totalDonation } = data;
    useEffect(() => {
        if (amount > 0) {
            axiosSecure.post('/create-payment-intent', { price: amount })
                .then(res => {
                   
                    setClientSecret(res.data.clientSecret);

                })
        }

    }, [axiosSecure, amount])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log("payment error", error);
            setError(error.message)
        }
        else {
            console.log("Payment Method", paymentMethod);
            setError('')
        }
        //confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'

                }
            }
        });
        if (confirmError) {
            console.log('confirm error');

        } else {
            console.log('payment intent ', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                //now save the payment in the database 
                const payment = {
                    email: user?.email,
                    price: amount,
                    transactionId: paymentIntent.id,
                    date: new Date(), //utc date convert . use moment js 




                    
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log("payment saved", res);
               
                if (res?.data) {
                      
                        const updateTotalDon =  parseFloat(totalDonation + amount);
                        const remaining = parseFloat(maxDonationAmount - amount)
                        const updatedData={
                            totalDonation:updateTotalDon,
                            remaining:remaining,
                           
                        }
                        
                        const res = axiosSecure.put(`/donationCampaigns/${id}`,updatedData)
                        if(res?.data){
                           
                            const donationsData ={
                                donationId:id,
                                email:user.email,
                                donatedAmount:amount,
                                name:user.displayName,
                                image:image,
                                petName:name,
                                payment:'true'
    
    
                            }
                            const res = axiosSecure.post('/donations',donationsData)
                            refetch()
                            if(res?.data){
                                
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Thanks for Donation",
                                    showConfirmButton: false,
                                    timer: 1500
                                })

                            }
                        }

                  

                }
            }
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Amount</span>
                </label>
                <input type="number" min='1' className="input  text-gray-600 input-bordered" required
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button className="btn btn-primary modal-action bg-[#2f47ce] flex justify-center items-center font-bold" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600 ">{error}</p>
            {transactionId && <p className="text-green-600">Your transaction id :{transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;