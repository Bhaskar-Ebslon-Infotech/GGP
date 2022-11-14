import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import WebView from 'react-native-webview';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { kidContext } from '../../Context/CurrentKidContext';
import { getAllCategoriesByKidId } from '../../api/category';
import Header from '../../Component/Header';
import { images } from '../../Constant/background';
import Clicked from '../../images/svg/parentsvg/clicked';
import Info from '../../images/svg/parentsvg/info';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import { LoaderContext, toggleModalContext } from '../../../App';
import CheckBox from 'react-native-check-box';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function Mission(props) {
  const navigation = useNavigation();
  const focused = useIsFocused()
  const [missionModal, setMissionModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [currentKid, setCurrentKid] = useContext(kidContext);
  const [loading, setLoading] = useContext(LoaderContext);
  const { toggleObj, messageObj } = useContext(toggleModalContext)
  const [toggleModal, setToggleModal] = toggleObj;
  const [message, setMessage] = messageObj;
  const [isFirstTimeUserMission, setIsFirstTimeUserMission] = useState(false);
  console.log('currentKid', currentKid);
  const [catArr, setCatArr] = useState([]);

  const handleGetCategory = async () => {
    setLoading(true)
    try {
      let finalObject = {};
      let { data: res } = await getAllCategoriesByKidId(currentKid._id);
      console.log('this is catData: ', JSON.stringify(res, null, 2));
      if (res.success) {
        setCatArr(res.data);
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


  const getIsFirstTimeUser = async () => {
    let isFirstTimeUserMission = await EncryptedStorage.getItem("isFirstTimeUserMission");
    if (isFirstTimeUserMission) {
      setIsFirstTimeUserMission(isFirstTimeUserMission)
    }
    else {
      setMissionModal(true)
      setIsFirstTimeUserMission(false)
    }
  }


  const setIsFirstTimeUser = async () => {
    setIsFirstTimeUserMission(previousValue => {
      previousValue = !previousValue
      return previousValue
    })
    let isFirstTimeUser = await EncryptedStorage.setItem("isFirstTimeUserMission", `${isFirstTimeUserMission}`);
  }


  useEffect(() => {
    if (focused) {
      getIsFirstTimeUser()
    }
  }, [focused])





  useEffect(() => {
    handleGetCategory();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        //   onPress={() => navigation.navigate('AddFrequency', {data: item._id})}
        onPress={() =>
          navigation.navigate('MissionVideoStack', { screen: 'AddFrequency', params: { data: item._id, name: item.name } })
        }
      >
        <View style={[styles.listView]}>
          <Image
            source={{ uri: item.thumbnailImage }}
            resizeMode="contain"
            style={{ height: hp(12), width: wp(30) }}
          />
        </View>
        <Text style={[styles.listText]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const onBuffer = () => { };
  const videoError = () => { };
  return (
    <View style={{}}>
      <Header logo={true} />
      <ImageBackground
        source={images.backGround}
        style={[commonStyle.fullSize, { backgroundColor: Colors.WHITE }]}>
        <FlatList
          data={catArr}
          renderItem={renderItem}
          contentContainerStyle={{
            alignSelf: 'center',
            width: '100%',
            alignContent: 'center',
            padding: Spacing.MARGIN_10,
            paddingBottom: Spacing.MARGIN_50,
          }}
          numColumns={2}
          ListHeaderComponent={
            <>
              <TouchableOpacity onPress={() => setMissionModal(true)}>
                <Info
                  height={hp(4)}
                  width={wp(6)}
                  style={{ alignSelf: 'flex-end' }}
                />
              </TouchableOpacity>
              <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                <Text
                  style={[
                    commonStyle.title,
                    { fontSize: Typography.FONT_SIZE_30 },
                  ]}>
                  Missions
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MissionApproved')
                  }
                  style={{
                    backgroundColor: Colors.PRIMARY,
                    padding: Spacing.MARGIN_5,
                    marginLeft: Spacing.PADDING_2,
                    marginTop: -Spacing.PADDING_10,
                    borderRadius: 20,
                  }}>
                  <FontAwesome
                    name="bell"
                    size={Spacing.SCALE_12}
                    color={Colors.WHITE}
                  />
                </TouchableOpacity>
              </View>
            </>
          }
          // ListFooterComponent={
          //   <View
          //     style={[
          //       commonStyle.flexRow,
          //       {
          //         alignSelf: 'center',
          //         marginBottom: Spacing.MARGIN_40,
          //         marginTop: Spacing.MARGIN_30,
          //       },
          //     ]}>
          //     <TouchableOpacity
          //       style={{width: wp(42)}}
          //       onPress={() => navigation.navigate('Dashboard')}>
          //       <LinearGradient
          //         start={{x: 1, y: 0}}
          //         end={{x: 0, y: 2}}
          //         colors={[
          //           Colors.GRADIENT1,
          //           Colors.GRADIENT2,
          //           Colors.GRADIENT1,
          //         ]}
          //         style={[commonStyle.linearBtn]}>
          //         <View style={[styles.btnView, {width: '99%'}]}>
          //           <Text
          //             style={[commonStyle.btnText, {color: Colors.PRIMARY}]}>
          //             Back
          //           </Text>
          //         </View>
          //       </LinearGradient>
          //     </TouchableOpacity>

          //     <TouchableOpacity
          //       style={{width: wp(42), marginLeft: Spacing.MARGIN_10}}
          //      // onPress={() => navigation.navigate('AddFrequency')}
          //       >
          //       <LinearGradient
          //         start={{x: 1, y: 0}}
          //         end={{x: 0, y: 2}}
          //         colors={[
          //           Colors.GRADIENT1,
          //           Colors.GRADIENT2,
          //           Colors.GRADIENT1,
          //         ]}
          //         style={[commonStyle.linearBtn]}>
          //         <View style={[styles.btnView, {width: '99%'}]}>
          //           <Text
          //             style={[commonStyle.btnText, {color: Colors.PRIMARY}]}>
          //             Next
          //           </Text>
          //         </View>
          //       </LinearGradient>
          //     </TouchableOpacity>
          //   </View>
          // }
          keyExtractor={item => item._id}
        />
      </ImageBackground>
      <Modal animationType="slide" transparent={true} visible={missionModal}>
        <View style={[commonStyle.modalBackground]}>
          <View style={[commonStyle.whiteBg]}>
            <View style={styles.video}>
              <WebView
                mediaPlaybackRequiresUserAction={true}
                allowsInlineMediaPlayback={true}
                javaScriptEnabled={true}
                allowsFullscreenVideo={true}
                domStorageEnabled={true}
                injectedJavaScript={`
                        document.getElementsByTagName("video")[0].removeAttribute("autoplay"); // this one was the key for me!
               `}
                scrollEnabled={false}
                style={{ width: "99.5%", height: "100%" }}
                source={{ uri: "https://www.youtube.com/embed/uVbnF1rrIKg" }}
              />
            </View>
            {/* <Video
              source={require('../../images/sampleVideo.mp4')}
              onBuffer={onBuffer}
              onError={videoError}
              resizeMode="cover"
              style={styles.video}
              paused={false}
            /> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginTop: 15 }} >
              <CheckBox
                style={{ marginRight: hp(0.5), }}
                onClick={() => setIsFirstTimeUser()}
                isChecked={typeof (isFirstTimeUserMission) == "String" ? isFirstTimeUserMission == 'true' ? true : false : isFirstTimeUserMission}
              />
              <Text style={{ color: Colors.GRADIENT1 }}>Don't Show again</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setMissionModal(false)}>
            <AntDesign
              name={ANTDESIGN.CIRCEL_CLOSE}
              color={Colors.WHITE}
              size={Spacing.SIZE_40}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  listImg: {
    height: hp(20),
    width: wp(30),
  },
  listText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: 'Cookies',
    textAlign: 'center',
    // flex: 1,
    flexWrap: "wrap",
    maxWidth: wp(42),
    marginTop: Spacing.MARGIN_5,
    color: Colors.LIGHT_BLACK,
  },
  btnView: {
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 1,
  },
  listView: {
    borderWidth: 1,
    marginTop: Spacing.MARGIN_15,
    borderColor: Colors.PRIMARY,
    borderRadius: 20,
    width: wp(42),
    height: hp(17),
    marginHorizontal: Spacing.MARGIN_10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  video: {
    width: '100.5%',
    height: hp(32),
  },
  box: {
    height: hp(2.5),
    width: hp(2.5),
    borderWidth: 1,
    marginRight: Spacing.MARGIN_10,
    marginStart: Spacing.MARGIN_10,
  },
  modalText: {
    position: 'absolute',
    left: hp(6),
  },
});
