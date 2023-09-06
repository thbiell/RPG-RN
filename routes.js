import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/pages/Home";
import NewTaskScreen from "./src/pages/NewTask";
import TaskScreen from "./src/pages/Tasks";
import SelecaoAvatarScreen from "./src/pages/SelecaoAvatar";


const Stack = createNativeStackNavigator();
const Routes = () => {
    return (
      <Stack.Navigator initialRouteName={"Home"}>
        <Stack.Screen name={"Home"} component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name={"NewTask"} component={NewTaskScreen} />
        <Stack.Screen name={"Tasks"} component={TaskScreen} />
        <Stack.Screen name={"SelecaoAvatar"} component={SelecaoAvatarScreen} />
      </Stack.Navigator>
    );
  };
  
  export default Routes;