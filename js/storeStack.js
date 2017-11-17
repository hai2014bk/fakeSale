import { StackNavigator } from "react-navigation";

import StoreList from "./components/storelist"
import StoreInfo from "./components/storeinfo"


const StoreStack = StackNavigator(
	{
		StoreList: { screen: StoreList},
		StoreInfo: { screen: StoreInfo},
	},
	{	
		index: 0,
		initialRouteName: "StoreInfo",
		headerMode: "none",
		navigationOptions: {
			gesturesEnabled: false,
			drawerLockMode: 'locked-closed'
		},
	}
	
);

export default StoreStack;