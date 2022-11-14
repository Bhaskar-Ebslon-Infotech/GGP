import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Pressable } from 'react-native'
import Header from '../../Component/Header'
import { Colors, Spacing, Typography } from '../../Styles/theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, { useContext, useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { kidContext } from '../../Context/CurrentKidContext';
import { getAllByKidId } from '../../api/KidGoals';
import { kidGoalsStatus } from '../../api/utils/StatusForKidGoals';
import LinearGradient from 'react-native-linear-gradient';
import commonStyle from '../../Styles/commonStyle';
import { LoaderContext, toggleModalContext } from '../../../App';

export default function MyOrders() {
    const navigation = useNavigation();
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const focused = useIsFocused()
    const [loading, setLoading] = useContext(LoaderContext);
    const [goalsArr, setGoalsArr] = useState([]);
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
                el.productObj.bottomInr = el?.productObj?.reseller_markup_rules?.lower_limit ? el?.productObj?.reseller_markup_rules?.lower_limit : 0 - (el?.productObj?.reseller_markup_rules?.lower_limit ? el?.productObj?.reseller_markup_rules?.lower_limit : 0 * el?.productObj?.remainingPercentage / 100)
                return el
            }).filter(el => el.status == kidGoalsStatus.completed)
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






    // onPress={() => navigation.navigate('GoalCart', { data: item._id })}
    const renderItem = ({ item, index }) => {
        return (
            <Pressable style={[styles.imgView, { maxWidth: wp(95) }, index == goalsArr.length - 1 && { marginBottom: Spacing.PADDING_20 }]}>
                <Image source={{ uri: item?.productObj?.item?.default_media[0]?.full_media_url }} resizeMode='cover' style={[styles.img]} />
                <View style={{ flexDirection: 'column', marginLeft: Spacing.PADDING_15 }}>
                    <Text style={[styles.title]}>{item?.productObj?.title} </Text>
                    <Text style={[styles.title, { fontSize: 14, fontFamily: 'Montserrat-Regular' }]}>Quantity ({item.quantity})</Text>
                    <Text style={[styles.title]}></Text>
                    <View style={styles.flexRow}>
                        <Text style={[styles.inr, { fontSize: 12, textDecorationLine: "line-through", marginRight: 10 }]}>{item.productObj?.reseller_markup_rules?.upper_limit} INR</Text>
                        <Text style={[styles.inr, { fontSize: 12 }]}>{item.productObj?.reseller_markup_rules?.lower_limit ? item.productObj?.reseller_markup_rules?.lower_limit : 0} INR</Text>
                    </View>
                    <Text style={[styles.inr, { fontSize: 12 }]}>Status - <Text style={{ color: "green", fontWeight: "800" }}>ORDERED</Text></Text>
                    <Text style={[styles.inr, { fontSize: 12 }]}>Ordered On - {item.favcyCartObj.items[0].created_at}</Text>
                </View>
            </Pressable>
        )
    }
    return (
        <>
            <Header style={{ width: wp(100) }} logo={true} />
            <View style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Text style={[styles.cookiesTitle, { marginTop: Spacing.MARGIN_30 }]}>My Orders</Text>
                <FlatList
                    data={goalsArr}
                    // contentContainerStyle={{marginBottom:200}}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ListEmptyComponent={
                        <Text style={[styles.title, { marginTop: hp(4), textAlign: "center", flex: 1, display: "flex", alignSelf: "center" }]}>No Pending/Completed Orders</Text>
                    }
                />
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    cookiesTitle: {
        fontFamily: 'Cookies',
        marginVertical: Spacing.MARGIN_10,
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_20
    },
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
    flexRow: {
        display: "flex",
        flexDirection: "row"
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
        width: wp(35),
        borderRadius: Spacing.MARGIN_20,
    },
    imgView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.MARGIN_20,
        width: '99%',
        minHeight: hp(20),
        shadowColor: "#000",
        borderRadius: 20,
        backgroundColor: '#fff',
        borderColor: '#50505040',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    title: {
        fontSize: Typography.FONT_SIZE_16,
        maxWidth: '80%',
        // backgroundColor: "red",
        flexWrap: "wrap",
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