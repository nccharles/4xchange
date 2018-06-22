
import { Image } from 'react-native';
import React, { Component } from 'react';

import Onboarding from 'react-native-onboarding-swiper';
import user from '../Assets/MapImage/user.png'

class Intro extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true
        }
    };
    render() {
        return (
            <Onboarding
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <Image source={user} />,
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#fe6e58',
                        image: <Image source={user} />,
                        title: 'The Title',
                        subtitle: 'This is the subtitle that sumplements the title.',
                    },
                    {
                        backgroundColor: '#999',
                        image: <Image source={user} />,
                        title: 'Triangle',
                        subtitle: "Beautiful, isn't it?",
                    },
                ]}
            />
        )
    }
}

export default Intro;