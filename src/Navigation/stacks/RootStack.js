import { useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, AppState } from 'react-native';
import { axiosApiInstance, toggleModalContext } from '../../../App';
import { createPin, getAuthToken } from '../../api/user';
import { authContext } from "../../Context/AuthContext";
import { RoleContext } from '../../Context/RoleContext';
import { Colors } from '../../Styles/theme';
import ChangePin from '../../View/ChangePin';
// LOGIN
import ChangePinSuc from '../../View/ChangePinSuc';
import ForgetPin from '../../View/ForgetPin';
import ForgetPinSuc from '../../View/ForgetPinSuc';
import KidLogin from '../../View/KidLogin';
import KidPin from '../../View/KidPin';
import KidRegister from '../../View/KidRegister';
import KidWelcome from '../../View/KidWelcome';
// LOGIN
import Login from '../../View/Login';
import LoginOption from '../../View/LoginOption';
import LoginParent from '../../View/LoginParent';
import Otp from '../../View/Otp';
import ParentForgetPin from '../../View/ParentForgetPin';
import Payment from '../../View/Payment';
import PaymentFailed from '../../View/PaymentFailed';
import PaymentSuccess from '../../View/PaymentSuccess';
import Plans from '../../View/Plans';
import Premium from '../../View/Premium';
import Register from '../../View/Register';
import Splash from '../../View/Splash';
import TopupPayment from '../../View/TopupPayment';
import TopUpPaymentFailed from '../../View/TopUpPaymentFailed';
import DashboardStack from './DashboardStack';
import KidRootStack from './KidRootStack';


import { useNetInfo } from "@react-native-community/netinfo";
import OtpVerifyBeforePayment from '../../View/OtpVerifyBeforePayment';
import OtpVerifyForgotPassword from '../../View/OtpVerifyForgotPassword';


export const refContext = createContext();


const Stack = createStackNavigator();

export default function MyStack() {
    const netInfo = useNetInfo();
    const [isAuthorised, setIsAuthorised] = useContext(authContext);
    const [role, setRole] = useContext(RoleContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [ref, setRef] = useState();
    const [loading, setLoading] = useState(true);

    const focused = useIsFocused()

    const checkAuthorized = async () => {
        console.log(role, "rolem")

        let token = await getAuthToken();

        console.log("role got from backend ", role == "", token, "token")
        if (token && role != "") {
            setIsAuthorised(true)
            setLoading(false)
        }
        else {
            setRole("")
            setIsAuthorised(false)
            setLoading(false)
        }
    }



    useEffect(() => {
        if (netInfo.isConnected == false) {
            setToggleModal(true)
            setMessage("You are Offline. Please connect to data network using Mobile Data or Wi-Fi to continue")
        }
        // console.log(`${netInfo.isConnected}`, "conected")
    }, [netInfo.isConnected, focused])


    useMemo(() => {
        axiosApiInstance.interceptors.request.use(
            async (config) => {
                const token = await getAuthToken();
                // console.log(token)
                if (token) {
                    config.headers['authorization'] = 'Bearer ' + token;
                }
                // config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });
        axiosApiInstance.interceptors.response.use(
            (res) => {
                // Add configurations here
                return res;
            },
            async (err) => {
                console.log("INterceptor error")

                // await logoutUser()

                return Promise.reject(err);
            }
        );
    }, [])


    useEffect(() => {
        console.log("ROLE CHANGED TO ", role)
    }, [role])



    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (appState.current == "background") {
                // checkAuthorized()
            }
            setAppStateVisible(appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, []);




    useEffect(() => {
        if (focused) {
            checkAuthorized()
        }
    }, [focused])


    if (loading) {
        return (
            <ActivityIndicator color={Colors.GRADIENT1} size="large" />
        )
    }
    else {
        return (
            <>
                <refContext.Provider value={[ref, setRef]}>
                    <Stack.Navigator>
                        {
                            isAuthorised && role != "" ?
                                <>
                                    {
                                        role == "PARENT" ?
                                            <Stack.Screen name="DashboardStack" options={{ headerShown: false }} component={DashboardStack} />
                                            :
                                            role == "KID" &&
                                            <Stack.Screen options={{ headerShown: false }} name="KidRootStack" component={KidRootStack} />
                                    }
                                </>
                                :
                                <>
                                    <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
                                    <Stack.Screen options={{ headerShown: false }} name="KidRegister" component={KidRegister} />
                                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                                    <Stack.Screen options={{ headerShown: false }} name="ForgetPin" component={ForgetPin} />
                                    <Stack.Screen options={{ headerShown: false }} name="ForgetPinSuc" component={ForgetPinSuc} />
                                    <Stack.Screen options={{ headerShown: false }} name="ChangePinSuc" component={ChangePinSuc} />
                                    <Stack.Screen options={{ headerShown: false }} name="LoginParent" component={LoginParent} />
                                    <Stack.Screen options={{ headerShown: false }} name="CreatePin" component={createPin} />
                                    <Stack.Screen options={{ headerShown: false }} name="ParentForgetPin" component={ParentForgetPin} />
                                    <Stack.Screen options={{ headerShown: false }} name="LoginOption" component={LoginOption} />
                                    <Stack.Screen options={{ headerShown: false }} name="KidLogin" component={KidLogin} />
                                    <Stack.Screen options={{ headerShown: false }} name="KidWelcome" component={KidWelcome} />
                                    <Stack.Screen options={{ headerShown: false }} name="KidPin" component={KidPin} />
                                    <Stack.Screen options={{ headerShown: false }} name="Premium" component={Premium} />
                                    <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
                                    <Stack.Screen options={{ headerShown: false }} name="Otp" component={Otp} />
                                </>
                        }
                        <Stack.Screen options={{ headerShown: false }} name="Plans" component={Plans} />
                        <Stack.Screen options={{ headerShown: false }} name="ChangePin" component={ChangePin} />
                        <Stack.Screen options={{ headerShown: false }} name="Payment" component={Payment} />
                        <Stack.Screen options={{ headerShown: false }} name="PaymentFailed" component={PaymentFailed} />
                        <Stack.Screen options={{ headerShown: false }} name="PaymentSuccess" component={PaymentSuccess} />
                        <Stack.Screen options={{ headerShown: false }} name="TopupPayment" component={TopupPayment} />
                        <Stack.Screen options={{ headerShown: false }} name="TopUpPaymentFailed" component={TopUpPaymentFailed} />
                        <Stack.Screen options={{ headerShown: false }} name="OtpVerifyBeforePayment" component={OtpVerifyBeforePayment} />
                        <Stack.Screen options={{ headerShown: false }} name="OtpVerifyForgotPassword" component={OtpVerifyForgotPassword} />
                    </Stack.Navigator>
                </refContext.Provider>
            </>
        );
    }
}