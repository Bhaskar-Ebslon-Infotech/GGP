import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LoaderContext, toggleModalContext } from '../../App';
import { CheckPinValid } from '../api/user';
import { images } from '../Constant/background';
import { authContext } from '../Context/AuthContext';
import { kidContext } from '../Context/CurrentKidContext';
import { RoleContext } from '../Context/RoleContext';
import KidTeady from '../images/svg/kidPin';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme/index';

export default function EnterPin(props) {
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useContext(authContext);
    const [role, setRole] = useContext(RoleContext);
    const [loading, setLoading] = useContext(LoaderContext);
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;

    const data = [
        {
            id: '1',
            num: '1',
            value: '1',

        },
        {
            id: '2',
            num: '2',
            value: '2'
        },
        {
            id: '3',
            num: '3',
            value: '3'
        },
        {
            id: '4',
            num: '4',
            value: '4',
        },
        {
            id: '5',
            num: '5',
            value: '5',
        },
        {
            id: '6',
            num: '6',
            value: '6',
        },
        {
            id: '7',
            num: '7',
            value: '7',
        },
        {
            id: '8',
            num: '8',
            value: '8',
        },
        {
            id: '9',
            num: '9',
            value: '9',
        },
        {
            id: '10',
            num: '<',
            value: 'back',
        },
        {
            id: '11',
            num: '0',
            value: '0',
        },
        {
            id: '12',
            num: '>',
            value: 'submit',
        },
    ]
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ marginHorizontal: Spacing.MARGIN_10, marginVertical: Spacing.MARGIN_5, }}>
                <TouchableOpacity onPress={() => handlePasswordInput(item.value)} style={[styles.keyBg]}>
                    <Text style={[styles.keyTxt]}>{item.num}</Text>
                    {
                        index == data.length - 1 &&
                        < Text style={[styles.keyTxt, { fontSize: 10 }]}>Proceed</Text>
                    }
                </TouchableOpacity>
            </View >
        )
    }


    const handlePasswordInput = async (value) => {
        console.log(value)
        if (`${value}`.toLowerCase() == "back") {
            setPassword(previousState => {
                let finalString = `${previousState}`.substring(0, previousState.length - 1)
                return finalString
            })
        }
        else if (`${value}`.toLowerCase() == "submit") {
            setLoading(true)
            try {
                let obj = {
                    pin: password
                }
                let { data: res } = await CheckPinValid(obj)
                console.log(JSON.stringify(res.data, null, 2), "assds")
                if (res.success) {
                    navigation.navigate("Transation")
                    setPassword('')
                }
            }
            catch (error) {
                setPassword('')
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
        else {
            if (value && password.length < 4) {
                setPassword(previousState => {
                    let finalString = `${previousState}${value}`
                    return finalString
                }
                )
            }
        }
    }


    return (
        <View>
            <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                <KidTeady height={hp(35)} width={wp(50)} style={{ alignSelf: 'center', zIndex: -10, marginTop: Spacing.MARGIN_20, position: 'absolute' }} />
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linear]} >
                    <View style={[commonStyle.flexRow, { justifyContent: 'space-evenly', alignItems: "center", alignContent: "center", marginTop: 15 }]}>
                        <Text style={[styles.underlineStyleBase, { backgroundColor: "rgba(0,0,0,0.01)", width: "20%", height: 50, textAlign: "center", paddingTop: 10 }]}>{password.substring(0, 1)}</Text>
                        <Text style={[styles.underlineStyleBase, { backgroundColor: "rgba(0,0,0,0.01)", width: "20%", height: 50, textAlign: "center", paddingTop: 10 }]}>{password.substring(1, 2)}</Text>
                        <Text style={[styles.underlineStyleBase, { backgroundColor: "rgba(0,0,0,0.01)", width: "20%", height: 50, textAlign: "center", paddingTop: 10 }]}>{password.substring(2, 3)}</Text>
                        <Text style={[styles.underlineStyleBase, { backgroundColor: "rgba(0,0,0,0.01)", width: "20%", height: 50, textAlign: "center", paddingTop: 10 }]}>{password.substring(3, 4)}</Text>
                    </View>
                </LinearGradient>
                <ImageBackground source={require('../images/kidPinBg.png')} resizeMode='cover' style={[styles.bottomImg]} >
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        numColumns={3}
                        contentContainerStyle={{ marginTop: hp(16), alignSelf: 'center' }}
                        keyExtractor={(item, index) => index}
                    // ListFooterComponent={
                    //     <TouchableOpacity onPress={() => handleForgot()} style={{ marginTop: Spacing.PADDING_7 }}>
                    //         <Text style={{ color: Colors.WHITE, fontSize: Typography.FONT_SIZE_13, fontFamily: 'Montserrat-Rrgular' }}>Forgot PIN</Text>
                    //     </TouchableOpacity>
                    // }
                    />
                </ImageBackground>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    bottomImg: {
        height: hp(100),
        width: wp(100),
        position: 'absolute',
        top: hp(28)
    },
    keyTxt: {
        fontFamily: 'Cookies',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_35,
    },
    keyBg: {
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Spacing.MARGIN_20,
        paddingVertical: Spacing.MARGIN_15,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linear: {
        height: hp(11),
        width: wp(60),
        marginRight: Spacing.MARGIN_20,
        alignSelf: 'center',
        zIndex: 10,
        marginTop: hp(30),
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#C9E165'
    },
    input: {
        // borderBottomWidth:4,
        // borderColor:'#C9E165',
        // color:Colors.WHITE,
        // fontFamily:'Cookies',
        // fontSize:Typography.FONT_SIZE_25,
    },
    underlineStyleBase: {
        fontFamily: 'Cookies',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_25,
        borderBottomWidth: 3,
        borderBottomColor: '#C9E165',
        borderColor: Colors.PRIMARY
    },

})