import React, { useContext } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CommonHeader from '../../Component/CommonHeader';
import GoPremium from '../../images/svg/parentsvg/goPremium';
import Kid from '../../images/svg/parentsvg/kid';
import Personal from '../../images/svg/parentsvg/personal';
import Time from '../../images/svg/parentsvg/time';
import parentStyle from '../../Styles/parentStyle';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { useNavigation } from '@react-navigation/native';
import { kidContext } from '../../Context/CurrentKidContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function Settings() {
  const navigation = useNavigation();
  const [currentKid, setCurrentKid] = useContext(kidContext);
  console.log('currentKid', currentKid);
  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <CommonHeader />
      <ScrollView>
        <ImageBackground
          source={require('../../images/bg2.png')}
          style={[commonStyle.fullSize, { height: hp(83) }]}>
          <View style={{ padding: Spacing.MARGIN_20 }}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 2 }}
              colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
              style={[styles.linearBg]}>
              <Text
                style={[
                  commonStyle.title,
                  { color: Colors.WHITE, fontSize: Typography.FONT_SIZE_30 },
                ]}>
                Settings
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ParentPin')
                }
                style={[commonStyle.flexRow, styles.whiteBg, { marginTop: Spacing.MARGIN_15 }]}>
                <Personal height={hp(4)} width={wp(7)} />
                <Text style={[styles.contain]}>Personal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('KidChangePin')
                }
                style={[commonStyle.flexRow, styles.whiteBg,]}>
                <Kid height={hp(4)} width={wp(7)} />
                <Text style={[styles.contain, { marginLeft: -15 }]}>Kid</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PlansAfterLogin')
                }
                style={[commonStyle.flexRow, styles.whiteBg]}>
                <GoPremium height={hp(4)} width={wp(7)} />
                <Text style={[styles.contain]}>Go Premium</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ScreenTime')
                }
                style={[
                  commonStyle.flexRow,
                  styles.whiteBg,
                ]}>
                <Time height={hp(4)} width={wp(7)} />
                <Text style={[styles.contain]}>Screen Time</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('KidReg')
                }
                style={[
                  commonStyle.flexRow,
                  styles.whiteBg,
                ]}>
                <Kid height={hp(4)} width={wp(7)} />
                <Text style={[styles.contain, { marginLeft: -15 }]}>Add Kid</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BottomTabBar', {
                    screen: 'Notification',
                  })
                }
                style={[
                  commonStyle.flexRow,
                  styles.whiteBg, { marginBottom: Spacing.MARGIN_15, paddingVertical: 8 }
                ]}>
                <FontAwesome name='bell' size={25} color={Colors.GRADIENT2} />
                <Text style={[styles.contain, { marginLeft: -15 }]}>Notifications</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SettingStack', {
                    screen: 'ParentTimeOut',
                  })
                }
                style={[
                  commonStyle.flexRow,
                  styles.whiteBg,
                  { marginBottom: Spacing.MARGIN_15 },
                ]}>
                <Time height={hp(4)} width={wp(7)} />
                <Text style={[styles.contain]}>Time Out</Text>
              </TouchableOpacity> */}
            </LinearGradient>
          </View>
          <Image
            source={require('../../images/bonusTeady.png')}
            resizeMode="contain"
            style={[parentStyle.bottonPg]}
          />
        </ImageBackground>
      </ScrollView>
    </View >
  );
}
const styles = StyleSheet.create({
  linearBg: {
    paddingHorizontal: Spacing.MARGIN_20,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: Spacing.MARGIN_30,
  },
  whiteBg: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    paddingVertical: Spacing.PADDING_5,
    paddingHorizontal: Spacing.MARGIN_15,
    marginTop: Spacing.MARGIN_10,
  },
  contain: {
    width: '95%',
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_17,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.LIGHT_BLACK,
  },
});
