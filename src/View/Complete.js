import React from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { images } from '../Constant/background';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';

export default function Complete() {
    const data = [
        {
            id: '1',
            title: 'Brushing Teeth',
            subTitle: 'Hygiene',
            status: 'Finished',
            date: 'Nov 12, 2021',
            task: '5',
            day: '7',
            streak: '+5',
            bonus: '+5',
            inr: '50'
        },
        {
            id: '2',
            title: 'Brushing Teeth',
            subTitle: 'Hygiene',
            status: 'Finished',
            date: 'Nov 12, 2021',
            task: '5',
            day: '7',
            streak: '+5',
            bonus: '+5',
            inr: '50'
        },
        {
            id: '3',
            title: 'Brushing Teeth',
            subTitle: 'Hygiene',
            status: 'Finished',
            date: 'Nov 12, 2021',
            task: '5',
            day: '7',
            streak: '+5',
            bonus: '+5',
            inr: '50'
        }
    ]
    const renderItem = ({ item }) => {
        return (
            <View style={[styles.listBorder]}>
                <Text style={[styles.listTitle]}>{item.title}</Text>
                <Text style={[styles.listSubTitle]}>{item.subTitle}</Text>
                <View style={[commonStyle.flexRow]}>
                    <Text style={[styles.listContain, { fontSize: Typography.FONT_SIZE_14, marginRight: Spacing.MARGIN_5, marginTop: Spacing.PADDING_2 }]}>{item.status}</Text>
                    <Text style={[styles.listContain, { fontSize: Typography.FONT_SIZE_14, marginTop: Spacing.PADDING_2 }]}>{item.date}</Text>
                </View>
                <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                    <Text style={[styles.listContain, { marginTop: Spacing.SCALE_12 }]}>{item.task} INR Finished Task</Text>
                    <Text style={[styles.listInr]}>{item.inr} INR</Text>
                </View>
                <Text style={[styles.listContain]}>{item.day} Days Day/s</Text>
                <Text style={[styles.listContain]}>{item.streak} INR Streak</Text>
                <Text style={[styles.listContain]}>{item.bonus} INR Bonus</Text>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE }}>
            <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                <View style={{ padding: Spacing.MARGIN_15 }}>

                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: Spacing.MARGIN_30 }}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, fontSize: Typography.FONT_SIZE_27, marginBottom: Spacing.MARGIN_10 }]}>Complete</Text>
                        }
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    listBorder: {
        borderWidth: 1,
        padding: Spacing.MARGIN_15,
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: Spacing.MARGIN_15
    },
    listTitle: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_22,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
    },
    listSubTitle: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_18,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '600',
    },
    listContain: {
        color: '#747474',
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '600',
        marginTop: Spacing.PADDING_3
    },
    listInr: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_25,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '700',
        marginRight: Spacing.MARGIN_20
    }
})