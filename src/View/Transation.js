import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getUserWallet } from '../api/wallet';
import CommonHeader from '../Component/CommonHeader';
import commonStyle from '../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { kidContext } from '../Context/CurrentKidContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LoaderContext, toggleModalContext } from '../../App';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Home from '../images/svg/homeBtn';
import Back from '../images/svg/parentsvg/back';
import { useNavigation } from '@react-navigation/native';
export default function Transation() {
    const navigation = useNavigation()
    const [walletObj, setWalletObj] = useState({});
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;

    // console.log('currentKid: ', currentKid);

    const handleGetUserWallet = async () => {
        setLoading(true)
        try {
            let { data: res } = await getUserWallet();
            console.log('this is data: ', JSON.stringify(res?.data, null, 2));
            if (res?.data) {
                setWalletObj(res?.data);
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

    useEffect(() => {
        handleGetUserWallet();
    }, []);

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={[
                    commonStyle.flexRow,
                    {
                        paddingStart: Spacing.PADDING_15,
                        backgroundColor: index % 2 == 0 ? '#FFFFFF' : '#F2F4F6',
                        justifyContent: 'center',
                    },
                ]}>
                <Text
                    style={[
                        styles.title,
                        { flex: 1, textAlign: "center", borderRightColor: '#C9E165', fontSize: Typography.FONT_SIZE_14, borderRightWidth: 1, paddingVertical: Spacing.PADDING_7 },
                    ]}>
                    {`${new Date(item?.on).getDate()}/${new Date(item?.on).getMonth() + 1}/${new Date(item?.on).getFullYear()}`}
                </Text>
                <Text
                    style={[
                        styles.title,
                        { flex: 1, textAlign: "center", borderRightColor: '#C9E165', fontSize: Typography.FONT_SIZE_14, borderRightWidth: 1, paddingVertical: Spacing.PADDING_7 },
                    ]}>
                    {item?.status ? item?.status : "SUCCESS"}
                </Text>
                <Text
                    style={[
                        styles.title,
                        { flex: 1, textAlign: "center", fontSize: Typography.FONT_SIZE_14, paddingVertical: Spacing.PADDING_7 },
                    ]}>
                    {item?.amount}
                </Text>
            </View>
        );
    };

    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <View style={{ padding: Spacing.MARGIN_15, }}>
                <FlatList
                    data={walletObj?.transactionHistoryArr}
                    renderItem={renderItem}
                    contentContainerStyle={{ borderWidth: 1, borderColor: '#C9E165', paddingBottom: hp(10) }}
                    ListHeaderComponent={
                        <>
                            <Text style={[styles.head1, { marginTop: Spacing.MARGIN_30 }]}>
                                {walletObj?.userObj?.firstName}'s Wallet History
                            </Text>
                            <Text
                                style={[
                                    commonStyle.title,
                                    {
                                        fontSize: Typography.FONT_SIZE_27,
                                        fontWeight: '700',
                                        marginBottom: Spacing.PADDING_2,
                                        marginTop: Spacing.PADDING_7,
                                    },
                                ]}>
                                {walletObj?.amount}
                            </Text>
                            <Text
                                style={[
                                    styles.head1,
                                    {
                                        fontSize: Typography.FONT_SIZE_15,
                                        marginBottom: Spacing.MARGIN_30,
                                    },
                                ]}>
                                Available Amount
                            </Text>
                            <View
                                style={[
                                    commonStyle.flexRow,
                                    {
                                        paddingStart: Spacing.MARGIN_15,
                                        // ,
                                        justifyContent: 'space-between',
                                        backgroundColor: '#C9E165',
                                    },
                                ]}>
                                <Text style={[styles.title, { borderRightColor: '#C9E165', paddingVertical: Spacing.PADDING_7, borderRightWidth: 1, width: '33.3%', textAlign: "center" }]}>Date</Text>
                                <Text style={[styles.title, { borderRightColor: '#C9E165', paddingVertical: Spacing.PADDING_7, borderRightWidth: 1, width: '33.3%', textAlign: "center" }]}>Status</Text>
                                {/* <Text style={[styles.title, { width: '35%' }]}>Item</Text> */}
                                <Text style={[styles.title, { paddingVertical: Spacing.PADDING_7, width: '33.3%', textAlign: "center" }]}>Amount</Text>
                            </View>
                        </>
                    }
                    ListEmptyComponent={
                        <>
                            <View
                                style={[
                                    commonStyle.flexRow,
                                    {
                                        paddingStart: Spacing.PADDING_15,
                                        backgroundColor: '#FFFFFF',
                                        paddingVertical: Spacing.PADDING_7,
                                        justifyContent: 'center',
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.title,
                                        { flex: 1, fontSize: Typography.FONT_SIZE_14 },
                                    ]}>
                                    No Transations found for you
                                </Text>

                            </View>


                        </>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
            <View style={[styles.bottomView]}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}><Home height={hp(4)} width={wp(7)} /></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}><Back height={hp(4)} width={wp(7)} /></TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: Typography.FONT_SIZE_16,
        color: '#747474',
        fontFamily: 'Montserrat-SemiBold',
    },
    head1: {
        fontSize: Typography.FONT_SIZE_22,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.LIGHT_BLACK,
        textAlign: 'center',
    },
    bottomView: {
        backgroundColor: Colors.WHITE,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: wp(100),
        borderTopWidth: 1,
        borderColor: '#EAEAEA',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    }
});
