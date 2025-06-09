import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: '#F58634',
        tabBarInactiveTintColor: '#00A859',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
      name="index"
      options={{
        title: 'Dashboard',
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="home" size={25} color={color} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: 'black', fontSize: 11, fontWeight: focused ? 'bold' : 'normal', }}>Dashboard</Text>
        ),
      }}
    />
      <Tabs.Screen
        name="harvest"
        options={{
          title: 'Harvest',
          tabBarIcon: ({ color }) => <FontAwesome5 name="carrot" size={25} color={color} />,
          tabBarLabel: ({ focused }) => (
          <Text style={{ color: 'black', fontSize: 11, fontWeight: focused ? 'bold' : 'normal', }}>Harvest</Text>
        ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color }) => <FontAwesome5 name="database" size={25} color={color} />,
          tabBarLabel: ({ focused }) => (
          <Text style={{ color: 'black', fontSize: 11, fontWeight: focused ? 'bold' : 'normal', }}>Inventory</Text>
        ),
        }}
      />
      <Tabs.Screen
        name="pesticides"
        options={{
          title: 'Pesticides',
          tabBarIcon: ({ color }) => <FontAwesome5 name="fire-extinguisher" size={25} color={color} />,
          tabBarLabel: ({ focused }) => (
          <Text style={{ color: 'black', fontSize: 11, fontWeight: focused ? 'bold' : 'normal', }}>Pesticides</Text>
        ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }) => <FontAwesome5 name="bell" size={25} color={color} />,
          tabBarLabel: ({ focused }) => (
          <Text style={{ color: 'black', fontSize: 11, fontWeight: focused ? 'bold' : 'normal', }}>Alerts</Text>
        ),
        }}
      />
    </Tabs>
  );
}
