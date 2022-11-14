import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import commonStyle from '../../Styles/parentStyle'
import { Colors, Typography, Spacing } from '../../Styles/theme'
import Header from '../../Component/Header'
import { useNavigation } from '@react-navigation/native'
import { kidContext } from '../../Context/CurrentKidContext'
import { LoaderContext, toggleModalContext } from '../../../App'
import { getKidWallet, getUserWallet } from '../../api/wallet'
import { getBlessingsByKidId } from '../../api/Blessings'

export default function Blessing() {
    const navigation = useNavigation()
    const [walletObj, setWalletObj] = useState({});
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [transactionArr, setTransactionArr] = useState([]);
    // console.log('currentKid: ', currentKid);

    const handleGetUserWallet = async () => {
        setLoading(true)
        try {
            let { data: res } = await getBlessingsByKidId(currentKid._id);
            console.log('this is data: ', JSON.stringify(res?.data, null, 2));
            if (res?.data) {
                setTransactionArr(res.data.reverse())
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
                        paddingVertical: Spacing.PADDING_7,
                        justifyContent: 'center',
                    },
                ]}>
                <Text
                    style={[
                        styles.title,
                        { flex: 1, fontSize: Typography.FONT_SIZE_14 },
                    ]}>
                    {new Date(item?.createdAt).toDateString()}
                </Text>
                <Text
                    style={[
                        styles.title,
                        { flex: 1, fontSize: Typography.FONT_SIZE_14 },
                    ]}>
                    {item?.name}
                </Text>
                <Text
                    style={[
                        styles.title,
                        { flex: 1, textAlign: "center", fontSize: Typography.FONT_SIZE_14 },
                    ]}>
                    {item?.amount}
                </Text>
            </View>
        );
    };

    return (

        <View style={{ backgroundColor: Colors.WHITE, flex: 1, }}>
            <Header logo={true} />
            <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_27, fontWeight: '700', marginBottom: Spacing.PADDING_15, marginTop: 20 }]}>Blessings</Text>
            <FlatList
                data={transactionArr}
                renderItem={renderItem}
                contentContainerStyle={{ borderWidth: 1, borderColor: '#C9E165', marginHorizontal: Spacing.MARGIN_15 }}
                ListHeaderComponent={
                    <>
                        <View style={[commonStyle.flexRow, { paddingStart: Spacing.PADDING_15, paddingVertical: Spacing.PADDING_7, justifyContent: 'space-between', backgroundColor: '#C9E165', }]}>
                            <Text style={[styles.title, { width: '35%' }]}>Date</Text>
                            <Text style={[styles.title, { width: '35%' }]}>Sent By</Text>
                            <Text style={[styles.title, { width: '30%' }]}>Amount</Text>
                        </View>
                    </>
                }
                keyExtractor={item => item._id}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: Typography.FONT_SIZE_16,
        color: '#747474',
        fontFamily: 'Montserrat-SemiBold',
    },

})