import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    Dimensions,
    Image,
    ImageBackground,
    Pressable,
    Animated as RNAnimated,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

// Types for course data
interface Course {
    id: string
    title: string
    description: string
    category: string
    duration: string
    lessons: number
    progress: number
    thumbnail: string
    instructor: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    content: string
}

const MyCoursesPage = () => {
    const insets = useSafeAreaInsets()
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

    // Course data
    const courses: Course[] = [
        {
            id: '1',
            title: 'Emergency Medicine Protocols',
            description: 'Master emergency response procedures',
            category: 'Emergency',
            duration: '8 hours',
            lessons: 12,
            progress: 65,
            thumbnail: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400',
            instructor: 'Dr. Sarah Johnson',
            level: 'Intermediate',
            content: 'This comprehensive course covers essential emergency medicine protocols including triage procedures, cardiac emergencies, respiratory distress, trauma management, and disaster preparedness. Learn evidence-based approaches to critical care situations.',
        },
        {
            id: '2',
            title: 'Cardiology Fundamentals',
            description: 'Understanding heart diseases',
            category: 'Cardiology',
            duration: '12 hours',
            lessons: 18,
            progress: 40,
            thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
            instructor: 'Dr. Michael Chen',
            level: 'Beginner',
            content: 'Explore the fundamentals of cardiovascular medicine including anatomy, common cardiac conditions, diagnostic techniques, and treatment options. Perfect for medical students and junior residents.',
        },
        {
            id: '3',
            title: 'Neuroscience Deep Dive',
            description: 'Advanced neural pathways',
            category: 'Neurology',
            duration: '15 hours',
            lessons: 20,
            progress: 20,
            thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400',
            instructor: 'Dr. Emily Roberts',
            level: 'Advanced',
            content: 'An in-depth exploration of the nervous system covering neuroanatomy, neurophysiology, common neurological disorders, and advanced diagnostic techniques. Designed for senior residents and practicing physicians.',
        },
        {
            id: '4',
            title: 'Pediatrics Essentials',
            description: 'Child healthcare basics',
            category: 'Pediatrics',
            duration: '10 hours',
            lessons: 15,
            progress: 85,
            thumbnail: 'https://images.unsplash.com/photo-1584515933487-9b17ed4b095f?w=400',
            instructor: 'Dr. Lisa Park',
            level: 'Beginner',
            content: 'Comprehensive pediatric care covering developmental milestones, common childhood illnesses, vaccination schedules, and pediatric emergency protocols. Essential for family practitioners and pediatricians.',
        },
        {
            id: '5',
            title: 'ECG Interpretation',
            description: 'Master heart rhythm analysis',
            category: 'Cardiology',
            duration: '6 hours',
            lessons: 10,
            progress: 50,
            thumbnail: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400',
            instructor: 'Dr. James Wilson',
            level: 'Intermediate',
            content: 'Learn to interpret electrocardiograms with confidence. Covers normal sinus rhythm, arrhythmias, myocardial infarction patterns, and conduction abnormalities. Includes practice tracings and case studies.',
        },
    ]

    const getLevelColor = (level: Course['level']) => {
        switch (level) {
            case 'Beginner':
                return 'bg-green-100 text-green-700'
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-700'
            case 'Advanced':
                return 'bg-red-100 text-red-700'
        }
    }

    const CourseCard = ({ course, onPress }: { course: Course; onPress: () => void }) => {
        const scale = React.useRef(new RNAnimated.Value(1)).current

        const handlePressIn = () => {
            RNAnimated.spring(scale, {
                toValue: 0.94,
                useNativeDriver: true,
            }).start()
        }

        const handlePressOut = () => {
            RNAnimated.spring(scale, {
                toValue: 0.99,
                useNativeDriver: true,
            }).start()
        }

        return (
            <RNAnimated.View style={{ transform: [{ scale }] }}>
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={onPress}
                    className="bg-white rounded-2xl border border-[#e5dfcf] shadow-sm overflow-hidden"
                >
                    <View className="flex-row">
                        {/* Thumbnail */}
                        <ImageBackground
                            source={{ uri: course.thumbnail }}
                            className="w-24 h-24 rounded-l-2xl"
                            imageStyle={{ resizeMode: 'cover' }}
                        >
                            <View className="flex-1 bg-black/20" />
                        </ImageBackground>

                        {/* Content */}
                        <View className="flex-1 p-3 justify-between">
                            <View>
                                <View className="flex-row items-center gap-2 mb-1">
                                    <Text className="text-[10px] text-[#7b011e] font-semibold uppercase">
                                        {course.category}
                                    </Text>
                                    <View
                                        className={`px-2 py-0.5 rounded-full ${getLevelColor(course.level)}`}
                                    >
                                        <Text className="text-[9px] font-semibold">{course.level}</Text>
                                    </View>
                                </View>
                                <Text className="text-sm font-bold text-slate-900" numberOfLines={1}>
                                    {course.title}
                                </Text>
                                <Text className="text-xs text-slate-500" numberOfLines={1}>
                                    {course.description}
                                </Text>
                            </View>

                            {/* Progress */}
                            <View>
                                <View className="flex-row justify-between items-center mb-1">
                                    <Text className="text-[10px] text-slate-500">
                                        {course.progress}% complete
                                    </Text>
                                    <Text className="text-[10px] text-slate-500">
                                        {course.lessons} lessons
                                    </Text>
                                </View>
                                <View className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <View
                                        className="h-full bg-[#7b011e] rounded-full"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Continue Button */}
                        {/* <TouchableOpacity
                            onPress={onPress}
                            className="px-6 py-2 bg-[#7b011e] rounded-l-2xl justify-center"
                        >
                            <MaterialIcons name="play-arrow" size={20} color="white" />
                        </TouchableOpacity> */}
                    </View>
                </Pressable>
            </RNAnimated.View>
        )
    }

    return (
        <View className="flex-1 bg-brand-bg">
            {/* Header */}
            <View
                className="px-4 py-4 flex-row items-center justify-between border-b border-[#e5dfcf]"
                style={{ paddingTop: insets.top + 16 }}
            >
                <Text className="text-[#7b011e] text-xl font-bold tracking-tight">My Courses</Text>
                <TouchableOpacity className="p-2 rounded-full bg-[#ebe5d5]">
                    <MaterialIcons name="search" size={24} color="#7b011e" />
                </TouchableOpacity>
            </View>

            {/* Course List */}
            <ScrollView
                scrollEnabled={true}
                className="flex-1"
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            >
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-slate-600 text-sm font-semibold">
                        {courses.length} Courses in progress
                    </Text>
                    {/* <TouchableOpacity className="flex-row items-center gap-1">
                        <MaterialIcons name="filter-list" size={18} color="#7b011e" />
                        <Text className="text-[#7b011e] text-xs font-semibold">Filter</Text>
                    </TouchableOpacity> */}
                </View>

                <View className="gap-3">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onPress={() => setSelectedCourse(course)}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Expanded Course Modal */}
            {selectedCourse && (
                <Animated.View
                    entering={FadeIn.duration(300)}
                    exiting={FadeOut.duration(300)}
                    className="absolute inset-0 z-50 bg-brand-bg"
                    style={{ paddingTop: insets.top }}
                >
                    {/* Close Button */}
                    <TouchableOpacity
                        onPress={() => setSelectedCourse(null)}
                        className="absolute top-12 right-4 z-10 w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg"
                        style={{ top: insets.top + 16 }}
                    >
                        <MaterialIcons name="close" size={24} color="#7b011e" />
                    </TouchableOpacity>

                    <ScrollView className="flex-1">
                        {/* Hero Image */}
                        <View className="relative h-64">
                            <Image
                                source={{ uri: selectedCourse.thumbnail }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                            <View className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <View className="absolute bottom-4 left-4 right-4">
                                <View className="flex-row items-center gap-2 mb-2">
                                    <Text className="text-white/90 text-xs font-semibold uppercase bg-[#7b011e] px-2 py-1 rounded-full">
                                        {selectedCourse.category}
                                    </Text>
                                    <View
                                        className={`px-2 py-1 rounded-full ${getLevelColor(selectedCourse.level)}`}
                                    >
                                        <Text className="text-[10px] font-semibold">
                                            {selectedCourse.level}
                                        </Text>
                                    </View>
                                </View>
                                <Text className="text-white text-xl font-bold" numberOfLines={2}>
                                    {selectedCourse.title}
                                </Text>
                            </View>
                        </View>

                        {/* Content */}
                        <View className="flex-1 bg-white rounded-t-3xl -mt-6 p-6 min-h-[400px]">
                            {/* Stats */}
                            <View className="flex-row justify-between mb-6">
                                <View className="items-center">
                                    <MaterialIcons name="schedule" size={20} color="#7b011e" />
                                    <Text className="text-xs text-slate-500 mt-1">
                                        {selectedCourse.duration}
                                    </Text>
                                </View>
                                <View className="items-center">
                                    <MaterialIcons name="play-circle" size={20} color="#7b011e" />
                                    <Text className="text-xs text-slate-500 mt-1">
                                        {selectedCourse.lessons} lessons
                                    </Text>
                                </View>
                                <View className="items-center">
                                    <MaterialIcons name="person" size={20} color="#7b011e" />
                                    <Text className="text-xs text-slate-500 mt-1" numberOfLines={1}>
                                        {selectedCourse.instructor}
                                    </Text>
                                </View>
                            </View>

                            {/* Progress Section */}
                            <View className="mb-6">
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-sm font-bold text-slate-900">
                                        Your Progress
                                    </Text>
                                    <Text className="text-sm font-bold text-[#7b011e]">
                                        {selectedCourse.progress}%
                                    </Text>
                                </View>
                                <View className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <View
                                        className="h-full bg-[#7b011e] rounded-full"
                                        style={{ width: `${selectedCourse.progress}%` }}
                                    />
                                </View>
                            </View>

                            {/* Description */}
                            <View className="mb-6">
                                <Text className="text-sm font-bold text-slate-900 mb-2">
                                    About this course
                                </Text>
                                <Text className="text-sm text-slate-600 leading-relaxed">
                                    {selectedCourse.content}
                                </Text>
                            </View>

                            {/* Continue Button */}
                            <TouchableOpacity className="w-full py-4 bg-[#7b011e] rounded-2xl flex-row items-center justify-center gap-2 shadow-lg">
                                <MaterialIcons name="play-arrow" size={24} color="white" />
                                <Text className="text-white font-bold text-base">Continue Learning</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Animated.View>
            )}

            {/* Backdrop */}
            {selectedCourse && (
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                    className="absolute inset-0 bg-black/50 z-40"
                    pointerEvents="none"
                />
            )}
        </View>
    )
}

export default MyCoursesPage
