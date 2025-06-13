// app/myfarm/_layout.tsx
import { Stack } from 'expo-router';

export default function MyFarmLayout() {
  return (
    <Stack>
      {/* This stack will contain listFarm.jsx */}
      <Stack.Screen name="listFarm" options={{ headerShown: false }} />
      {/* You can add more Stack.Screen entries here if you add more files to myfarm/ */}
    </Stack>
  );
}