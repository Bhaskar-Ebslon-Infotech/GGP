import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pie from 'react-native-pie';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LoaderContext, toggleModalContext } from '../../App';
import { getMissionBonus } from '../api/Missions';
import { images } from '../Constant/background';
import Trunk from '../images/svg/trunk';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';

export default function MissionBonus(props) {
    const [missionBonusArr, setMissionBonusArr] = useState([]);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [missionsArr, setMissionsArr] = useState([]);
    const getBonus = async () => {
        setLoading(true)
        try {
            let { data: res } = await getMissionBonus();
            console.log(JSON.stringify(res.data, null, 2), 'response')
            if (res.data) {
                setMissionBonusArr(res.data)
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
        getBonus();
    }, [])

    const renderItem = ({ item }) => {
        console.log(JSON.stringify(item, null, 2), "item")
        return (
            <>
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
                        <Text style={[styles.gaugeText, { fontSize: 14, color: "#747474", textAlign: "center" }]}>
                            {item?.activityObj?.name}
                        </Text>
                        <Text style={[styles.gaugeText, { color: Colors.GRADIENT1, fontSize: 16 }]}>
                            + {item?.attributeArr.find((el) => `${el?.name}`.toLowerCase() == "bonus")?.coinsAmount}
                        </Text>
                        {
                            item.isStreakActive &&
                            <Text style={[styles.gaugeText, { color: Colors.GRADIENT1, fontSize: 16 }]}>
                                + {item?.attributeArr.find((el) => `${el?.name}`.toLowerCase() == "streak")?.coinsAmount}
                            </Text>
                        }
                        {
                            item.completedPercentage != 100 && item?.occourencesRemaining ?
                                <Text style={[styles.gaugeText, { fontSize: 13, color: "#747474" }]}>
                                    {`${item?.occourencesRemaining} frequency Left`}
                                </Text>
                                :
                                <></>
                        }
                        <Text style={[styles.gaugeText, { fontSize: 13, color: "#747474" }]}>
                            {item?.completedPercentage == 100 ? "Complete" : item?.daysStillLeft && `${item?.daysStillLeft} Days Left`}
                        </Text>
                    </View>
                </View>
            </>

        )
    }
    return (
        <View style={{ backgroundColor: "white" }}>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.fullSize]} >
                <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                    <View style={[{ flexDirection: 'row', alignSelf: 'center', marginBottom: -Spacing.MARGIN_30, marginTop: Spacing.MARGIN_70 }]}>
                        <Image source={require('../images/bonusTeady.png')} resizeMode='contain' style={{ height: hp(28), width: (190) }} />
                        <ImageBackground source={require('../images/shareAward2.png')} resizeMode='contain' style={{ height: hp(17.5), width: wp(40.5), alignItems: 'center', }} >
                            <Text style={[styles.topText]}>Click to collect completed bonus</Text>
                        </ImageBackground>
                    </View>
                    <View style={[styles.whiteBg]}>

                        <FlatList
                            data={missionBonusArr}
                            numColumns={2}
                            renderItem={renderItem}
                            contentContainerStyle={{ paddingBottom: Spacing.MARGIN_50 }}
                            ListHeaderComponent={
                                <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_30, marginBottom: Spacing.MARGIN_20 }]}>
                                    <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, marginRight: -Spacing.MARGIN_10 }]}>Mission Bonus</Text>
                                    <Trunk height={hp(7)} width={wp(15)} />
                                </View>
                            }
                            ListEmptyComponent={
                                <Text style={[commonStyle.title, { color: "#ccc", fontSize: 15, marginBottom: 40, marginTop: 15 }]}>You haven't done any missions with bonus yet</Text>
                            }
                            keyExtractor={item => item._id}
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
        fontSize: Typography.FONT_SIZE_13,
        color: Colors.PRIMARY,
        fontFamily: 'Cookies',
        marginTop: hp(5)
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