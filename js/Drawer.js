import React from "react";
import { DrawerNavigator } from "react-navigation";

import SideBar from "./components/sideBar";
import MainBillStack from "./mainBillStack";
import MainStoreStack from "./mainStoreStack";
import MainAddStack from "./mainAddStack";



const Drawer = DrawerNavigator(
	{
		MainAddStack: { screen: MainAddStack },
		MainBillStack: { screen: MainBillStack },
		MainStoreStack: { screen: MainStoreStack },
	},
	{
		initialRouteName: "MainAddStack",
		contentComponent: props => <SideBar {...props} />,
		navigationOptions: {
			gesturesEnabled: false,
			drawerLockMode: 'locked-closed'
		},
	}
);

export default Drawer;