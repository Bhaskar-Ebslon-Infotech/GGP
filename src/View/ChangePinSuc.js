import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonStyle from '../Styles/commonStyle';
import {ANTDESIGN, ENTYPO} from '../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, Spacing, Typography} from '../Styles/theme/index';
// import Boy from '../images/svg/boy';
import Check from '../images/svg/check';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {images} from '../Constant/background';
import Home from '../images/svg/home';
import {useNavigation} from '@react-navigation/native';

export default function Saved() {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: 'white'}}>
      <Image
        source={require('../images/forgetTeady.png')}
        resizeMode="contain"
        style={[styles.teady]}
      />
      <ImageBackground
        source={require('../images/personal.png')}
        resizeMode="stretch"
        style={[styles.bottomImg]}>
        <View
          style={{
            marginTop: Spacing.SIZE_140,
            paddingHorizontal: Spacing.PADDING_20,
          }}>
          <Text
            style={[CommonStyle.title, {fontSize: Typography.FONT_SIZE_25}]}>
            Change PIN Requested
          </Text>
          <Check
            height={hp(10)}
            width={wp(30)}
            style={{alignSelf: 'center', marginTop: Spacing.MARGIN_30}}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Vault')}
            style={{
              backgroundColor: Colors.WHITE,
              paddingVertical: Spacing.PADDING_5,
              borderRadius: 20,
              marginTop: Spacing.MARGIN_45,
            }}>
            <Text style={[styles.btnText]}>Piggy Bank</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomImg: {
    height: hp(100),
    width: wp(100),
    position: 'absolute',
    top: hp(35),
  },
  teady: {
    height: hp(45),
    width: wp(60),
    position: 'absolute',
    right: hp(10),
    top: hp(11),
  },
  View: {
    marginTop: hp(20),
    paddingHorizontal: Spacing.PADDING_20,
  },
  btnText: {
    textAlign: 'center',
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_18,
    paddingVertical: Spacing.PADDING_5,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
  label: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_14,
    paddingVertical: Spacing.PADDING_5,
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
  },
  TextInput: {
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    paddingHorizontal: Spacing.PADDING_20,
  },
  select: {
    backgroundColor: Colors.WHITE,
    width: '100%',
    borderRadius: 25,
  },
  text: {
    color: '#BFBFBF',
    fontSize: Typography.FONT_SIZE_14,
    paddingVertical: Spacing.PADDING_5,
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    marginLeft: Spacing.PADDING_15,
    flex: 1,
  },
});
