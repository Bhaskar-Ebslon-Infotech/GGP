import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getAllByKidId } from '../../api/KidGoals';
import { kidGoalsStatus } from '../../api/utils/StatusForKidGoals';
import { kidContext } from '../../Context/CurrentKidContext';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { LoaderContext, toggleModalContext } from '../../../App';

export default function ParentGoalsPage() {
    const navigation = useNavigation();
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const focused = useIsFocused()
    const [goalsArr, setGoalsArr] = useState([]);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;

    const handleGetAllGoalsFromKidId = async () => {
        setLoading(true)
        try {
            let { data: res } = await getAllByKidId(currentKid._id);
            console.log(JSON.stringify(res?.data, null, 2), "goal Data");
            let response = res.data.map(el => {
                el.productObj.remainingPercentage = 30
                el.productObj.bottomInr = el?.productObj?.reseller_markup_rules?.lower_limit ? el && el?.productObj?.reseller_markup_rules?.lower_limit : 0 - (el?.productObj?.reseller_markup_rules?.lower_limit ? el && el?.productObj?.reseller_markup_rules?.lower_limit : 0 * el?.productObj?.remainingPercentage / 100)
                return el
            }).filter(el => el.status == kidGoalsStatus.ingoals)
            if (res.data) {
                setGoalsArr(response)
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
            handleGetAllGoalsFromKidId()
        }
    }, [focused])








    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('GoalCart', { data: item?._id })} style={[styles.imgView, index == goalsArr.length - 1 && { marginBottom: Spacing.PADDING_20 }]}>
                <Image source={{ uri: item?.productObj?.item?.default_media[0]?.full_media_url }} resizeMode='cover' style={[styles.img]} />
                <View style={{ flexDirection: 'column', marginLeft: Spacing.PADDING_15 }}>
                    <Text style={[styles.title]}>{item?.productObj?.title}</Text>
                    <Text style={[styles.inr]}>Quantity - {item.quantity}</Text>
                    <Text style={[styles.inr]}>{item.productObj?.favcy_inventory_item?.amount} INR</Text>
                    <View style={{ borderWidth: 1, width: '55%', borderColor: Colors.PRIMARY, borderRadius: 5, marginTop: Spacing.PADDING_7 }}>
                        <View style={[commonStyle.flexRow,]}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.listStatus, { width: `${item?.productObj?.remainingPercentage ? item?.productObj?.remainingPercentage : 0}%` }]} ></LinearGradient>
                            {/* <View style={{ borderWidth: 2, borderColor: Colors.WHITE, width: '0%' }}></View> */}
                        </View>
                    </View>
                    <View style={{ width: '55%' }}>
                        <Text style={[styles.bottomInr]}>{item?.productObj?.bottomInr} INR</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            <FlatList
                data={goalsArr}
                contentContainerStyle={{ paddingBottom: hp(35) }}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={
                    <Text style={[styles.title, { marginTop: hp(4), textAlign: "center", flex: 1, display: "flex", alignSelf: "center" }]}>No Items in Cart</Text>
                }
            />

        </View>
    )
}
const styles = StyleSheet.create({
    topView: {
        justifyContent: 'space-between',
        borderWidth: 1,
        alignSelf: 'center',
        width: wp(92),
        borderRadius: 20,
        marginTop: Spacing.MARGIN_15,
        borderColor: '#DEDEDE',
        backgroundColor: Colors.WHITE
    },
    topText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        paddingVertical: Spacing.PADDING_7,
        textAlign: 'center',
    },
    img: {
        height: hp(20),
        width: wp(45),
        borderRadius: Spacing.MARGIN_20,
    },
    imgView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.MARGIN_20,
        flex: 1,
        // minHeight: hp(20),
        borderRadius: 20,
        backgroundColor: '#fff',
        // shadowColor: "#000",
        // borderColor: '#50505040',
        // shadowOffset: {
        //     width: 5,
        //     height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        elevation: 2,
    },
    title: {
        fontSize: Typography.FONT_SIZE_16,
        maxWidth: '70%',
        flexWrap: "wrap",
        display: "flex",
        fontFamily: 'Montserrat-SemiBold'
    },
    inr: {
        fontSize: Typography.FONT_SIZE_15,
        color: '#9A9A9A',
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.PADDING_4
    },
    btnView: {

        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,
    },
    listStatus: {
        borderWidth: 2,
    },
    bottomInr: {
        fontSize: Typography.FONT_SIZE_11,
        color: Colors.LIGHT_BLACK,
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.PADDING_2,
        alignSelf: 'flex-end'
    }
})