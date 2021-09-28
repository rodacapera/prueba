import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import HomeScreen from '../screen/component/intro';
import Home from '../screen/views/Home';
import UserList from '../screen/views/UserList';
import CrateUserScreen from '../screen/views/CreateUserScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateUserScreen"
        component={CrateUserScreen}
        options={{
          headerTitle: 'Crear usuario',
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Bienvenido',
        }}
      />
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{
          headerTitle: 'Lista de usuarios',
        }}
      />
      {/* <Stack.Screen name="CrateUserScreen" component={CrateUserScreen} /> */}
      {/* <Stack.Screen
        name="Splash"
        component={UserList}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen name="Example" component={Example} />
        <Stack.Screen
          name="Home"
          component={Dashboard}
          options={{title: 'Bellpi'}}
          initialParams={{itemId: 42}}
        /> */}
    </Stack.Navigator>
  );
};

const homeStack = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default homeStack;
