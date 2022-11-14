import React, { useEffect, useContext, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import commonStyle from '../Styles/commonStyle';
import { images } from '../Constant/background';
import { BackgroundImageValContext } from '../Context/BackgroundContext';
import { toggleModalContext } from '../../App';
import { getKidDashboardBackgroundImg, setKidDashboardBackgroundImg } from '../api/user';


export default function Backgrounds() {

    const navigation = useNavigation();
    const focused = useIsFocused()
    const [backgroundImageVal, setBackgroundImageVal] = useContext(BackgroundImageValContext)
    const [selectedBg, setSelectedBg] = useState(backgroundImageVal);
    const [localSelected, setLocalSelected] = useState(0);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const data = [
        {
            id: 1,
            img: require('../images/kbg1.png'),
        },
        {
            id: 2,
            img: require('../images/kbg2.png'),
        },
        {
            id: 3,
            img: require('../images/kbg3.png'),
        },
        {
            id: 4,
            img: require('../images/kbg4.png'),
        },
        {
            id: 5,
            img: require('../images/kbg5.png'),
        },
    ]
    const handleSave = async () => {
        setBackgroundImageVal(selectedBg);
        setToggleModal(true);
        console.log(selectedBg)
        await setKidDashboardBackgroundImg(JSON.stringify(selectedBg));
        setMessage("Background Changed");
        // navigation.navigate('Saved')
        navigation.navigate('Dashboard')
    }

    const handleGetKidBgImage = async () => {
        const backgroundDash = await getKidDashboardBackgroundImg()
        console.log(backgroundDash, "Kid Dashboard Background Image")
        setSelectedBg(JSON.parse(backgroundDash));
    }


    useEffect(() => {
        if (focused) {
            handleGetKidBgImage()
        }
    }, [focused])


    const renderItem = ({ item }) => {
        return (
            <Pressable onPress={() => { console.log(item); setLocalSelected(item); setSelectedBg(item) }} style={[styles.box, { borderWidth: selectedBg && selectedBg.id == item.id ? 4 : 2, borderColor: selectedBg && selectedBg.id == item.id ? Colors.GRADIENT1 : "transparent" }]}>
                <Image source={item.img} resizeMode='cover' style={{ height: "100%", width: "100%", borderRadius: 16 }} />
                {/* {item.img == '' &&(
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.box]} >
                    <>
                    </>
                </LinearGradient> */}
            </Pressable>
        )
    }
    return (
        <View style={{ backgroundColor: "white" }}>
            <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                <View style={[styles.view]}>
                    <Text style={[CommonStyle.title, { color: Colors.PRIMARY }]}>Backgrounds</Text>

                    <View style={{ marginTop: Spacing.MARGIN_40 }}>
                        <FlatList
                            horizontal={true}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <TouchableOpacity onPress={() => handleSave()} style={{ paddingHorizontal: Spacing.PADDING_25, marginTop: Spacing.MARGIN_60 }}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                            <View style={[styles.btnView]}>
                                <Text style={[styles.btnText]}>Save</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        marginTop: Spacing.MARGIN_100
    },
    box: {
        height: hp('47%'),
        width: wp(50),
        borderWidth: 2,
        borderRadius: 20,
        marginHorizontal: Spacing.MARGIN_10,
        borderColor: '#C9E165',
        alignSelf: 'center',
        justifyContent: 'center',

    },
    lin: {
        height: hp('35%'),
        width: wp(50),
        borderWidth: 2,
        borderRadius: 20,
        marginHorizontal: Spacing.MARGIN_10,
        borderColor: '#C9E165',
        alignSelf: 'center',
        justifyContent: 'center',

    },
    linearBtn: {
        height: hp(6),
        width: '100%',
        borderRadius: 30,
        padding: Spacing.PADDING_2,
        paddingHorizontal: Spacing.PADDING_4
    },
    btnView: {
        backgroundColor: Colors.WHITE,
        height: "100%",
        width: "100%",
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold'
    }

})