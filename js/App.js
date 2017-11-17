import { StackNavigator } from "react-navigation";

import Login from "./components/login/";

const App = StackNavigator(
	{
		Login: { screen: Login },
	},
	{
		index: 0,
		initialRouteName: "Login",
		headerMode: "none",
	}
);

export default App;
