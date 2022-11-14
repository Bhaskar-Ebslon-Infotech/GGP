import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function LoadingComponent() {
    return (
        <>
            <View style={styles.container}>
                <LottieView source={require('../images/loader.json')} autoSize resizeMode="cover" autoPlay loop={true} style={styles.lottieStyle} />
          </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp(100),
        width: wp(100),
        // backgroundColor: "green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    lottieStyle: {
        height: 300,
        width: 300,
        alignSelf: 'center'
    },
})