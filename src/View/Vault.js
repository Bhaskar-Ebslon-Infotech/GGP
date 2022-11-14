import React from 'react'
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import Pie from 'react-native-pie';
import Top from '../images/svg/topArrow';
import Down from '../images/svg/downArrow'


export default function Vault() {
    const data = [
        {
            id: '1',
            img: require('../images/rocket.png'),
            title: 'Video',
            subTitle: 'Bake Cookies',
            inr: '150',
            duration: '36:18',
            backgroundColor: '#AA23AD',
            borderColor: '#EC892B',
        },
        {
            id: '2',
            img: require('../images/rocket.png'),
            title: 'Video',
            subTitle: 'Bake Cookies',
            inr: '150',
            duration: '36:18',
            backgroundColor: '#CCBDFF',
            borderColor: '#C9E165',
        },
        {
            id: '3',
            img: require('../images/rocket.png'),
            title: 'Video',
            subTitle: 'Bake Cookies',
            inr: '150',
            duration: '36:18',
            backgroundColor: '#785BDF',
            borderColor: '#EE2727',
        },
        {
            id: '4',
            img: require('../images/rocket.png'),
            title: 'Video',
            subTitle: 'Bake Cookies',
            inr: '150',
            duration: '36:18',
            backgroundColor: '#785BDF',
            borderColor: '#EE2727',
        },
        {
            id: '5',
            img: require('../images/rocket.png'),
            title: 'Video',
            subTitle: 'Bake Cookies',
            inr: '150',
            duration: '36:18',
            backgroundColor: '#785BDF',
            borderColor: '#EE2727',
        },

    ]
    const renderItem = ({ item }) => {
        return (
            <View style={{ marginTop: Spacing.MARGIN_20 }}>
                <View style={[commonStyle.flexRow]}>
                    <View style={{ flexDirection: 'column', borderWidth: 1, borderColor: item.borderColor, padding: Spacing.MARGIN_5, borderRadius: 10 }}>
                        <View style={{ backgroundColor: item.backgroundColor, padding: Spacing.MARGIN_15, borderRadius: 10 }}>
                            <Image source={item.img} resizeMode='contain' style={{ height: hp(7), width: wp(12) }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', width: '70%', marginLeft: Spacing.MARGIN_20 }}>
                        <Text style={[styles.title]}>{item.title}</Text>
                        <View style={[commonStyle.flexRow, { justifyContent: 'space-between', width: '97%' }]}>
                            <Text style={[styles.subTitle]}>{item.subTitle}</Text>
                            <Text style={[styles.listInr]}>+ {item.inr} INR</Text>
                        </View>
                        <Text style={[styles.duration]}>{item.duration}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ paddingHorizontal: Spacing.MARGIN_20, backgroundColor: Colors.WHITE, flex: 1 }}>

            <FlatList
                data={data}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Spacing.MARGIN_20, }}
                ListHeaderComponent={
                    <>
                        <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_30 }]}>
                            <Image source={require('../images/boy1.png')} resizeMode='contain' style={[styles.boy]} />
                            <View style={{ flexDirection: 'column', marginLeft: Spacing.MARGIN_20 }}>
                                <Text style={[styles.name]}>John’s Piggy Bank</Text>
                                <Text style={[styles.inr]}>200 INR</Text>
                            </View>
                        </View>
                        <View style={[commonStyle.flexRow, { marginVertical: Spacing.PADDING_20 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
                                <Pie
                                    radius={70}
                                    sections={[
                                        {
                                            percentage: 10,
                                            color: '#EC892B',
                                        },
                                        {
                                            percentage: 40,
                                            color: '#785BDF',
                                        },
                                        {
                                            percentage: 25,
                                            color: '#C9E165',
                                        },
                                        {
                                            percentage: 25,
                                            color: '#AA23AD',
                                        },
                                    ]}
                                    strokeCap={'butt'}
                                />
                                <TouchableOpacity>
                                    <Down height={hp(4)} width={wp(6)} style={{ marginLeft: -Spacing.PADDING_15 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: Spacing.MARGIN_20, alignItems: 'flex-end' }}>
                                <Pie
                                    radius={70}
                                    sections={[
                                        {
                                            percentage: 70,
                                            color: '#CCBDFF',
                                        },
                                        {
                                            percentage: 30,
                                            color: '#EE2727',
                                        },

                                    ]}
                                    strokeCap={'butt'}
                                />
                                <TouchableOpacity>
                                    <Top height={hp(4)} width={wp(6)} style={{ marginLeft: -Spacing.PADDING_10 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                }
                keyExtractor={(item, index) => index}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    boy: {
        height: hp(15),
        width: wp(28)
    },
    name: {
        fontSize: Typography.FONT_SIZE_19,
        fontFamily: 'MontserratH3-SemiBold',
        fontWeight: '500',
        color: Colors.LIGHT_BLACK
    },
    inr: {
        fontSize: Typography.FONT_SIZE_25,
        fontFamily: 'MontserratH1-SemiBold',
        fontWeight: '800',
        color: Colors.LIGHT_BLACK
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: Typography.FONT_SIZE_18,
        color: Colors.LIGHT_BLACK,
        fontWeight: '500',
    },
    subTitle: {
        fontFamily: 'Montserrat',
        fontSize: Typography.FONT_SIZE_18,
        color: Colors.LIGHT_BLACK,
        fontWeight: '700',
    },
    listInr: {
        fontFamily: 'MontserratH3',
        fontSize: Typography.FONT_SIZE_18,
        color: Colors.PRIMARY,
        fontWeight: '700',
    },
    duration: {
        fontFamily: 'Montserrat',
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.PRIMARY,
        fontWeight: '500',
    }
})