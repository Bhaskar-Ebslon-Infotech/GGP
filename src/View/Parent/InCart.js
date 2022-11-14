import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import Header from '../../Component/Header';
import { getAllByKidId } from '../../api/KidGoals';
import { kidContext } from '../../Context/CurrentKidContext';
import { LoaderContext, toggleModalContext } from '../../../App';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { kidGoalsStatus } from '../../api/utils/StatusForKidGoals';

export default function InCart() {
    const navigation = useNavigation();
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const focused = useIsFocused()
    const [goalsArr, setGoalsArr] = useState([]);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [loading, setLoading] = useContext(LoaderContext);


    const handleGetAllGoalsFromKidId = async () => {
        setLoading(true)
        try {
            let { data: res } = await getAllByKidId(currentKid._id);
            let response = res.data.map(el => {
                el.productObj.remainingPercentage = 30
                el.productObj.bottomInr = el?.productObj?.reseller_markup_rules?.lower_limit ? el?.productObj?.reseller_markup_rules?.lower_limit : 0 - (el?.productObj?.reseller_markup_rules?.lower_limit ? el?.productObj?.reseller_markup_rules?.lower_limit : 0 * el?.productObj?.remainingPercentage / 100)
                return el
            }).filter(el => el.status == kidGoalsStatus.incart)
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

    const data = [
        {
            id: '1',
            date: '11/01/2021',
            item: 'Bike',
            price: '5000',
        },
        {
            id: '2',
            date: '11/01/2021',
            item: 'Bike',
            price: '5000',
        },
        {
            id: '3',
            date: '11/01/2021',
            item: 'Bike',
            price: '5000',
        },
        {
            id: '4',
            date: '11/01/2021',
            item: 'Bike',
            price: '5000',
        },
        {
            id: '5',
            date: '11/01/2021',
            item: 'Bike',
            price: '5000',
        },
        {
            id: '6',
            date: '11/01/2021',
            item: 'Bike',
            price: '5000',
        },
        {
            id: '7',
            date: '11/01/2021',
            item: 'Bike',
            price: '5000',
        },
        {
            id: '8',
            date: '11/01/2021',
            item: 'Bike',
            price: '5000',
        },

    ]

    const renderItem = ({ item, index }) => {
        return (
            <View style={[commonStyle.flexRow, { paddingStart: Spacing.MARGIN_15, backgroundColor: index % 2 == 0 ? '#FFFFFF' : '#F2F4F6', paddingVertical: Spacing.PADDING_7, justifyContent: 'center' }]}>
                <Text style={[styles.title, { width: '35%', fontSize: Typography.FONT_SIZE_14, }]}>{new Date(item?.createdAt).toDateString()}</Text>
                <Text style={[styles.title, { width: '35%', fontSize: Typography.FONT_SIZE_14, }]}>{item?.productObj?.title}</Text>
                <Text style={[styles.title, { width: '30%', fontSize: Typography.FONT_SIZE_14, }]}>{item.productObj?.reseller_markup_rules?.lower_limit ? item.productObj?.reseller_markup_rules?.lower_limit : 0}  INR</Text>
            </View>
        )
    }

    return (

        <View style={{ backgroundColor: Colors.WHITE, flex: 1, }}>
            <Header logo={true} />
            <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_27, fontWeight: '700', marginBottom: Spacing.MARGIN_15, marginTop: Spacing.MARGIN_50 }]}>In Cart</Text>
            <View style={{ padding: Spacing.MARGIN_15 }}>
                <FlatList
                    data={goalsArr}
                    renderItem={renderItem}
                    contentContainerStyle={{ borderWidth: 1, borderColor: '#C9E165', }}
                    ListHeaderComponent={
                        <>

                            <View style={[commonStyle.flexRow, { paddingStart: Spacing.MARGIN_15, paddingVertical: Spacing.PADDING_7, justifyContent: 'space-between', backgroundColor: '#C9E165', }]}>
                                <Text style={[styles.title, { width: '35%' }]}>Date</Text>
                                <Text style={[styles.title, { width: '35%' }]}>Item</Text>
                                <Text style={[styles.title, { width: '30%' }]}>Price</Text>
                            </View>
                        </>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
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
