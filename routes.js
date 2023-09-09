import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/pages/Home";
import NewTaskScreen from "./src/pages/NewTask";
import TaskScreen from "./src/pages/Tasks";
import SelecaoAvatarScreen from "./src/pages/SelecaoAvatar";
import WelcomeScreen from "./src/pages/Welcome";


const Stack = createNativeStackNavigator();
const Routes = () => {
    return (
      <Stack.Navigator initialRouteName={"Welcome"}>
        <Stack.Screen name={"Home"} component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name={"Nova Tarefa"} component={NewTaskScreen} />
        <Stack.Screen name={"Tarefas"} component={TaskScreen} />
        <Stack.Screen name={"Selecao Avatar"} component={SelecaoAvatarScreen} options={{ headerShown: false }} />
        <Stack.Screen name={"Welcome"} component={WelcomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };
  
  export default Routes;