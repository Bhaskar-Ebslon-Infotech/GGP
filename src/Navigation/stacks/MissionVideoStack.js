import React from 'react'
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MissionApproved from '../../View/Parent/MissionApproved';
import Discuss from '../../View/Parent/Discuss';
import VideoLiabrary from '../../View/Parent/VideoLiabrary';
import VideoApproved from '../../View/Parent/VideoApproved';
import DiscussVideo from '../../View/Parent/DiscussVideo';
import CreateVideoMix from '../../View/Parent/CreateVideoMix';
import KidsVideoList from '../../View/Parent/KidsVideoList';
import VideoMixSettings from '../../View/Parent/VideoMixSettings';
import KidsVideoListEdit from '../../View/Parent/KidsVideoListEdit';
import SuggestedVideo from '../../View/Parent/SuggestedVideo';
import VideoMixList from '../../View/Parent/VideoMixList';
import IndivisualVideo from '../../View/Parent/IndivisualVideo';
import IndiVisualVideoEdit from '../../View/Parent/IndiVisualVideoEdit';
import AddVideo from '../../View/Parent/AddVideo';
// import ScreenTime from '../../View/Parent/ScreenTime';
import Mission from '../../View/Parent/Mission';
import AddFrequency from '../../View/Parent/AddFrequency';



export default function MissionVideoStack() {

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName='MissionApproved'>
            <Stack.Screen options={{ headerShown: false }} name="MissionApproved" component={MissionApproved} />
            <Stack.Screen options={{ headerShown: false }} name="Discuss" component={Discuss} />
            <Stack.Screen options={{ headerShown: false }} name="VideoLiabrary" component={VideoLiabrary} />
            <Stack.Screen options={{ headerShown: false }} name="VideoApproved" component={VideoApproved} />
            <Stack.Screen options={{ headerShown: false }} name="DiscussVideo" component={DiscussVideo} />
            <Stack.Screen options={{ headerShown: false }} name="CreateVideoMix" component={CreateVideoMix} />
            <Stack.Screen options={{ headerShown: false }} name="KidsVideoList" component={KidsVideoList} />
            <Stack.Screen options={{ headerShown: false }} name="VideoMixSettings" component={VideoMixSettings} />
            <Stack.Screen options={{ headerShown: false }} name="KidsVideoListEdit" component={KidsVideoListEdit} />
            <Stack.Screen options={{ headerShown: false }} name="SuggestedVideo" component={SuggestedVideo} />
            <Stack.Screen options={{ headerShown: false }} name="VideoMixList" component={VideoMixList} />
            <Stack.Screen options={{ headerShown: false }} name="IndivisualVideo" component={IndivisualVideo} />
            <Stack.Screen options={{ headerShown: false }} name="IndiVisualVideoEdit" component={IndiVisualVideoEdit} />
            <Stack.Screen options={{ headerShown: false }} name="AddVideo" component={AddVideo} />
            {/* <Stack.Screen options={{ headerShown: false }} name="ScreenTime" component={ScreenTime} /> */}
            <Stack.Screen options={{ headerShown: false }} name="Mission" component={Mission} />
            <Stack.Screen options={{ headerShown: false }} name="AddFrequency" component={AddFrequency} />
        </Stack.Navigator>
    )
}
