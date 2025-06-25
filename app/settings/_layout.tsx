// app/myfarm/_layout.tsx
import { Stack } from 'expo-router';

export default function MyNotificationLayout() {
  return (
    <Stack>
      {/* This stack will contain listFarm.jsx */}
      <Stack.Screen name="SettingsScreen" options={{ headerShown: false }} />
      <Stack.Screen name="UsersScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SendBulkSms" options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SubscriptionScreen" options={{ headerShown: false }} />
      <Stack.Screen name="PaymentDetailsScreen" options={{ headerShown: false }} />
      {/* You can add more Stack.Screen entries here if you add more files to myfarm/ */}
    </Stack>
  );
}