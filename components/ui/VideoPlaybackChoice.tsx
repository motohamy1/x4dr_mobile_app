import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface VideoPlaybackChoiceProps {
    visible: boolean;
    onDownload: () => void;
    onStream: () => void;
    onCancel: () => void;
    title?: string;
    style?: object;
}

const VideoPlaybackChoice: React.FC<VideoPlaybackChoiceProps> = ({
    visible,
    onDownload,
    onStream,
    onCancel,
    title = "Ready to Watch?",
    style
}) => {
    if (!visible) return null;

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="absolute inset-0 z-50 justify-center items-center"
            style={style}
        >
            <BlurView intensity={20} className="absolute inset-0" tint="dark">
                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={onCancel}
                />
            </BlurView>

            <View className="bg-white mx-6 p-6 rounded-3xl shadow-xl w-[90%] max-w-[400px]">
                <View className="items-center mb-6">
                    <View className="w-16 h-16 bg-[#fff0f3] rounded-full items-center justify-center mb-4">
                        <MaterialIcons name="play-lesson" size={32} color="#7b011e" />
                    </View>
                    <Text className="text-xl font-bold text-gray-900 text-center mb-2">{title}</Text>
                    <Text className="text-gray-500 text-center">Choose how you would like to view this lesson.</Text>
                </View>

                <View className="gap-3">
                    <TouchableOpacity
                        onPress={onDownload}
                        className="flex-row items-center bg-[#7b011e] p-4 rounded-xl shadow-sm"
                    >
                        <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
                            <MaterialIcons name="file-download" size={24} color="white" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white font-bold text-base">Download & Play</Text>
                            <Text className="text-white/80 text-xs">Best for low connection</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onStream}
                        className="flex-row items-center bg-white border-2 border-[#e5dfcf] p-4 rounded-xl"
                    >
                        <View className="w-10 h-10 bg-[#f7f5ef] rounded-full items-center justify-center mr-3">
                            <MaterialIcons name="stream" size={24} color="#7b011e" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[#7b011e] font-bold text-base">Continue Online</Text>
                            <Text className="text-gray-500 text-xs">Stream instantly</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#7b011e" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={onCancel} className="mt-6 items-center">
                    <Text className="text-gray-400 font-medium">Cancel</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default VideoPlaybackChoice;
