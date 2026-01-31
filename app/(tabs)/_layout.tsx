import { Ionicons } from "@expo/vector-icons";
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";
import { Colors } from "../../constants/theme";

export default function TabLayout() {
    return (
        <NativeTabs
            labelVisibilityMode="labeled"
            tintColor={Colors.light.tint}

            backgroundColor={Colors.light.background}
            disableTransparentOnScrollEdge={true} // Keep color solid on iOS
            indicatorColor={Colors.light.tint} // Color for the active indicator on Android
            labelStyle={{
                default: {
                    fontSize: 10,
                    fontWeight: '800',
                    color: Colors.light.text, // Re-aligning with theme for readability
                },
                selected: {
                    fontSize: 12,
                    fontWeight: '800',
                    color: Colors.light.tint,
                },
            }}
            iconColor={{
                default: Colors.light.icon,     // Unselected color
                selected: '#ffffff',   // Selected color
            }}
        >
            <NativeTabs.Trigger name="index">
                <Icon src={<VectorIcon family={Ionicons} name="home-outline" />} />
                <Label>Home</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="courses">
                <Icon src={<VectorIcon family={Ionicons} name="book" />} />
                <Label>Courses</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="my_courses">
                <Icon src={<VectorIcon family={Ionicons} name="book-outline" />} />
                <Label>My Courses</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="downloads">
                <Icon src={<VectorIcon family={Ionicons} name="download-outline" />} />
                <Label>Downloads</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="my_profile">
                <Icon src={<VectorIcon family={Ionicons} name="person-outline" />} />
                <Label>Profile</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}
