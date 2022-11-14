import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { images } from '../../Constant/background';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme/index';
import Header from '../../Component/Header';
import { getMissionsCompletedByKidId, getMissionsInProgressByKidId } from '../../api/Missions';
import { LoaderContext, toggleModalContext } from '../../../App';
import { kidContext } from '../../Context/CurrentKidContext';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { KidMissionCompletionStatus } from '../../api/utils/StatusForKidMissionCompletionStatus';

export default function InProgress() {
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const focused = useIsFocused()
    const [inProgressMissionsArr, setInProgressMissionsArr] = useState([]);



    const getMissionsInProgressByKidIdFromDb = async () => {
        setLoading(true)
        try {
            let { data: res } = await getMissionsInProgressByKidId(currentKid._id)
            console.log(JSON.stringify(res.data, null, 3), "response ******************************************************************************************************************************************************************************************************************************************")
            if (res.data) {
                setInProgressMissionsArr(res.data)
            }
        }
        catch (error) {
            // setToggleModal(true)
            //setMessage(error)
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
            getMissionsInProgressByKidIdFromDb()
        }
    }, [focused])

    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.listBorder, index == inProgressMissionsArr.length - 1 && { marginBottom: Spacing.MARGIN_20, }]}>
                <Text style={[styles.listTitle]}>{item?.activityObj?.name}</Text>
                <Text style={[styles.listSubTitle]}>{item?.categoryObj?.name}</Text>
                <View style={[{ justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                            <View style={{ display: "flex", flexDirection: "column" }}>
                                {
                                    item?.attributeArr?.map((el, index) => {
                                        return (
                                            <Text key={index} style={[styles.listContain,]}>{el?.coinsAmount} {el?.attributesObj?.name}</Text>

                                        )
                                    })
                                }
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Text style={[styles.listInr]}>{item?.attributeArr.reduce((acc, el) => acc + el.coinsAmount, 0)} INR</Text>
                                {/* <TouchableOpacity onPress={() => { setDoneModal(true); setSelectedDoneElement(item) }}>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                        <View style={[styles.btnView]}>
                                            <Text style={[commonStyle.btnText, { color: Colors.WHITE, fontSize: Typography.FONT_SIZE_12, paddingVertical: Spacing.PADDING_5, }]}>Reschedule</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                        {
                            item?.userMissionObj?.isStreakActive == false &&
                            <View>
                                {
                                    item?.userMissionObj?.timeAndDateObj?.stopAfter &&
                                    <Text style={[styles.listContain,]}>Stop After {item?.timeAndDateObj?.stopAfter} Day/s</Text>
                                }
                                {
                                    item?.userMissionObj?.timeAndDateObj?.stopOn &&
                                    <Text style={[styles.listContain,]}>Stop On {`${new Date(item?.timeAndDateObj?.stopOn).getDate()}/${new Date(item?.timeAndDateObj?.stopOn).getMonth() + 1}/${new Date(item?.timeAndDateObj?.stopOn).getFullYear()}`}</Text>
                                }
                            </View>
                        }
                        <Text style={[styles.listContain, { marginTop: 0 }]}>{item.status}</Text>


                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE }}>
            <Header logo={true} />
            <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>

                <View style={{ paddingHorizontal: Spacing.PADDING_20 }}>

                    <FlatList
                        data={inProgressMissionsArr}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: Spacing.SIZE_150 }}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, fontSize: Typography.FONT_SIZE_27, marginBottom: Spacing.MARGIN_10 }]}>In Progress</Text>
                        }
                        ListEmptyComponent={
                            <Text style={[commonStyle.title, { color: "black", fontSize: 17, marginBottom: Spacing.MARGIN_10 }]}>No missions are in progress for you currently</Text>
                        }
                        keyExtractor={item => item._id}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    listBorder: {
        borderWidth: 1,
        padding: Spacing.PADDING_15,
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: Spacing.PADDING_15
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
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '600',
        marginTop: Spacing.PADDING_3
    },
    listInr: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_25,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '700',
        marginRight: Spacing.PADDING_20
    }
})