import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import Settings from '../../images/svg/parentsvg/settings';
import Plus from '../../images/svg/parentsvg/circlePlus';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import Remove from '../../images/svg/parentsvg/remove';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

export default function IndiVisualVideoEdit() {
    const [deleteVideoModal, setDeleteVideoModal] = useState(false)
    const data = [
        {
            id: '1',
            url: require('../../images/sampleVideo.mp4'),
            title: 'Video Title',
            duration: 'Duration',
            reward: '5',
            bonus: '50',
        },
        {
            id: '2',
            url: require('../../images/sampleVideo.mp4'),
            title: 'Video Title',
            duration: 'Duration',
            reward: '5',
            bonus: '50',
        }
    ]
    const onBuffer = () => {

    }
    const videoError = () => {

    }
    const renderItem = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: Spacing.MARGIN_20, marginTop: Spacing.MARGIN_10 }}>
                <View style={[styles.listView]}>
                    <TouchableOpacity onPress={() => setDeleteVideoModal(true)} style={{ zIndex: 10, position: 'absolute', top: -Spacing.MARGIN_10, right: -Spacing.PADDING_2 }}>
                        <Remove height={hp(4)} width={wp(5)} />
                    </TouchableOpacity>
                    <Video source={item.url}
                        onBuffer={onBuffer}
                        onError={videoError}
                        resizeMode="cover"
                        style={styles.video}
                        paused={false}
                    />
                    <View style={{ paddingHorizontal: Spacing.MARGIN_20, paddingVertical: Spacing.PADDING_7 }}>
                        <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.listTitle]}>{item.title}</Text>
                                <Text style={[styles.listContain]}>{item.duration}</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.listTitle]}>Reward</Text>
                                    <Text style={[styles.head, { marginLeft: Spacing.PADDING_7 }]}>{item.reward} INR</Text>
                                </View>
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.listTitle]}>Bonus</Text>
                                    <Text style={[styles.head, { marginLeft: Spacing.PADDING_7 }]}>{item.bonus} INR</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />

            <FlatList
                data={data}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: Spacing.PADDING_20 }}
                ListHeaderComponent={
                    <>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.PADDING_15, marginBottom: Spacing.PADDING_10 }]}>
                            <Text style={[styles.title1]}>My Kid’s Videos</Text>
                        </View>
                        <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.LIGHT_BLACK, }]}>Baking</Text>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.PADDING_5, marginBottom: Spacing.PADDING_20 }]}>
                            <Text style={[styles.head, { marginRight: Spacing.PADDING_5, }]}>3 Videos</Text>
                            <Plus height={hp(3)} width={wp(5)} />
                        </View>
                    </>
                }
                keyExtractor={(item, index) => index}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteVideoModal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <Text style={[commonStyle.modalText, { marginVertical: Spacing.MARGIN_50 }]}>Do you want to move this video to your desired videomix?</Text>

                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginBottom: Spacing.PADDING_30 }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => console.log('ahjg')}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { backgroundColor: Colors.WHITE, width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.PRIMARY }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '40%', marginLeft: Spacing.PADDING_10 }} onPress={() => setDeleteVideoModal(false)}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, {}]}>No</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setDeleteVideoModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>




                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    title1: {
        marginRight: Spacing.PADDING_5,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_18,
        color: '#9A9A9A'
    },
    listTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_15,
        color: Colors.LIGHT_BLACK
    },
    listContain: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_13,
        color: Colors.LIGHT_BLACK
    },
    head: {
        color: Colors.PRIMARY,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
    },
    video: {
        width: '100%',
        height: hp(27),
    },
    listView: {
        position: 'relative',
        shadowColor: "#000",
        borderRadius: 20,
        backgroundColor: Colors.WHITE,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 2.84,
        elevation: 3,
    },
    btnView: {
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,
    },
})