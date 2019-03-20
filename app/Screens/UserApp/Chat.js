import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../Assets/Themes'
// 1.
import { GiftedChat } from 'react-native-gifted-chat';
class Chat extends React.Component {
    // 2.

    static navigationOptions = ({ navigation }) => {
        let Title = (navigation.state.params || {}).name || 'Chat!   '
        return {
            headerTitle: Title + '   ',
            headerStyle: {
                backgroundColor: Colors.primary,
            },

            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    };
    // 3.
    state = {
        messages: [],
    }
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }
    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello Customer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'ForexBureau',
                        avatar: 'http://www.gtforex.co.uk/Content/images/trading.png',
                    },
                },
            ],
        })
    }

    render() {
        // 4.
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        );
    }
}
const styles = StyleSheet.create({});
export default Chat;