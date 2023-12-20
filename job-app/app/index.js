import { useState } from 'react'; 
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter} from 'expo-router';

import {COLORS, icons, images, SIZES} from '../constants';
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components';



const Home = () => {
    const [searchTerm, setSearchTerm] = useState("")

    const router = useRouter();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
            options={{headerStyle: {backgroundColor: COLORS.lightWhite},
                        headerShadowVisible: false,
                        headerLeft: () =>  (
                            <ScreenHeaderBtn iconURL={icons.menu} dimension="60%"/>
                        ),
                        headerRight: () =>  (
                            <ScreenHeaderBtn iconURL={images.profile} dimension="60%"/>
                        ),
                        headerTitle: ""
                        }}/>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                style={{flex: 1, padding: SIZES.medium}}
                >
                    <Welcome/>
                    <Popularjobs/>
                    <Nearbyjobs/>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;