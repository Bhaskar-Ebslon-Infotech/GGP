import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getUserWallet } from '../../api/wallet';
import CommonHeader from '../../Component/CommonHeader';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { kidContext } from '../../Context/CurrentKidContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LoaderContext, toggleModalContext } from '../../../App';
export default function WalletHistory() {
  const data = [
    {
      id: '1',
      date: '11/01/2021',
      item: 'Bike',
      price: '5000',
    },
    {
      id: '2',
      date: '11/01/2021',
      item: 'Bike',
      price: '5000',
    },
    {
      id: '3',
      date: '11/01/2021',
      item: 'Bike',
      price: '5000',
    },
    {
      id: '4',
      date: '11/01/2021',
      item: 'Bike',
      price: '5000',
    },
    {
      id: '5',
      date: '11/01/2021',
      item: 'Bike',
      price: '5000',
    },
    {
      id: '6',
      date: '11/01/2021',
      item: 'Bike',
      price: '5000',
    },
    {
      id: '7',
      date: '11/01/2021',
      item: 'Bike',
      price: '5000',
    },
    {
      id: '8',
      date: '11/01/2021',
      item: 'Bike',
      price: '5000',
    },
  ];

  const [walletObj, setWalletObj] = useState({});
  const [currentKid, setCurrentKid] = useContext(kidContext);
  const [loading, setLoading] = useContext(LoaderContext);
  const { toggleObj, messageObj } = useContext(toggleModalContext)
  const [toggleModal, setToggleModal] = toggleObj;
  const [message, setMessage] = messageObj;

  // console.log('currentKid: ', currentKid);

  const handleGetUserWallet = async () => {
    setLoading(true)
    try {
      let { data: res } = await getUserWallet();
      
      console.log('this is data: ', JSON.stringify(res.data, null, 2));
      if (res.data) {
        setWalletObj(res.data);
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
    handleGetUserWallet();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          commonStyle.flexRow,
          {
            paddingStart: Spacing.PADDING_15,
            backgroundColor: index % 2 == 0 ? '#FFFFFF' : '#F2F4F6',
            paddingVertical: Spacing.PADDING_7,
            justifyContent: 'center',
          },
        ]}>
        <Text
          style={[
            styles.title,
            { flex: 1, fontSize: Typography.FONT_SIZE_14 },
          ]}>
          {new Date(item.on).toDateString()}
        </Text>
        <Text
          style={[
            styles.title,
            { flex: 1, fontSize: Typography.FONT_SIZE_14 },
          ]}>
          {item.status ? item.status : "SUCCESS"}
        </Text>
        <Text
          style={[
            styles.title,
            { flex: 1, textAlign: "center", fontSize: Typography.FONT_SIZE_14 },
          ]}>
          {item.amount}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: Colors.WHITE }}>

      <View >
        <CommonHeader />
        <View style={{ padding: Spacing.MARGIN_15 }}>
          <FlatList
            data={walletObj.transactionHistoryArr}
            renderItem={renderItem}
            contentContainerStyle={{ borderWidth: 1, borderColor: '#C9E165', paddingBottom: hp(35), marginTop: hp(10) }}
            ListHeaderComponent={
              <>

                <Text style={[styles.head1, { marginTop: Spacing.MARGIN_30 }]}>
                  My Wallet History
                </Text>
                <Text
                  style={[
                    commonStyle.title,
                    {
                      fontSize: Typography.FONT_SIZE_27,
                      fontWeight: '700',
                      marginBottom: Spacing.PADDING_2,
                      marginTop: Spacing.PADDING_7,
                    },
                  ]}>
                  {walletObj.amount}
                </Text>
                <Text
                  style={[
                    styles.head1,
                    {
                      fontSize: Typography.FONT_SIZE_15,
                      marginBottom: Spacing.MARGIN_30,
                    },
                  ]}>
                  Available Amount
                </Text>
                <View
                  style={[
                    commonStyle.flexRow,
                    {
                      paddingStart: Spacing.MARGIN_15,
                      paddingVertical: Spacing.PADDING_7,
                      justifyContent: 'space-between',
                      backgroundColor: '#C9E165',
                    },
                  ]}>
                  <Text style={[styles.title, { width: '33.3%' }]}>Date</Text>
                  <Text style={[styles.title, { width: '33.3%' }]}>Status</Text>
                  {/* <Text style={[styles.title, { width: '35%' }]}>Item</Text> */}
                  <Text style={[styles.title, { width: '33.3%' }]}>Amount</Text>
                </View>
              </>
            }
            ListEmptyComponent={
              <>
                <View
                  style={[
                    commonStyle.flexRow,
                    {
                      paddingStart: Spacing.PADDING_15,
                      backgroundColor: '#FFFFFF',
                      paddingVertical: Spacing.PADDING_7,
                      justifyContent: 'center',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.title,
                      { flex: 1, fontSize: Typography.FONT_SIZE_14 },
                    ]}>
                    No Transations found for you
                  </Text>

                </View>


              </>
            }
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: Typography.FONT_SIZE_16,
    color: '#747474',
    fontFamily: 'Montserrat-SemiBold',
  },
  head1: {
    fontSize: Typography.FONT_SIZE_22,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.LIGHT_BLACK,
    textAlign: 'center',
  },
});
