import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { APP_NAME, BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from './Theme';
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import CategoriesScreen from './screens/CategoriesScreen';
import JokeScreen from './screens/JokeScreen';
import SavedScreen from './screens/SavedScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';


// Creates Navigators
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const MainStack = createNativeStackNavigator();

// Main app Component
export default function App() {

  // Loads fonts
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  })

  if (!fontsLoaded) {
    return null;
  }

  // Renders app using nested stack navigator in a tab navigator in a stack navigator
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{
        headerShown: false
      }}>
        <MainStack.Screen name='WelcomeScreen' component={WelcomeScreen}></MainStack.Screen>
        <MainStack.Screen name='Main' component={Tabs}></MainStack.Screen>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

// Tab Navigator Component with nested Stack navigator
const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      // Sets icons of tab bar
      tabBarIcon: ({ focused, size, color }) => {
        let iconName;
        if (route.name === 'Browse') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'SavedScreen') {
          iconName = focused ? 'star' : 'star-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      // Sets labels of tab bar
      tabBarLabel: ({ focused, color }) => {
        let labelName;

        if (route.name === 'Browse') {
          labelName = 'Browse';
        } else if (route.name === 'SavedScreen') {
          labelName = 'Saved';
        }

        return <Text style={{ color: color }}>{labelName}</Text>;
      },

      headerStyle: { backgroundColor: PRIMARY_COLOR },
      headerTintColor: SECONDARY_COLOR,
      title: APP_NAME,
      headerTitleStyle: { fontFamily: 'Montserrat_500Medium' },

      tabBarStyle: { backgroundColor: SECONDARY_COLOR },
      tabBarInactiveBackgroundColor: PRIMARY_COLOR,
      tabBarLabelStyle: { fontFamily: 'Montserrat_500Medium' },

      tabBarActiveTintColor: PRIMARY_COLOR,
      tabBarInactiveTintColor: BACKGROUND_COLOR,

    })}>
      <Tab.Screen name='Browse' component={Browse}></Tab.Screen>
      <Tab.Screen name='SavedScreen' component={SavedScreen} ></Tab.Screen>
    </Tab.Navigator>
  )
}


// Stack Navigator for choosing category and then navigating to joke generating page of said category
Browse = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='CategoriesScreen' component={CategoriesScreen}></Stack.Screen>
      <Stack.Screen name='JokeScreen' component={JokeScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}



