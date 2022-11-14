import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pie from 'react-native-pie';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LoaderContext, toggleModalContext } from '../../App';
import { getMissionStreak } from '../api/Missions';
import { images } from '../Constant/background';
import Mission from '../images/svg/mission';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';

export default function MissionStreak(props) {
    const [missionStreakArr, setMissionStreakArr] = useState([]);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const focused = useIsFocused()
    const getStreak = async () => {
        setLoading(true)
        try {
            let { data: res } = await getMissionStreak();
            console.log(res.data, 'response')
            if (res.data) {
                setMissionStreakArr(res.data)
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
        if (focused)
            getStreak();
    }, [focused])

    const data = [
        {
            id: '1',
            fill: '80',
            blank: '20'
        },
        {
            id: '2',
            fill: '60',
            blank: '40'
        },
        {
            id: '3',
            fill: '30',
            blank: '70'
        },
        {
            id: '4',
            fill: '30',
            blank: '70'
        },
        {
            id: '5',
            fill: '30',
            blank: '70'
        },
    ]

    const renderItem = ({ item }) => {
        return (
            <View style={{ width: 175, alignItems: 'center' }}>
                <Pie
                    radius={80}
                    innerRadius={65}
                    sections={[
                        {
                            percentage: item?.completedPercentage,
                            color: '#EC892B',
                        },
                    ]}
                    backgroundColor="#ddd"
                />
                <View style={styles.gauge}>
                    <Text style={[styles.gaugeText, { fontSize: 14, color: "#747474" }]}>
                        {item?.activityObj?.name}
                    </Text>
                    <Text style={[styles.gaugeText, { color: Colors.GRADIENT1, fontSize: 16 }]}>
                        + {item?.attributeArr.find((el) => `${el?.name}`.toLowerCase() == "streak")?.coinsAmount} INR
                    </Text>

                    <Text style={[styles.gaugeText, { fontSize: 13, color: "#747474", textAlign: "center" }]}>
                        {item?.completedPercentage == 100 ? "Complete" : `${item?.daysStillLeft} Occourence Left`}
                    </Text>
                </View>
            </View>

        )
    }

    return (
        <View style={{ backgroundColor: "white" }}>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.fullSize]} >
                <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                    <View style={[{ flexDirection: 'row', alignSelf: 'center', marginBottom: -Spacing.MARGIN_30, marginTop: Spacing.MARGIN_70 }]}>
                        <Image source={require('../images/bonusTeady.png')} resizeMode='contain' style={{ height: hp(28), width: (190) }} />
                        <ImageBackground source={require('../images/shareAward2.png')} resizeMode='contain' style={{ height: hp(17), width: wp(40), alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={[styles.topText]}>Click to collect completed bonus</Text>
                        </ImageBackground>
                    </View>
                    <View style={[styles.whiteBg]}>

                        <FlatList
                            data={missionStreakArr}
                            // data={data}
                            numColumns={2}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
                            contentContainerStyle={{ paddingBottom: Spacing.MARGIN_50 }}
                            ListHeaderComponent={
                                <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_30, marginBottom: Spacing.MARGIN_20 }]}>
                                    <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, marginRight: Spacing.PADDING_7 }]}>Streak Boosters</Text>
                                    <Mission height={hp(5)} width={wp(11)} />
                                </View>
                            }
                            ListEmptyComponent={
                                <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_30, marginBottom: Spacing.MARGIN_20 }]}>
                                    <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, marginRight: Spacing.PADDING_7, fontSize: 18 }]}>Complete your first streak to get rewarded</Text>
                                </View>
                            }
                        />
                    </View>
                </ImageBackground>
            </LinearGradient>
        </View>
    )
}
const styles = StyleSheet.create({
    whiteBg: {
        width: '100%',
        height: '70%',
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    topText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        fontFamily: 'Cookies',
        marginTop: hp(-3)
    },
    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 24,
    },
})