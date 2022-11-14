import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  ImageBackground, Pressable, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { kidContext } from '../../Context/CurrentKidContext';
import { userData } from '../../api/user';
import Header from '../../Component/Header';
import { images } from '../../Constant/background';
import Boy from '../../images/svg/parentsvg/cardBoy';
import Charity from '../../images/svg/parentsvg/charity';
import Mission from '../../images/svg/parentsvg/dashboardMission';
import Video from '../../images/svg/parentsvg/dashboardVideo';
import Invest from '../../images/svg/parentsvg/investment';
import Lock from '../../images/svg/parentsvg/lock';
import Shop from '../../images/svg/parentsvg/shop';
import Story from '../../images/svg/parentsvg/story';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme/index';
import WalletCard from './WalletCard';
import { LoaderContext, toggleModalContext } from '../../../App';
export default function Dashboard(props) {
  const navigation = useNavigation();
  const [kidsWallet, setKidWallet] = useState(true);
  const [kidWalletIsVisible, setKidWalletIsVisible] = useState(false);
  const [myWallet, setwallet] = useState(false);
  const [kidArr, setKidArr] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const [userDataObj, setUserDataObj] = useState({});
  const [currentKid, setCurrentKid] = useContext(kidContext);
  const [loading, setLoading] = useContext(LoaderContext);
  const { toggleObj, messageObj } = useContext(toggleModalContext)
  const [toggleModal, setToggleModal] = toggleObj;
  const [message, setMessage] = messageObj;
  const focused = useIsFocused()
  const handleGetUserData = async () => {
    setLoading(true)
    try {
      const { data: res } = await userData();
      if (res.success) {
        setUserDataObj(res.data);
        setKidArr(res?.data?.familyObj?.kidIdArr);
        setCurrentKid(res?.data?.familyObj?.kidIdArr[0]?.kidData);
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

  useEffect(() => {
    if (focused)
      handleGetUserData();
  }, [focused]);

  const handleSlide = ({ data, index }) => {
    console.log('data', data);
  };

  const renderItem = ({ item, index }) => {
    // console.log('item', item);
    return (
      <View style={{ marginTop: hp(3), width: '80%', marginLeft: '10%' }}>
        <ImageBackground
          source={require('../../images/dashboardCard.png')}
          imageStyle={{ borderRadius: 20 }}
          resizeMode="cover"
          style={[styles.card]}>
          <View style={[commonStyle.flexRow]}>
            <Boy height={hp(8)} width={wp(14)} />
            <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap" }]}>
              {item?.kidData?.firstName}'s Piggy Bank
            </Text>
          </View>
          <Text style={[styles.cardSubTitle, { marginTop: Spacing.MARGIN_15 }]}>
            Balance
          </Text>
          <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_5 }]}>
            <Text
              style={[styles.cardSubTitle, { marginLeft: Spacing.MARGIN_20 }]}>
              INR
            </Text>
            <Text
              style={[
                styles.cardTitle,
                {
                  marginLeft: Spacing.PADDING_7,
                  fontFamily: 'Montserrat-Bold',
                  fontSize: Typography.FONT_SIZE_30,
                  fontWeight: '700',
                },
              ]}>
              {item?.walletObj?.amount}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  return (
    <>
      <Header menu={true} />
      <ImageBackground
        source={images.backGround}
        resizeMode="contain"
        style={[
          commonStyle.fullSize,
          { backgroundColor: Colors.WHITE, flex: 1 },
        ]}>
        <ScrollView contentContainerStyle={{ paddingBottom: Spacing.MARGIN_20 }}>
          <View style={[commonStyle.flexRow, styles.top]}>
            <TouchableOpacity
              style={{
                width: '50%',
                borderWidth: 2,
                borderRadius: 30,
                borderColor: kidWalletIsVisible ? Colors.PRIMARY : 'transparent',
              }}
              onPress={() =>
                setKidWalletIsVisible(true)
              }>
              <Text
                style={{
                  width: wp(50),
                  textAlign: 'center',
                  alignSelf: 'center',
                  paddingVertical: Spacing.MARGIN_10,
                }}>
                My Kid’s Wallet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '50%',
                borderWidth: 2,
                borderRadius: 30,
                borderColor: kidWalletIsVisible == false ? Colors.PRIMARY : 'transparent',
              }}
              onPress={() =>
                setKidWalletIsVisible(false)
                // navigation.navigate('BottomTabBar', { screen: 'WalletStack',params: { screen: 'Wallet' }})
              }
            >
              <Text style={{
                width: wp(50),
                textAlign: 'center',
                alignSelf: 'center',
                paddingVertical: Spacing.MARGIN_10,
              }}>My Wallet</Text>
            </TouchableOpacity>
          </View>

          {
            kidWalletIsVisible ?
              <>
                <Carousel
                  ref={c => {
                    this._carousel = c;
                  }}
                  data={kidArr}
                  renderItem={renderItem}
                  enableSnap
                  sliderWidth={wp(100)}
                  itemWidth={wp(100)}
                  onSnapToItem={slideIndex => {
                    console.log('this is slideIndex: ', slideIndex);
                    setActiveItem(slideIndex);
                    console.log('kidarr:  ', JSON.stringify(kidArr[slideIndex]));
                    setCurrentKid(kidArr[slideIndex].kidData);
                  }}
                />
                <Pagination
                  dotsLength={kidArr.length}
                  activeDotIndex={activeItem}
                  containerStyle={{ backgroundColor: 'transparent' }}
                  dotStyle={{
                    backgroundColor: Colors.PRIMARY,
                    width: wp(4),
                    borderColor: Colors.PRIMARY,
                    borderWidth: 2,
                    borderRadius: 20,
                  }}
                  inactiveDotStyle={{
                    backgroundColor: '#fff',
                    width: wp(5),
                    borderColor: Colors.PRIMARY,
                    borderWidth: 2,
                    borderRadius: 20,
                  }}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                />
              </>
              :
              <>
                <Pressable onPress={() => props.navigation.navigate("WalletStack")}>
                  <WalletCard />
                </Pressable>
              </>
          }
          <ImageBackground
            source={images.backGround}
            style={[commonStyle.fullSize, { height: hp(53) }]}>
            <View
              style={[
                commonStyle.flexRow,
                {
                  alignSelf: 'center',
                  marginTop: Spacing.MARGIN_15,
                  paddingHorizontal: Spacing.PADDING_20,
                },
              ]}>
              <Pressable
                // onPress={() => props.navigation.navigate('Mission')}
                onPress={() =>
                  navigation.navigate('MissionVideoStack', {
                    screen: 'Mission'
                  })
                }
                style={[styles.box, styles.box2, { backgroundColor: '#C9E165' }]}>
                <Mission height={hp(8)} width={wp(14)} />
                <Text style={[styles.cardSubTitle]}>Missions</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate('MissionVideoStack', { screen: 'VideoLiabrary' }
                  )
                }
                style={[styles.box, styles.box2, { backgroundColor: '#785BDF' }]}>
                <Video height={hp(8)} width={wp(14)} />
                <Text style={[styles.cardSubTitle]}>Video Garage</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate('ShopStack')
                }
                style={[styles.box, styles.box2, { backgroundColor: '#A57296' }]}>
                <Shop height={hp(8)} width={wp(14)} />
                <Text style={[styles.cardSubTitle]}>Shop</Text>
              </Pressable>
            </View>
            <View
              style={[
                commonStyle.flexRow,
                { alignSelf: 'center', marginTop: Spacing.MARGIN_20 },
              ]}>
              <Pressable style={[styles.box]}>
                <Lock
                  height={hp(4)}
                  width={wp(5)}
                  style={{ right: 0, top: 0, position: 'absolute' }}
                />
                <View style={[styles.box2]}>
                  <Invest height={hp(8)} width={wp(14)} />
                  <Text
                    style={[styles.cardSubTitle, { color: Colors.LIGHT_BLACK }]}>
                    Investment
                  </Text>
                </View>
              </Pressable>

              <Pressable style={[styles.box]}>
                <Lock
                  height={hp(4)}
                  width={wp(5)}
                  style={{ right: 0, top: 0, position: 'absolute' }}
                />
                <View style={[styles.box2]}>
                  <Charity height={hp(8)} width={wp(14)} />
                  <Text
                    style={[styles.cardSubTitle, { color: Colors.LIGHT_BLACK }]}>
                    Charity
                  </Text>
                </View>
              </Pressable>

              <Pressable style={[styles.box]}>
                <Lock
                  height={hp(4)}
                  width={wp(5)}
                  style={{ right: 0, top: 0, position: 'absolute' }}
                />
                <View style={[styles.box2]}>
                  <Story height={hp(8)} width={wp(14)} />
                  <Text
                    style={[styles.cardSubTitle, { color: Colors.LIGHT_BLACK }]}>
                    Story
                  </Text>
                </View>
              </Pressable>
            </View>
          </ImageBackground>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    height: hp(23),
    width: wp(80),
    marginRight: hp(3),
    padding: Spacing.PADDING_15,
  },
  cardTitle: {
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: '600',
    marginLeft: Spacing.MARGIN_20,
  },
  cardSubTitle: {
    fontFamily: 'Montserrat-Regular',
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_12,
    fontWeight: '600',
  },
  box: {
    backgroundColor: '#DEDEDE',
    height: hp(14),
    width: hp(14),
    borderRadius: 10,
    marginHorizontal: Spacing.PADDING_5,
    justifyContent: 'center',
  },
  box2: {
    alignItems: 'center',
  },
  top: {
    borderWidth: 1,
    backgroundColor: Colors.WHITE,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#DEDEDE',
    borderRadius: 320,
    marginTop: Spacing.MARGIN_20,
  },
  bottomView: {
    backgroundColor: Colors.WHITE,
    borderTopWidth: 1,
    borderColor: '#EAEAEA',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.MARGIN_10,
    paddingVertical: Spacing.MARGIN_10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  toggle: {
    borderWidth: 1,
    borderColor: '#AA23AD',
    width: wp(3),
    height: hp(1),
    marginHorizontal: Spacing.PADDING_2,
    borderRadius: 10,
  },
});
