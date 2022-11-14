import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { webUrl } from '../api/url';
import { getAuthToken, getFavcyAuthToken } from '../api/user';
import WebView from 'react-native-webview';

export default function TopupPayment(props) {
  const [auth_token, setAuth_token] = useState('');
  const [client, setClient] = useState('');
  const [order_id, setOrder_id] = useState('');
  const [success_callback, setSuccess_callback] = useState('');
  const [error_callback, setError_callback] = useState('');
  const [additionalParams, setadditionalParams] = useState('');
  const [affiliate_id, setAffiliate_id] = useState("");
  const [credit_to, setCredit_to] = useState('');
  const [favcyPaymentResponse, setFavcyPaymentResponse] = useState('');
  const [redirect, setRedirect] = useState('0');
  const [currency_type, setCurrency_type] = useState('INR');
  const [provider, setProvider] = useState('razorpay');
  const [amount_in_100, setAmount_in_100] = useState(0);
  const [HTML, setHTML] = useState('');
  const getDataOnInit = async () => {
    console.log(props.route.params.data, 'data');
    let token = await getAuthToken();
    let favcyAuthtoken = await getFavcyAuthToken();
    setAuth_token(token);
    console.log(client, 'client');
    console.log(favcyAuthtoken, 'favcyAuthtoken asda');
    console.log(auth_token, 'auth token');
    console.log(order_id, 'order_id');
    console.log(success_callback, 'success_callback');
    console.log(error_callback, 'error_callback');
    console.log(redirect, 'redirect');
    console.log(provider, 'provider');
    console.log(currency_type, 'currency_type');
    console.log(amount_in_100, 'amount_in_100');
    console.log(affiliate_id, 'affiliate_id');
    console.log(credit_to, 'credit_to');
    const tempHTML = `
            <html>
            <head>
            </head>
            <body>
            <div style="margin-top:50px">
            <form id="formPayment" action="https://www.favcy.com/payments/pay" method="POST">
                         <input type="text" style="display:none" name="auth_token" value="${favcyAuthtoken}" onChange={(e) => setAuth_token(e.target.value)} placeholder="Auth Token" />
                         <input type="text" style="display:none" name="client" value="${client}" onChange={(e) => setClient(e.target.value)} placeholder="Client" />
                         <input type="text" style="display:none" name="order_id" value="${order_id}" onChange={(e) => setOrder_id(e.target.value)} placeholder="Order_Id" />
                         <input type="text" style="display:none" name="success_callback" value="${success_callback}" onChange={(e) => setSuccess_callback(e.target.value)} placeholder="Success Callback" />
                         <input type="text" style="display:none" name="error_callback" value="${error_callback}" onChange={(e) => setError_callback(e.target.value)} placeholder="Error Callback" />
                         <input type="text" style="display:none" name="redirect" value="${redirect}" onChange={(e) => setRedirect(e.target.value)} placeholder="Error Callback" />
                         <input type="text" style="display:none" name="provider" value="${provider}" onChange={(e) => setProvider(e.target.value)} placeholder="Provider" />
                         <input type="text" style="display:none" name="currency_type" value="${currency_type}" onChange={(e) => setCurrency_type(e.target.value)} placeholder="currency_type" />
                         <input type="text" style="display:none" name="amount_in_100" value="${amount_in_100}" onChange={(e) => setAmount_in_100(e.target.value)} placeholder="amount_in_100" />
                         <input type="text" style="display:none" name="affiliate_id" value="${affiliate_id}" onChange={(e) => setAmount_in_100(e.target.value)} placeholder="amount_in_100" />
                         <input type="text" style="display:none" name="credit_to" value="${credit_to}" onChange={(e) => setAmount_in_100(e.target.value)} placeholder="amount_in_100" />
                         <input type="text" style="display:none" name="additional_params" value='{"brand_name": "Good Good Piggy","description": "You are paying for Good Good Piggy"}' />
                         </form>
                    </div>
            <script>
            if (typeof document.getElementById('formPayment').submit === "object") {
                // document.getElementById('formPayment').submit.remove();
            }
             document.getElementById('formPayment').submit();
            </script>                    
            </body>
            </html>
        `;
    setHTML(tempHTML);
  };

  useEffect(() => {
    setClient('goodgoodpiggy');
    setRedirect('O');
    let orderId = `${new Date().getTime()}`;
    setOrder_id(props?.route?.params?.orderObj?._id);
    console.log(props?.route?.params?.data, "params Daa");
    setCurrency_type('INR');
    setProvider('razorpay');

    ///////////////////affiliate id will be changed when going live
    // setAffiliate_id('1035'); //////staging
    setAffiliate_id('245'); ///////production
    setCredit_to('user');
    setSuccess_callback(`${webUrl}payment-success`);
    setError_callback(`${webUrl}payment-error`);
    console.log('price', props?.route?.params?.orderObj?.price);
    setAmount_in_100(props?.route?.params?.orderObj?.price * 100);
    getDataOnInit();
  }, [client, success_callback, error_callback, amount_in_100, auth_token]);
  return (
    <View style={{ backgroundColor: 'red', flex: 1 }}>
      <WebView
        onNavigationStateChange={navState => {
          // Keep track of going back navigation within component
          console.log(navState.url, 'navstate');
          console.log(
            `${navState.url}`.toLowerCase().includes('payment-success'),
            'navstate',
          );
          if (`${navState.url}`.toLowerCase().includes('payment-success')) {
            props.navigation.navigate("TopUp", { data: props?.route?.params?.orderObj, openModal: true });
            console.log(
              'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsuccess',
            );
          } else if (
            `${navState.url}`.toLowerCase().includes('payment-error')
          ) {
            props.navigation.navigate('TopUpPaymentFailed', {
              data: navState.url,
              data2: props?.route?.params?.orderObj,
              paymentObj: props?.route?.params?.data,
            });
            console.log(
              'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffFailure',
            );
          }
          // this.canGoBack = navState.canGoBack;
        }}
        // onLoad={(syntheticEvent) => {
        //     // const { nativeEvent } = syntheticEvent;
        //     // this.url = nativeEvent.url;
        //     console.log(syntheticEvent)
        //     // document.forms[0].submit()
        // }}
        // injectedJavaScript={myScript}
        // setSupportMultipleWindows={true}
        // originWhitelist={['*']}
        source={{ html: HTML }}
      />
    </View>
  );
}
