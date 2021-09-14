import Login from '@screens/signIn/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const signInScreens: () => Node = () => {
   
  const Stack = createNativeStackNavigator();
  return(
      <Stack.Screen name="Login" component={Login} />
  )
}
export const signOutScreens: () => Node = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
};
