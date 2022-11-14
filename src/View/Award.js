import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonStyle from '../Styles/commonStyle';
import { ENTYPO } from '../Styles/theme/Icons';
import { Colors, Spacing, Typography } from '../Styles/theme/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Mission from '../images/svg/mission';
import Play from '../images/svg/play';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import { images } from '../Constant/background';
import { LoaderContext, toggleModalContext } from '../../App';
import { getAwardsByUserId } from '../api/Award';


export default function Award() {
    const focused = useIsFocused()
    const navigation = useNavigation();
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [awardsArr, setAwardsArr] = useState([]);

    const handleGetAwards = async () => {
        setLoading(true)
        try {
            let { data: res } = await getAwardsByUserId()
            console.log(JSON.stringify(res.data, null, 2))
            if (res && res?.message) {
                setAwardsArr(res?.data)
            }
        }
        catch (error) {
            if (error?.response?.data?.message) {
                setToggleModal(true)
                setMessage(error?.response?.data?.message)
            } else {
                setToggleModal(true)
                setMessage(error?.message)
            }
        }
        setLoading(false)
    }



    useEffect(() => {
        if (focused) {
            handleGetAwards()
        }
    }, [focused])
    const renderItem = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: Spacing.MARGIN_5, }}>
                <TouchableOpacity onPress={() => item?.isAchieved && navigation.navigate('ShareAward', { data: item })} style={{ alignContent: 'center', alignSelf: 'center', alignItems: 'center', marginTop: Spacing.MARGIN_20, width: wp(28), }}>
                    <Text style={[styles.awardText]}>{item?.name}</Text>
                    {/* { */}

                    <Image source={{ uri: item?.imageUrl }} resizeMode='contain' style={[styles.awardImg, { opacity: item.isAchieved ? 1.0 : 0.2 }]} />

                    {/* // <Image source={require('../images/award.png')} resizeMode='contain' style={[styles.awardImg]} /> */}
                    {/* } */}
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: "white" }}>
            <ImageBackground source={images.backGround} style={[CommonStyle.fullSize]}>
        <FlatList
        ListHeaderComponent={

<View style={{ paddingHorizontal: Spacing.MARGIN_15, marginBottom: Spacing.MARGIN_5 }}>

                    <Image source={require('../images/msg.png')} resizeMode='contain' style={[styles.topPoster]} />
                    <View style={[CommonStyle.flexRow, { width: '100%', alignContent: 'center', marginBottom: Spacing.MARGIN_30 }]}>
                        <Pressable style={[styles.topBtn, { marginRight: Spacing.MARGIN_20, backgroundColor: '#CCBDFF', }]}>
                            <View style={[CommonStyle.flexRow, { alignSelf: 'center' }]}>
                                <Text style={[styles.btnText, { color: Colors.LIGHT_BLACK }]}>Missions  </Text>
                                <Mission height={hp(5)} width={wp(6)} />
                            </View>
                        </Pressable>
                        <Pressable style={[styles.topBtn, { backgroundColor: '#EC892B', paddingVertical: 1, }]}>
                            <View style={[CommonStyle.flexRow, { alignSelf: 'center' }]}>
                                <Text style={[styles.btnText, { color: Colors.WHITE, marginRight: Spacing.MARGIN_5 }]}>Videos</Text>
                                <Play height={hp(5)} width={wp(4)} />
                            </View>
                        </Pressable>
                    </View>

                    <Text style={[styles.headTxt]}>Gain More Awards</Text>
                    <View style={[styles.border, { marginBottom: hp(10) }]}>
                        <Text style={[CommonStyle.title, { color: Colors.PRIMARY }]}>
                            Awards
                        </Text>
                        <FlatList
                            data={awardsArr}
                            numColumns={3}
                            scrollEnabled={false}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
                            ListEmptyComponent={
                                <Text style={[styles.headTxt]}>No Awards found </Text>
                            }
                        />
                        {/* <Text style={[styles.headTxt, { marginTop: Spacing.MARGIN_20, marginBottom: 20 }]}>and so forth..</Text> */}
                    </View>
                </View>


        }
        data={[]}
        render={()=>null}
        
        
        />
                
            </ImageBackground>
        </View >
    )
}
const styles = StyleSheet.create({
    topPoster: {
        height: hp(25),
        width: wp(90),
        marginTop: Spacing.MARGIN_50,
    },
    topBtn: {
        width: '47%',
        borderRadius: 30
    },
    btnText: {
        textAlign: 'center',
        fontSize: Typography.FONT_SIZE_17,
        fontWeight: '700',
        fontFamily: 'Cookies',
        alignItems: 'center'
    },
    headTxt: {
        fontFamily: 'Cookies',
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.LIGHT_BLACK,
        textAlign: 'center',
    },
    border: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: Colors.SECONDARY,
        borderRadius: 20,
        backgroundColor: "white",
        marginTop: Spacing.MARGIN_40,
        paddingVertical: Spacing.PADDING_20,
        marginBottom: Spacing.MARGIN_30

    },
    awardImg: {
        alignSelf: 'center',
        height: hp(12),
        width: wp(22),

    },
    awardText: {
        fontFamily: 'Cookies',
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.LIGHT_BLACK,
        textAlign: 'center',
        marginBottom: Spacing.PADDING_7
    }
})