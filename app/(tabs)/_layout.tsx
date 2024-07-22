import { Link, Tabs } from "expo-router";
import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { Image } from "react-native";
import { color } from "@tamagui/themes";
import { Home, Search } from "lucide-react-native";



export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "rgba(0,0,0,0.5)" },
        headerStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: '#e6e6e6',
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerTitle: "",
          headerLeft: () => (
            <Image style={{ width: 50, height: 50 }} source={require("../../assets/m.jpg")} />
          ),
          tabBarIcon: ({ color }) => <Home size={25} color={color} />,
          headerRight: () => (

            <Link href='/two' asChild>
              <HeaderButton />
            </Link>
          ),


        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Search size={25} color={color} />,
        }}
      />
    </Tabs>
  );
}

