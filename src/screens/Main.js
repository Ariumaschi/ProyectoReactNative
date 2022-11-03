import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import Post from './Post';
import { FontAwesome } from '@expo/vector-icons';


export default function App() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={
                { tabBarIcon: () => <FontAwesome name="book" size={24} color="black" /> }
            }
            />
            <Tab.Screen name="Profile" component={Profile} options={
                { tabBarIcon: () => <FontAwesome name="book" size={24} color="black" /> }
            } />
            <Tab.Screen name="Post" component={Post} options={
                { tabBarIcon: () => <FontAwesome name="book" size={24} color="black" /> }
            } />
        </Tab.Navigator>
    );
}
