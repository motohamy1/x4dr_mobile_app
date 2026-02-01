import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Course } from '../../app/types/course.types';

interface CourseCardProps {
    course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <View className="bg-tbright rounded-[30px] overflow-hidden mb-4 mx-6 border border-slate-200" style={styles.card}>
            {/* Top Image Section */}
            <View className="bg-[#050505] items-center justify-center p-8 h-[160px] rounded-b-3xl">
                <View className="w-32 h-32 rounded-full overflow-hidden border-[6px] border-white/5 shadow-2xl bg-brand-primary/20">
                    {course.image ? (
                        <Image
                            source={course.image}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="w-full h-full items-center justify-center">
                            <FontAwesome name="book" size={40} color="white" opacity={0.5} />
                        </View>
                    )}
                </View>
            </View>

            {/* Content Section */}
            <View className="p-4 justify-between">
                <View>
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-xl font-bold text-slate-900 flex-1 leading-[24px]" numberOfLines={1}>
                            {course.title}
                        </Text>
                        {course.isPopular && (
                            <View className="bg-red-50 px-2 py-1 rounded-full ml-1">
                                <Text className="text-red-700 text-[8px] font-extrabold uppercase tracking-widest">
                                    POPULAR
                                </Text>
                            </View>
                        )}
                    </View>

                    <View className="flex-row items-center">
                        <FontAwesome name="star" size={16} color="#f59e0b" />
                        <Text className="text-slate-500 ml-1 text-sm font-medium">
                            {course.rating || 'N/A'}
                        </Text>
                        {course.reviews && (
                            <Text className="text-slate-400 ml-1 text-xs">
                                ({course.reviews})
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    }
});
