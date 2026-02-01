import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ProfilePage = () => {
    const insets = useSafeAreaInsets()
    const [personalInfoExpanded, setPersonalInfoExpanded] = useState(false)
    const [progressExpanded, setProgressExpanded] = useState(false)
    const personalInfoAnimation = useState(new Animated.Value(0))[0]
    const progressAnimation = useState(new Animated.Value(0))[0]

    return (
        <View className="flex-1 bg-brand-bg">
            <ScrollView
                scrollEnabled={true}
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 140 }}
            >
                {/* Header */}
                <View
                    className="px-4 py-4 flex-row items-center justify-between border-b border-[#e5dfcf]"
                    style={{ paddingTop: insets.top + 16 }}
                >
                    <Text className="text-[#7b011e] text-xl font-bold tracking-tight">Profile</Text>
                    <TouchableOpacity className="p-2 rounded-full bg-[#ebe5d5]">
                        <MaterialIcons name="settings" size={24} color="#7b011e" />
                    </TouchableOpacity>
                </View>

                {/* Profile Section */}
                <View className="flex-col items-center pt-10 pb-8 px-4">
                    {/* Profile Image with Edit Button */}
                    <View className="relative">
                        <View className="w-32 h-32 rounded-full border-4 border-[#7b011e] shadow-xl overflow-hidden bg-gray-200">
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxzkcUAluul4Zu3SSwx0uOCZdl71xLTHWdWOTlxX-Dnue4iCjgjIqwNsNrBHvcA8vxu7LERcQtBhfz6lp4NyLcLZicpihSndYo-ln1vT-GeRwjS8r7GPmIfFAmMtQO4cr80n7RZqu6KSOGw6-yjfQ7VXom152oA1ourwPExXZRvXSrHWk5-Qyra-xEfPkLtFOXBXmUymdMbskYjdsa6zB4QuxNbdxOOmMPadXx5Y30BQw6VQS55_gfMhV4HU8u4j-PuO1txmYxfOM' }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        {/* Edit Button Overlay */}
                        <TouchableOpacity className="absolute bottom-1 right-1 w-8 h-8 bg-[#7b011e] rounded-full border-4 border-[#f5f1e6] items-center justify-center shadow-md">
                            <MaterialIcons name="edit" size={16} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Name and Role */}
                    <Text className="mt-6 text-2xl font-bold text-slate-900">Dr. Mahmoud</Text>
                    <Text className="text-[#7b011e] font-semibold text-sm uppercase tracking-widest mt-1">
                        Senior Cardiologist
                    </Text>

                    {/* Stats Cards */}
                    <View className="flex-row gap-4 mt-6 w-full">
                        {/* Courses Card */}
                        <View className="flex-1 bg-white/60 rounded-2xl p-4 border border-[#e5dfcf] items-center">
                            <Text className="text-xs text-slate-500 font-medium">Courses</Text>
                            <Text className="text-lg font-bold text-[#7b011e]">12</Text>
                        </View>
                        {/* CME Credits Card */}
                        <View className="flex-1 bg-white/60 rounded-2xl p-4 border border-[#e5dfcf] items-center">
                            <Text className="text-xs text-slate-500 font-medium">Total hours</Text>
                            <Text className="text-lg font-bold text-[#7b011e]">48</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Options */}
                <View className="px-4 gap-2">
                    {/* Personal Information Accordion */}
                    <View className="bg-white rounded-2xl border border-[#e5dfcf] shadow-sm overflow-hidden">
                        {/* Accordion Header */}
                        <TouchableOpacity
                            className="w-full flex-row items-center justify-between p-4 active:scale-[0.99]"
                            onPress={() => {
                                setPersonalInfoExpanded(!personalInfoExpanded)
                                Animated.timing(personalInfoAnimation, {
                                    toValue: personalInfoExpanded ? 0 : 1,
                                    duration: 300,
                                    useNativeDriver: true,
                                }).start()
                            }}
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="w-10 h-10 bg-[#7b011e]/5 rounded-xl items-center justify-center">
                                    <MaterialIcons name="person" size={24} color="#7b011e" />
                                </View>
                                <Text className="font-semibold text-slate-800">Personal Information</Text>
                            </View>
                            <Animated.View
                                style={{
                                    transform: [{
                                        rotate: personalInfoAnimation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['-90deg', '0deg'],
                                        }),
                                    }],
                                }}
                            >
                                <MaterialIcons name="expand-more" size={24} color="#94a3b8" />
                            </Animated.View>
                        </TouchableOpacity>

                        {/* Accordion Content */}
                        {personalInfoExpanded && (
                            <View className="px-4 pb-4 pt-2 border-t border-[#e5dfcf]">
                                <View className="gap-3">
                                    {/* Name */}
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-sm text-slate-500">Full Name</Text>
                                        <Text className="text-sm font-semibold text-slate-800">Dr. Mahmoud Eltohamy</Text>
                                    </View>
                                    {/* Email */}
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-sm text-slate-500">Email</Text>
                                        <Text className="text-sm font-semibold text-slate-800">dr.mahmoud@x4dr.com</Text>
                                    </View>
                                    {/* Phone */}
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-sm text-slate-500">Phone</Text>
                                        <Text className="text-sm font-semibold text-slate-800">+20 123 456 7890</Text>
                                    </View>
                                    {/* Specialization */}
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-sm text-slate-500">Specialization</Text>
                                        <Text className="text-sm font-semibold text-slate-800">Cardiology</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* My Progress */}
                    <View className="bg-white rounded-2xl border border-[#e5dfcf] shadow-sm overflow-hidden">
                        {/* Accordion Header */}
                        <TouchableOpacity
                            className="w-full flex-row items-center justify-between p-4 active:scale-[0.99]"
                            onPress={() => {
                                setProgressExpanded(!progressExpanded)
                                Animated.timing(progressAnimation, {
                                    toValue: progressExpanded ? 0 : 1,
                                    duration: 300,
                                    useNativeDriver: true,
                                }).start()
                            }}
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="w-10 h-10 bg-[#7b011e]/5 rounded-xl items-center justify-center">
                                    <MaterialIcons name="person" size={24} color="#7b011e" />
                                </View>
                                <Text className="font-semibold text-slate-800">Progress</Text>
                            </View>
                            <Animated.View
                                style={{
                                    transform: [{
                                        rotate: progressAnimation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['-90deg', '0deg'],
                                        }),
                                    }],
                                }}
                            >
                                <MaterialIcons name="expand-more" size={24} color="#94a3b8" />
                            </Animated.View>
                        </TouchableOpacity>

                        {/* Accordion Content */}
                        {progressExpanded && (
                            <View className="px-4 pb-4 pt-2 border-t border-[#e5dfcf]">
                                <View className="gap-3">
                                    {/* Name */}
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-sm text-slate-500">Your Progress</Text>
                                        <Text className="text-sm font-semibold text-slate-800">45 hours in totals</Text>
                                    </View>
                                    {/* Email */}
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-sm text-slate-500">Email</Text>
                                        <Text className="text-sm font-semibold text-slate-800">dr.mahmoud@x4dr.com</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </View>

                {/* Logout Button */}
                <View className="px-4 mt-12">
                    <TouchableOpacity className="w-full py-4 bg-[#7b011e] rounded-2xl flex-row items-center justify-center gap-2 shadow-lg active:scale-[0.98]">
                        <MaterialIcons name="logout" size={24} color="#f5f1e6" />
                        <Text className="text-[#f5f1e6] font-bold">Logout</Text>
                    </TouchableOpacity>
                    <Text className="text-center text-slate-400 text-[10px] mt-6 font-medium uppercase tracking-[0.2em]">
                        Medical Education App v2.4.0
                    </Text>
                </View>
            </ScrollView >
        </View >
    )
}

export default ProfilePage
