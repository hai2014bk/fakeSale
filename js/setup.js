import * as Expo from "expo";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider, Root } from "native-base";
import * as mConstants from './utils/Constants'
import {
	AsyncStorage
} from "react-native";
import App from "./App";
import configureStore from "./configureStore";
import getTheme from "../native-base-theme/components";
import variables from "../native-base-theme/variables/commonColor";

export default class Setup extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			store: configureStore(() => this.setState({ isLoading: false })),
			isReady: false,
		};
	}
	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
		});
			const loginInfo = await AsyncStorage.getItem(mConstants.USER_INFO);
			if (loginInfo !== null) {
				var user = JSON.parse(loginInfo)
				var date = new Date()
				var msPerMinute = 60 * 1000;
				var msPerHour = msPerMinute * 60;
				var msPerDay = msPerHour * 24;				
				var oldDate = new Date(user.date).getTime()
				var nowDate =  date.getTime()
				var elapsed = nowDate - oldDate;				
				var diff =  Math.round(elapsed/msPerHour );   
				if (diff < 24) {
					this.setState({ isLogined: true })					
				} else {
					let keys = [mConstants.CART, mConstants.USER_INFO, mConstants.USER_DETAIL];
					await AsyncStorage.multiRemove(keys)
					this.setState({ isLogined: false })
				}
			}
		this.setState({ isReady: true });
	}

	render() {
		if (!this.state.isReady) {
			return <Expo.AppLoading />;
		}
		return (
			<StyleProvider style={getTheme(variables)}>
				<Provider store={this.state.store}>
					<App/>
				</Provider>
			</StyleProvider>
		);
	}
}
