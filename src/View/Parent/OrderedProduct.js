import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import commonStyle from '../../Styles/parentStyle';
import Header from '../../Component/Header';
import { Colors, Spacing, Typography } from '../../Styles/theme'

export default function OrderedProduct() {
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
                <Text style={[styles.title, { width: '35%', fontSize: Typography.FONT_SIZE_14, }]}>{item.date}</Text>
                <Text style={[styles.title, { width: '35%', fontSize: Typography.FONT_SIZE_14, }]}>{item.item}</Text>
                <Text style={[styles.title, { width: '30%', fontSize: Typography.FONT_SIZE_14, }]}>{item.price}</Text>
            </View>
        )
    }

    return (

        <View style={{ backgroundColor: Colors.WHITE, flex: 1, }}>
            <Header logo={true} />
            <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_27, fontWeight: '700', marginBottom: Spacing.MARGIN_15, marginTop: Spacing.MARGIN_50 }]}>Ordered Product</Text>
            <View style={{ padding: Spacing.MARGIN_15 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    contentContainerStyle={{ borderWidth: 1, borderColor: '#C9E165' }}
                    ListHeaderComponent={
                        <>

                            <View style={[commonStyle.flexRow, { paddingStart: 15, paddingVertical: Spacing.PADDING_7, justifyContent: 'space-between', backgroundColor: '#C9E165', }]}>
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