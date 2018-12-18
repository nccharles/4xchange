import React, { Component } from 'react';
import { View, Text, ActivityIndicator, AsyncStorage } from 'react-native'
import * as firebase from 'firebase'
import PrimaryNav from './Config/routes'

import { Colors } from './Assets/Themes'
import { userChoice } from './Config/constants'
import { TabHeading } from 'native-base';
export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			signedIn: false,
			checkedSignIn: false,
			userSignedIn: false,
			userViewConformed: false,
			initialRouter: 'WelcomeStack'
		};
	}
	//   async componentWillMount() {
	//     // await AsyncStorage.setItem('@ForExchange:key', '1');
	//     console.log(await AsyncStorage.setItem('@ForExchange:key', token))
	//   }

	async componentWillMount() {
		firebase.initializeApp({
			apiKey: "AIzaSyDUlDTNXePpkPenR5d0laiiPGumiAoCnAA",
			authDomain: "forexapp-827c1.firebaseapp.com",
			databaseURL: "https://forexapp-827c1.firebaseio.com",
			projectId: "forexapp-827c1",
			storageBucket: "forexapp-827c1.appspot.com",
			messagingSenderId: "327647928890"
		});

		firebase.auth().onAuthStateChanged(async user => {
			const that = this
			const retrievedUserChoice = await AsyncStorage.getItem(userChoice);
			if (user) {
				firebase.database().ref(`infos/${user.uid}/publicInfo`).once("value")
					.then(snapshot => {
						const { completed } = snapshot.val()
						if (completed) {
							that.setState({
								signedIn: true,
								checkedSignIn: true,
								initialRouter: 'SignedIn'
							})
						} else {
							that.setState({
								signedIn: true,
								checkedSignIn: true,
								initialRouter: 'InfoRegis'
							})
						}
					}).catch(error => {
						that.setState({
							signedIn: true,
							checkedSignIn: true,
							initialRouter: 'InfoRegis'
						})
					})
			} else {
				try {
					if (retrievedUserChoice === 'true') {
						this.setState({
							userViewConformed: true,
							checkedSignIn: true,
							signedIn: false,
							initialRouter: 'UserStack'
						})

					} else {
						this.setState({
							checkedSignIn: true,
							signedIn: false,
							initialRouter: 'WelcomeStack'
						})
					}
				} catch (error) {
					// Error retrieving data
					console.log('error')
				}
			}
		})

	}

	render() {
		const { checkedSignIn, signedIn, userViewConformed, initialRouter } = this.state
		if (!checkedSignIn) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="large" color={Colors.primary} />
				</View>
			)
		}

		const Layout = PrimaryNav(initialRouter);

		return (
			<Layout />
		);
	}
}