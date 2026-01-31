import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, TCarouselProps } from 'react-native-reanimated-carousel';
import { Colors } from '../../../constants/theme';
import { coursesData } from '../../data/coursesData';
import { Course } from '../../types/course.types';
import { CourseCard } from './CourseCard';

const { width: windowWidth } = Dimensions.get('window');

type CourseCarouselProps = Partial<TCarouselProps<Course>> & {
    width?: number;
    height?: number;
};

export const CourseCarousel = React.forwardRef<ICarouselInstance, CourseCarouselProps>((props, ref) => {
    const {
        data = coursesData,
        width = windowWidth * 0.85,
        height = 400,
        autoPlay = false,
        loop = true,
        scrollAnimationDuration = 800,
        ...rest
    } = props;

    const [activeIndex, setActiveIndex] = useState(0);
    const internalRef = React.useRef<ICarouselInstance>(null);
    const carouselRef = (ref as React.RefObject<ICarouselInstance>) || internalRef;

    return (
        <View className="items-center justify-center py-6">
            <View className="relative w-full items-center justify-center" style={{ width: windowWidth }}>
                <Carousel<Course>
                    ref={carouselRef}
                    loop={loop}
                    width={width}
                    height={height}
                    style={{
                        width: windowWidth,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    autoPlay={autoPlay}
                    data={data}
                    scrollAnimationDuration={scrollAnimationDuration}
                    onSnapToItem={(index) => {
                        setActiveIndex(index);
                        props.onSnapToItem?.(index);
                    }}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.88,
                        parallaxScrollingOffset: 15,
                    }}
                    renderItem={({ item, animationValue }) => {
                        return (
                            <CustomItem
                                item={item}
                                animationValue={animationValue}
                            />
                        );
                    }}
                    {...rest as any}
                />

                {/* Vertical Fade Gradients at the edges */}
                <LinearGradient
                    colors={[Colors.light.background, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.leftFade}
                    pointerEvents="none"
                />
                <LinearGradient
                    colors={['transparent', Colors.light.background]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.rightFade}
                    pointerEvents="none"
                />

                {/* Navigation Arrows */}
                <View className="absolute inset-x-0 top-[45%] flex-row justify-between px-2 -translate-y-1/2 pointer-events-none z-20">
                    <TouchableOpacity
                        onPress={() => carouselRef.current?.prev()}
                        className="bg-white/90 w-11 h-11 rounded-full items-center justify-center pointer-events-auto"
                        style={styles.arrowShadow}
                    >
                        <Ionicons name="chevron-back" size={24} color={Colors.light.primary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => carouselRef.current?.next()}
                        className="bg-white/90 w-11 h-11 rounded-full items-center justify-center pointer-events-auto"
                        style={styles.arrowShadow}
                    >
                        <Ionicons name="chevron-forward" size={24} color={Colors.light.primary} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Pagination Dots */}
            <View className="flex-row items-center justify-center mt-4 gap-x-2">
                {data.map((_: Course, index: number) => (
                    <View
                        key={index}
                        className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-8 bg-[#7b011e]' : 'w-2.5 bg-[#7b011e]/20'
                            }`}
                    />
                ))}
            </View>
        </View>
    );
});

const CustomItem = ({ item, animationValue }: { item: Course; animationValue: SharedValue<number> }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animationValue.value,
            [-1, 0, 1],
            [0.6, 1, 0.6]
        );

        return {
            opacity,
            flex: 1,
        };
    });

    const blurStyle = useAnimatedStyle(() => {
        const blurOpacity = interpolate(
            animationValue.value,
            [-1, 0, 1],
            [1, 0, 1]
        );

        return {
            opacity: blurOpacity,
        };
    });

    return (
        <Animated.View style={[animatedStyle, { paddingVertical: 10 }]}>
            <CourseCard course={item} />

            {/* Overlay blur for inactive items */}
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    blurStyle,
                    { borderRadius: 30, overflow: 'hidden', pointerEvents: 'none' }
                ]}
            >
                <BlurView intensity={35} style={StyleSheet.absoluteFill} tint="light" />
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    arrowShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    leftFade: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 35,
        zIndex: 10,
    },
    rightFade: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 35,
        zIndex: 10,
    },
});
