import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Course } from '../types/course.types';
import { CourseCarousel } from './ui/CourseCarousel';

const { width: windowWidth } = Dimensions.get('window');

const dummyCourses: Course[] = [
    { id: '1', title: 'Medical Anatomy', category: 'Biology', color: '#7b011e' },
    { id: '2', title: 'Advanced Surgery', category: 'Practice', color: '#1a1a1a' },
    { id: '3', title: 'Pharmacology 101', category: 'Chemistry', color: '#4a4a4a' },
];

const ExploreCourses = () => {
    const ref = React.useRef<ICarouselInstance>(null);

    return (
        <View className="mb-8">
            <View className="flex-row justify-between items-center py-4 px-6">
                <Text className="text-tdark font-bold text-2xl">Explore Courses</Text>
                <Link href="/courses" className="text-tdark font-semibold text-base">See all</Link>
            </View>
            <View className="flex-1 items-center">
                <CourseCarousel
                    ref={ref}
                    loop
                    width={windowWidth * 0.8}
                    height={200}
                    autoPlay={true}
                    data={dummyCourses}
                    scrollAnimationDuration={1000}
                />
            </View>
        </View>
    );
};


export default ExploreCourses;