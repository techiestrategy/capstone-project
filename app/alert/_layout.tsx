// app/myfarm/_layout.tsx
import { Stack } from 'expo-router';

export default function MyAlertLayout() {
  return (
    <Stack>
      {/* This stack will contain listFarm.jsx */}
      <Stack.Screen name="addAlert" options={{ headerShown: false }} />
      {/* You can add more Stack.Screen entries here if you add more files to myfarm/ */}
    </Stack>
  );
}