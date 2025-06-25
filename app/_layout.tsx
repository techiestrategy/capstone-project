import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// import { Text } from 'react-native'; // You won't need Text here if you don't show a title

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    PoppinsBold: require('../assets/fonts/PoppinsBold.ttf'),
    PoppinsMedium: require('../assets/fonts/PoppinsMedium.ttf'),
    PoppinsSemiBold: require('../assets/fonts/PoppinsSemiBold.ttf'),
    PoppinsExtraBold: require('../assets/fonts/PoppinsExtraBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/*
          Removing the 'title' from 'index' screen because it's headerShown: false
          and it's not the screen causing the issue based on your latest info.
          The previous fix for 'Home' was a general good practice but not the root cause here.
        */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* This is the CRUCIAL ADDITION for your login route */}
        <Stack.Screen
          name="(auth)/login" // Matches the router.push('login') call
          options={{ headerShown: false }} // Explicitly hide header at the navigator level
        />

        <Stack.Screen
          name="(auth)/forgotpass" // Matches the router.push('login') call
          options={{ headerShown: false }} // Explicitly hide header at the navigator level
        />

        <Stack.Screen
          name="(auth)/register" // Matches the router.push('login') call
          options={{ headerShown: false }} // Explicitly hide header at the navigator level
        />

        <Stack.Screen name="myfarm" options={{ headerShown: false }} />
        <Stack.Screen name="harvest" options={{ headerShown: false }} />
        <Stack.Screen name="inventory" options={{ headerShown: false }} />
        <Stack.Screen name="alert" options={{ headerShown: false }} />
        <Stack.Screen name="pesticides" options={{ headerShown: false }} />
         <Stack.Screen name="farmsetup" options={{ headerShown: false }} />
         <Stack.Screen name="notification" options={{ headerShown: false }} />
         <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}