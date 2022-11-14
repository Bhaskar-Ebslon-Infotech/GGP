import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View ,Image,ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CommonHeader from '../../Component/CommonHeader';
import GoPremium from '../../images/svg/parentsvg/goPremium';
import Kid from '../../images/svg/parentsvg/kid';
import Personal from '../../images/svg/parentsvg/personal';
import Time from '../../images/svg/parentsvg/time';
import parentStyle from '../../Styles/parentStyle';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { useNavigation } from '@react-navigation/native';


export default function Pricing() {
    const navigation =useNavigation();
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
             <CommonHeader />
             <ScrollView>
            <ImageBackground source={require('../../images/bg2.png')} style={[commonStyle.fullSize,{height:hp(95)}]}>
         
                <View style={{ padding: Spacing.MARGIN_20 }}>
                <Text style={[commonStyle.title, {  fontSize: Typography.FONT_SIZE_30,marginTop:Spacing.MARGIN_30 }]}>Pricing</Text>
                <Text style={{marginTop:Spacing.MARGIN_5,fontSize:Typography.FONT_SIZE_13,color:'#747474',textAlign:'center',width:'90%',alignSelf:'center',fontFamily:'Montserrat-Regular'}}>Go Premium and have a lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euultrices eros, sed consequat arcu.</Text>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBg]} >
                       <View style={{paddingVertical:Spacing.MARGIN_30}}>
                        <TouchableOpacity onPress={() => navigation.navigate('BottomTabBar', { screen: 'SettingStack',params:{screen: 'Premium',} })} style={[styles.btn,{marginBottom:Spacing.MARGIN_15}]}>
                            <Text style={[styles.btnText]}>6 Months</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn]}>
                            <Text style={[styles.btnText]}>Annual</Text>
                        </TouchableOpacity>
                    </View>
                    </LinearGradient>
                </View>
                <Image source={require('../../images/bonusTeady.png')} resizeMode='contain' style={[parentStyle.bottonPg]}/>
           
            </ImageBackground>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    linearBg: {
        paddingHorizontal: Spacing.MARGIN_20,
        paddingVertical: Spacing.MARGIN_15,
        borderRadius: 10,
        marginTop: Spacing.MARGIN_30
    },
    whiteBg: {
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        paddingVertical: Spacing.PADDING_7,
        paddingHorizontal: Spacing.MARGIN_15,
        marginTop: Spacing.MARGIN_20
    },
    btn:{
borderColor:Colors.WHITE,
borderWidth:1,
paddingVertical:7,
borderRadius:7
    },
    btnText:{
        color:Colors.WHITE,
        fontFamily:'Montserrat-SemiBold',
        fontSize:Typography.FONT_SIZE_18,
        textAlign:'center'
    }
})