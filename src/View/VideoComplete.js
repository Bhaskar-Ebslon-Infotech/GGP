import React from 'react'
import { View, Text, FlatList, Image, StyleSheet, ImageBackground } from 'react-native';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { images } from '../Constant/background';

export default function VideoComplete() {
    const data = [
        {
            id: '1',
            img: require('../images/img1.png'),
            title: 'Title asd',
            duration: 'Duration',
            reward: '5',
            bonus: '0',
            inr: '55',
        },
        {
            id: '2',
            img: require('../images/img2.png'),
            title: 'Title',
            duration: 'Duration',
            reward: '5',
            bonus: '0',
            inr: '55',
        }
    ]
    const renderItem = ({ item }) => {
        return (
            <View style={{ padding: Spacing.PADDING_2 }}>
                <View style={[commonStyle.flexRow, styles.listBorder]}>
                    <View style={{ flexDirection: 'column', height: hp(25), }}>
                        <Image source={item.img} style={[styles.listImg]} />
                    </View>
                    <View style={{ flexDirection: 'column', marginLeft: Spacing.MARGIN_15 }}>
                        <Text style={[styles.listTitle]}>{item.title}</Text>
                        <Text style={[styles.contain, { marginVertical: Spacing.PADDING_2 }]}>{item.duration}</Text>
                        <View style={[commonStyle.flexRow]}>
                            <Text style={[styles.contain, { fontWeight: '700' }]}>Reward</Text>
                            <Text style={[styles.contain, { marginLeft: Spacing.MARGIN_5 }]}>{item.reward} INR</Text>
                        </View>
                        <View style={[commonStyle.flexRow, { marginBottom: Spacing.MARGIN_5 }]}>
                            <Text style={[styles.contain, { fontWeight: '700' }]}>Bonus</Text>
                            <Text style={[styles.contain, { marginLeft: Spacing.MARGIN_5 }]}>{item.bonus} INR</Text>
                        </View>

                        <Text style={[styles.listTitle]}>{item.inr} INR</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <ImageBackground source={images.backGround} style={[commonStyle.fullSize, { backgroundColor: Colors.WHITE, flex: 1 }]}>
            <View style={{ padding: Spacing.MARGIN_15, }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    ListHeaderComponent={
                        <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, fontSize: Typography.FONT_SIZE_27, marginBottom: Spacing.MARGIN_10 }]}>Complete</Text>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    listImg: {
        height: '100%',
        width: wp(40),
        borderRadius: 20,
    },
    listBorder: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: Colors.WHITE,
        marginTop: Spacing.MARGIN_15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    listTitle: {
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_22,
        fontWeight: '600'
    },
    contain: {
        fontFamily: 'Montserrat-Regular',
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_15,
        fontWeight: '600'
    }
})