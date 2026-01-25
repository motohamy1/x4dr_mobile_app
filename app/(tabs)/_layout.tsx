import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ headerShown: false }} />
            <Tabs.Screen name="courses" options={{ headerShown: false }} />
            <Tabs.Screen name="my_courses" options={{ headerShown: false }} />
            <Tabs.Screen name="my_profile" options={{ headerShown: false }} />
            <Tabs.Screen name="downloads" options={{ headerShown: false }} />
        </Tabs>
    )
}
