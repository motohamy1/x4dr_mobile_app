import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
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
                <Icon sf={{ default: 'house', selected: 'house.fill' }} drawable="ic_menu_home" />
                <Label>Home</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="courses">
                <Icon sf={'book'} drawable="alert_dark_frame" />
                <Label>Courses</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="my_courses">
                <Icon sf={'bell'} drawable="btn_star" />
                <Label>My Courses</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="downloads">
                <Icon sf={'person'} drawable="editbox_background" />
                <Label>Downloads</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="my_profile">
                <Icon sf={'gear'} drawable="ic_lock_lock" />
                <Label>Profile</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}
