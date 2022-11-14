import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  ImageBackground, StyleSheet,
  Text, View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { LoaderContext, toggleModalContext } from '../../../App';
import { getUserWallet } from '../../api/wallet';
import Boy from '../../images/svg/parentsvg/cardBoy';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme/index';
export default function WalletCard(props) {
  const [userDataObj, setUserDataObj] = useState({});
  const focused = useIsFocused()
  const [loading, setLoading] = useContext(LoaderContext);
  const { toggleObj, messageObj } = useContext(toggleModalContext)
  const [toggleModal, setToggleModal] = toggleObj;
  const [message, setMessage] = messageObj;

  const handleGetUserData = async () => {
    setLoading(true)
    try {
      console.log("asad")
      const { data: res } = await getUserWallet();
      console.log('this is data', JSON.stringify(res, null, 2));
      if (res.success) {
        setUserDataObj(res.data);
      }
    }
    catch (error) {
         console.log(error.response.data.message)
      console.log(error.message)
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


  return (
    <>
      <ImageBackground
        source={require('../../images/dashboardCard.png')}
        imageStyle={{ borderRadius: 20 }}
        resizeMode="cover"
        style={[styles.card]}>
        <View style={[commonStyle.flexRow]}>
          <Boy height={hp(8)} width={wp(14)} />
          <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap" }]}>
            {userDataObj?.userObj?.firstName}'s wallet
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
            {userDataObj?.amount}
          </Text>
        </View>
      </ImageBackground>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    height: hp(23),
    width: wp(80),
    marginVertical: hp(3),
    marginLeft: hp(5),
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
