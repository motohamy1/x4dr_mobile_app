import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { coursesData } from '../app/data/coursesData';
import { CourseCarousel } from './ui/CourseCarousel';

const ExploreCourses = () => {
    return (
        <View className="mb-8">
            <View className="flex-row justify-between items-center py-4 px-6">
                <Text className="text-tdark font-bold text-2xl">Explore Courses</Text>
                <Link href="/courses" className="text-tdark font-semibold text-base">See all</Link>
            </View>
            <View className="flex-1 items-center">
                <CourseCarousel
                    width={360}
                    height={250}
                    autoPlay={true}
                    loop={true}
                    scrollAnimationDuration={1000}
                    autoPlayInterval={3000}
                    data={coursesData}
                />
            </View>
        </View>
    );
};


export default ExploreCourses;