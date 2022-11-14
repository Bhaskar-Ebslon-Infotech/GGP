import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, Pressable } from 'react-native';
import LoginHeader from '../Component/LoginHeader';
import { Colors, Spacing, Typography } from '../Styles/theme/index';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import commonStyle from '../Styles/commonStyle';
import { images } from '../Constant/background';
import LinearGradient from 'react-native-linear-gradient';
import { getKidsListByNumber, getPhoneNumber, userData } from '../api/user';
import { useIsFocused } from '@react-navigation/native';
import { kidContext } from '../Context/CurrentKidContext';
import { LoaderContext, toggleModalContext } from '../../App';

export default function KidWelcome(props) {
    const focused = useIsFocused()
    const [kidArr, setKidArr] = useState([]);
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;

    const renderItem = ({ item }) => {
        return (
            <Pressable onPress={() => { setCurrentKid(item?.kidData); console.log(currentKid, "post selection"); console.log(item.kidData, "selected obj"); }}>
                <View style={[checkSelected(item?.kidData?._id) && styles.selected, styles.listWhiteBg]}>
                    <Image source={require('../images/Dancer.png')} resizeMode='contain' style={[styles.listImg]} />
                </View>
                <Text style={[styles.listName]}>{item?.kidData?.firstName}</Text>
            </Pressable>
        )
    }





    const handleGetUserData = async () => {
        setLoading(true)
        try {
            let phone = await getPhoneNumber()
            console.log(phone)

            const { data: res } = await getKidsListByNumber(phone);
            if (res.success) {
                if (res?.data?.familyObj?.kidIdArr.length == 0) {
                    setToggleModal(true)
                    setMessage("No Kid Added Yet")
                }
                console.log(JSON.stringify(res?.data?.familyObj?.kidIdArr, null, 2), "family obj")
                setKidArr(res?.data?.familyObj?.kidIdArr);
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
    };




    const checkSelected = (id) => {
        if (currentKid._id && currentKid._id == id) {
            return true
        }
        else {
            false
        }
    }

    useEffect(() => {
        if (focused) {
            handleGetUserData();
        }
    }, [focused]);





    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <LoginHeader />
            <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                <View style={{ paddingHorizontal: Spacing.MARGIN_20, }}>
                    <Image source={require('../images/forgetTeady.png')} style={[styles.teady]} />
                    <View style={{ marginTop: hp(34) }}>
                        <View style={[styles.listBg]}>
                            <Text style={[styles.listHead]}>Welcome!</Text>
                            <FlatList
                                data={kidArr}
                                renderItem={renderItem}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => `${index}-${new Date().getTime()}`}
                            />
                        </View>

                        <TouchableOpacity onPress={() => currentKid ? props.navigation.navigate('KidPin') : (setToggleModal(true), setMessage("Please Choose your Kid"))} style={{ marginTop: Spacing.MARGIN_40 }}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn, { borderRadius: 25 }]} >
                                <View style={[styles.btnView, { width: '99%' }]}>
                                    <Text style={[styles.btnText]}>Enter</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    btnView: {
        // backgroundColor: Colors.WHITE,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,
        height: hp(6)
    },

    selected: {
        // borderColor: "red",
        borderColor: Colors.GRADIENT1,
        borderWidth: 2,

    },


    btnText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '600',
        paddingVertical: Spacing.PADDING_7,
        fontSize: Typography.FONT_SIZE_16,
        alignSelf: 'center'
    },
    teady: {
        height: hp(26),
        width: wp(45),
        alignSelf: 'center',
        marginTop: hp(15),
        zIndex: -10,
        position: 'absolute',

    },
    listBg: {
        backgroundColor: '#C9E165',
        paddingVertical: Spacing.PADDING_7,
        paddingHorizontal: Spacing.MARGIN_20,
        borderRadius: 20,
        paddingBottom: Spacing.MARGIN_10
    },
    listHead: {
        textAlign: 'center',
        color: '#353535',
        fontSize: Typography.FONT_SIZE_18,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: Spacing.MARGIN_15
    },
    listWhiteBg: {
        backgroundColor: Colors.WHITE,
        height: hp(15),
        width: wp(25),
        borderRadius: 10,
        marginRight: Spacing.MARGIN_10,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listImg: {
        height: hp(14),
        width: wp(25),
        alignSelf: 'center',
    },
    listName: {
        fontSize: Typography.FONT_SIZE_13,
        color: Colors.LIGHT_BLACK,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.PADDING_4
    }
})