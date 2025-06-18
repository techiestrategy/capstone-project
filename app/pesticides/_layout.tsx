// app/pesticides/_layout.tsx
import { Stack } from 'expo-router';

export default function PesticidesLayout() {
  return (
    <Stack>
      

      {/* This maps to app/pesticides/detail.jsx
        The 'name' prop should be "detail", matching the file name without the extension.
      */}
      <Stack.Screen name="details" options={{ headerShown: false }} />

      {/* Add other screens here if you add more files to app/pesticides/ */}
    </Stack>
  );
}