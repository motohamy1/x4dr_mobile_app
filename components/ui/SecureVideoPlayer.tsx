import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import * as ScreenCapture from 'expo-screen-capture';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface SecureVideoPlayerProps {
    visible: boolean;
    source: any; // { uri: string } or require('./file.mp4')
    onClose: () => void;
    title?: string;
}

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

const SecureVideoPlayer: React.FC<SecureVideoPlayerProps> = ({
    visible,
    source,
    onClose,
    title
}) => {
    const video = useRef<Video>(null);
    const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
    const [showControls, setShowControls] = useState(true);
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
    const controlsTimeout = useRef<any>(null);

    // Security: Prevent Screen Capture
    useEffect(() => {
        let isMounted = true;

        const enableSecurity = async () => {
            try {
                await ScreenCapture.preventScreenCaptureAsync();
            } catch (e) {
                console.warn("Screen capture prevention failed", e);
            }
        };

        const disableSecurity = async () => {
            try {
                await ScreenCapture.allowScreenCaptureAsync();
            } catch (e) {
                console.warn("Screen capture allowance failed", e);
            }
        };

        if (visible) {
            enableSecurity();
        } else {
            disableSecurity();
        }

        return () => {
            disableSecurity();
        };
    }, [visible]);

    // Auto-hide controls
    useEffect(() => {
        resetControlsTimeout();
        return () => {
            if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
        };
    }, [showControls, status]);

    const resetControlsTimeout = () => {
        if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
        if (showControls && (status as any).isPlaying) {
            controlsTimeout.current = setTimeout(() => {
                setShowControls(false);
                setShowSpeedMenu(false);
            }, 4000);
        }
    };

    const handleCreateDetails = (status: AVPlaybackStatus) => {
        setStatus(status);
    };

    const togglePlayPause = async () => {
        if (!video.current) return;
        if ((status as any).isPlaying) {
            await video.current.pauseAsync();
        } else {
            await video.current.playAsync();
        }
        resetControlsTimeout();
    };

    const handleDoubleTap = (side: 'left' | 'right') => {
        if (!video.current || !(status as any).positionMillis) return;

        const currentTime = (status as any).positionMillis;
        const amount = 10000; // 10s
        let newTime = side === 'left' ? currentTime - amount : currentTime + amount;

        if (newTime < 0) newTime = 0;
        if (newTime > (status as any).durationMillis) newTime = (status as any).durationMillis;

        video.current.setPositionAsync(newTime);
        resetControlsTimeout();
    };

    const formatTime = (millis: number) => {
        if (!millis) return "00:00";
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSeek = (percentage: number) => {
        if (!video.current || !(status as any).durationMillis) return;
        const seekTime = percentage * (status as any).durationMillis;
        video.current.setPositionAsync(seekTime);
    };

    const changeSpeed = async (speed: number) => {
        if (!video.current) return;
        await video.current.setRateAsync(speed, true);
        setPlaybackSpeed(speed);
        setShowSpeedMenu(false);
        resetControlsTimeout();
    };

    const currentPos = (status as any).positionMillis || 0;
    const totalDur = (status as any).durationMillis || 1;
    const progress = currentPos / totalDur;

    if (!visible) return null;

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View className="flex-1 bg-black justify-center items-center">

                <Video
                    ref={video}
                    style={StyleSheet.absoluteFill}
                    source={source}
                    useNativeControls={false}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping={false}
                    onPlaybackStatusUpdate={setStatus}
                    shouldPlay={true}
                />

                {/* Content Overlay / Click Handler */}
                <TouchableWithoutFeedback onPress={() => setShowControls(!showControls)}>
                    <View style={StyleSheet.absoluteFill} className="justify-center items-center">
                        {/* Middle Play/Pause/Loading */}
                        {!(status as any).isLoaded ? (
                            <ActivityIndicator size="large" color="#7b011e" />
                        ) : showControls && (
                            <Animated.View entering={FadeIn} exiting={FadeOut} className="flex-row gap-12 items-center">
                                <TouchableOpacity onPress={() => handleDoubleTap('left')}>
                                    <MaterialIcons name="replay-10" size={32} color="white" style={{ opacity: 0.8 }} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={togglePlayPause}>
                                    <View className="bg-white/20 rounded-full p-6 backdrop-blur-md">
                                        <Ionicons
                                            name={(status as any).isPlaying ? "pause" : "play"}
                                            size={48}
                                            color="white"
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleDoubleTap('right')}>
                                    <MaterialIcons name="forward-10" size={32} color="white" style={{ opacity: 0.8 }} />
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    </View>
                </TouchableWithoutFeedback>

                {/* Controls UI */}
                {showControls && (
                    <Animated.View
                        entering={FadeIn}
                        exiting={FadeOut}
                        style={StyleSheet.absoluteFill}
                        pointerEvents="box-none"
                        className="justify-between py-12 px-6"
                    >
                        {/* Top Bar */}
                        <View className="flex-row justify-between items-center">
                            <TouchableOpacity onPress={onClose} className="bg-black/40 p-2 rounded-full">
                                <Ionicons name="close" size={24} color="white" />
                            </TouchableOpacity>
                            <Text className="text-white font-bold text-lg shadow-sm" numberOfLines={1}>{title || 'Playing Video'}</Text>
                            <TouchableOpacity onPress={() => setShowSpeedMenu(!showSpeedMenu)} className="bg-black/40 px-3 py-1 rounded-full border border-white/20">
                                <Text className="text-white font-bold">{playbackSpeed}x</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Speed Menu (Absolute positioned relative to top) */}
                        {showSpeedMenu && (
                            <View className="absolute top-24 right-6 bg-black/80 rounded-xl overflow-hidden border border-white/10 p-2 gap-1 z-50">
                                {SPEED_OPTIONS.map((speed) => (
                                    <TouchableOpacity
                                        key={speed}
                                        onPress={() => changeSpeed(speed)}
                                        className={`px-4 py-2 rounded-lg ${playbackSpeed === speed ? 'bg-[#7b011e]' : ''}`}
                                    >
                                        <Text className={`text-center ${playbackSpeed === speed ? 'text-white font-bold' : 'text-gray-300'}`}>
                                            {speed}x
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        {/* Bottom Bar */}
                        <View className="bg-black/60 rounded-2xl p-4 backdrop-blur-lg">
                            <View className="flex-row justify-between mb-2">
                                <Text className="text-white text-xs font-semibold">{formatTime(currentPos)}</Text>
                                <Text className="text-white/60 text-xs font-medium">{formatTime(totalDur)}</Text>
                            </View>

                            {/* Custom Seek Bar */}
                            <View className="h-6 justify-center">
                                <View className="h-1 bg-white/30 rounded-full overflow-hidden w-full">
                                    <View style={{ width: `${progress * 100}%` }} className="h-full bg-[#7b011e]" />
                                </View>
                                {/* Touch Area for Seek */}
                                <View
                                    style={StyleSheet.absoluteFill}
                                    onTouchEnd={(e) => {
                                        const { locationX } = e.nativeEvent;
                                        const width = Dimensions.get('window').width - 48 - 32; // Approx width calc based on padding
                                        // Or better, just use layout measurement
                                    }}
                                >
                                    {/* A simpler Slider approach is tricky without the component, going to use a simpler touchable bar */}
                                    <Pressable
                                        style={StyleSheet.absoluteFill}
                                        onTouchStart={(e) => {
                                            // Quick hack for seek
                                            // Real implementation would want onLayout to get exact width
                                        }}
                                    />
                                </View>
                                <SliderPlaceholder
                                    value={progress}
                                    onSlidingComplete={handleSeek}
                                />
                            </View>
                        </View>
                    </Animated.View>
                )}
            </View>
        </Modal>
    );
};

// Simple visual slider replacement since we want to avoid extra heavy deps if possible
// But actually, touching the specific point is hard without width. 
// Let's implement a quick width-aware pressable
const SliderPlaceholder = ({ value, onSlidingComplete }: { value: number, onSlidingComplete: (val: number) => void }) => {
    const [width, setWidth] = useState(1);

    return (
        <Pressable
            className="absolute inset-0 justify-center"
            onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
            onPress={(e) => {
                const percent = e.nativeEvent.locationX / width;
                onSlidingComplete(percent);
            }}
        >
            <View className="w-4 h-4 rounded-full bg-white shadow-sm absolute" style={{
                left: `${value * 100}%`,
                marginLeft: -8
            }} />
        </Pressable>
    )
}

export default SecureVideoPlayer;
