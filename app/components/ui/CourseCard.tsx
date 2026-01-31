import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Course } from '../../types/course.types';

interface CourseCardProps {
    course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <View className="bg-brand-bg rounded-[30px] overflow-hidden shadow-2xl flex-1 mb-4 mx-6" style={styles.card}>
            {/* Top Image Section */}
            <View className="bg-[#050505] items-center justify-center p-8 h-[200px] rounded-b-3xl">
                <View className="w-40 h-40 rounded-full overflow-hidden border-[6px] border-white/5 shadow-2xl">
                    <Image
                        source={course.image}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>
            </View>

            {/* Content Section */}
            <View className="p-4 justify-between flex-1">
                <View>
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-[22px] font-bold text-slate-900 flex-1 leading-[28px]">
                            {course.title}
                        </Text>
                        {course.isPopular && (
                            <View className="bg-[#fcecec] px-3 py-1.5 rounded-full ml-2">
                                <Text className="text-[#9b1c1c] text-[10px] font-extrabold uppercase tracking-widest">
                                    POPULAR
                                </Text>
                            </View>
                        )}
                    </View>

                    <View className="flex-row items-center">
                        <FontAwesome name="star" size={24} color="#f59e0b" />
                        <Text className="text-slate-500 ml-2 text-lg font-medium">
                            {course.rating}
                        </Text>
                        <Text className="text-slate-400 ml-2 text-lg">
                            ({course.reviews})
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.15,
        shadowRadius: 25,
        elevation: 15,
    },
});
