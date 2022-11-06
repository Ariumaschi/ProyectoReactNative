import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import AddPost from './AddPost';
import Posts from './Posts';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


export default function App() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={
                { tabBarIcon: () => <Feather name="home" size={24} color="black" /> }
            }
            />
            <Tab.Screen name="Profile" component={Profile} options={
                { tabBarIcon: () => <MaterialIcons name="tag-faces" size={24} color="black" /> }
            } />
            <Tab.Screen name="AddPost" component={AddPost} options={
                { tabBarIcon: () => <Feather name="plus-circle" size={24} color="black" /> }
            } />

            <Tab.Screen name="Posts" component={Posts} options={
                { tabBarIcon: () => <Feather name="image" size={24} color="black" /> }
            } />
        </Tab.Navigator>
    );
}
