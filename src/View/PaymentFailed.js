import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect,useContext } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Spacing, Typography } from '../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { updatePaymentfail } from '../api/UserSubscription';
import { LoaderContext, toggleModalContext } from '../../App';

export default function PaymentFailed(props) {
    const navigation = useNavigation();
    // console.log(props.route.params.data, "data")
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [loading, setLoading] = useContext(LoaderContext);
    const focused = useIsFocused()

    const handlePaymentSuccess = async () => {
        setLoading(true)
        try {
            let { data: res } = await updatePaymentfail(props.route.params.paymentObj._id)
            if (res.message) {
              //  alert(res.message)
                setToggleModal(true)
                setMessage(res.message)
                props.navigation.navigate("Plans")
            }
        }
        catch (error) {
                      if (error?.response?.data?.message) {
              setToggleModal(true)
              setMessage(error.response.data.message)
            } else {
              setToggleModal(true)
              setMessage(error?.message)
            }
          }
        setLoading(false)
    }


    useEffect(() => {
        if (focused) {
            handlePaymentSuccess()
        }
    }, [focused])


    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <ImageBackground source={require('../images/bg2.png')} resizeMode='cover' style={[{ flex: 1, minHeight: hp(100) }]}>
                <Image source={require('../images/forgetTeady.png')} resizeMode='contain' style={[styles.img]} />
                <View style={[styles.view]}>
                    <Text style={[styles.suc]}>Payment Failed</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: Spacing.MARGIN_30, marginTop: Spacing.MARGIN_10, }}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={['red', 'red']} style={[styles.linearBtn, { borderRadius: 20 }]} >
                            <Text style={[styles.btnText]}>Go Back</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    img: {
        height: hp(35),
        width: wp(50),

        alignSelf: 'center',
        marginTop: hp(10)
    },
    view: {
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: -hp(10),
        backgroundColor: '#fff',
        marginHorizontal: 20,
        // height: hp(20),
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    suc: {
        fontSize: 22,
        fontFamily: 'Cookies',
        color: Colors.PRIMARY
    },
    linearBtn: {
        width: '100%',
        borderRadius: 7,
        marginTop: Spacing.PADDING_25,
    },
    btnText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_16,
        fontWeight: '600',
        paddingVertical: Spacing.PADDING_10,
        paddingHorizontal: 25
    },
})