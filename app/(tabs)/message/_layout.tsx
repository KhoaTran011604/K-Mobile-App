import { Stack, usePathname } from "expo-router";

export default function Layout() {
  const pathname = usePathname();

  return (
    <Stack
      screenOptions={{
        animation: pathname.startsWith("/message") ? "default" : "none",

        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Message" }} />
      <Stack.Screen name="detail" options={{ title: "Message Detail" }} />
      <Stack.Screen name="media" options={{ title: "Second Also Nested" }} />
    </Stack>
  );
}
