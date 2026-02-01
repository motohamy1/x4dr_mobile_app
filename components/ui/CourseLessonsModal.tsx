import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import {
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


// Types for course and lesson data
export interface Lesson {
    id: string
    title: string
    description: string
    duration: string
    type: 'video' | 'reading' | 'quiz' | 'practice'
    completed: boolean
    locked: boolean
}

export interface CourseData {
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
    lessonsList: Lesson[]
}

interface CourseLessonsModalProps {
    visible: boolean
    course: CourseData | null
    onClose: () => void
    onLessonSelect: (lesson: Lesson) => void
    onContinue: () => void
}

const LessonIcon = ({ type, completed, locked }: { type: Lesson['type']; completed: boolean; locked: boolean }) => {
    const iconColor = locked ? '#94a3b8' : completed ? '#22c55e' : '#7b011e'
    const bgColor = locked ? '#f1f5f9' : completed ? '#dcfce7' : '#ffe5e7'

    const getIconName = () => {
        switch (type) {
            case 'video':
                return 'play-circle-filled'
            case 'reading':
                return 'menu-book'
            case 'quiz':
                return 'quiz'
            case 'practice':
                return 'edit-note'
        }
    }

    return (
        <View className={`w-12 h-12 rounded-full items-center justify-center ${bgColor}`}>
            <MaterialIcons name={getIconName() as any} size={24} color={iconColor} />
        </View>
    )
}

const CourseLessonsModal: React.FC<CourseLessonsModalProps> = ({
    visible,
    course,
    onClose,
    onLessonSelect,
    onContinue,
}) => {
    const insets = useSafeAreaInsets()

    if (!visible || !course) return null

    const nextLesson = course.lessonsList.find(l => !l.completed && !l.locked)
    const completedCount = course.lessonsList.filter(l => l.completed).length

    const getLevelColor = (level: CourseData['level']) => {
        switch (level) {
            case 'Beginner':
                return 'bg-green-100 text-green-700'
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-700'
            case 'Advanced':
                return 'bg-red-100 text-red-700'
        }
    }

    return (
        <>
            {/* Modal Content */}
            <Animated.View
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(300)}
                className="absolute inset-0 z-50 bg-brand-bg"
                style={{ paddingTop: insets.top, marginBottom: 80 }}
            >
                {/* Header with close button */}
                <View
                    className="px-4 py-4 flex-row items-center justify-between border-b border-[#e5dfcf]"
                    style={{ paddingTop: insets.top + 16 }}
                >
                    <View className="flex-1">
                        <Text className="text-[#7b011e] text-lg font-bold tracking-tight" numberOfLines={1}>
                            Course Lessons
                        </Text>
                        <Text className="text-slate-500 text-xs mt-0.5" numberOfLines={1}>
                            {course.title}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={onClose}
                        className="w-10 h-10 rounded-full bg-[#ebe5d5] items-center justify-center ml-3"
                    >
                        <MaterialIcons name="close" size={22} color="#7b011e" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {/* Course Info Card */}
                    <View className="mx-4 mt-4 p-4 bg-white rounded-2xl border border-[#e5dfcf]">
                        <View className="flex-row items-center gap-2 mb-3">
                            <Text className="text-[10px] text-[#7b011e] font-semibold uppercase">
                                {course.category}
                            </Text>
                            <View className={`px-2 py-0.5 rounded-full ${getLevelColor(course.level)}`}>
                                <Text className="text-[9px] font-semibold">{course.level}</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between mb-3">
                            <View className="flex-row items-center gap-4">
                                <View className="items-center">
                                    <MaterialIcons name="schedule" size={18} color="#7b011e" />
                                    <Text className="text-[10px] text-slate-500 mt-1">
                                        {course.duration}
                                    </Text>
                                </View>
                                <View className="items-center">
                                    <MaterialIcons name="play-circle" size={18} color="#7b011e" />
                                    <Text className="text-[10px] text-slate-500 mt-1">
                                        {completedCount}/{course.lessons} done
                                    </Text>
                                </View>
                                <View className="items-center">
                                    <MaterialIcons name="person" size={18} color="#7b011e" />
                                    <Text className="text-[10px] text-slate-500 mt-1" numberOfLines={1}>
                                        {course.instructor}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Progress Bar */}
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="text-xs font-semibold text-slate-900">
                                Overall Progress
                            </Text>
                            <Text className="text-xs font-bold text-[#7b011e]">
                                {Math.round((completedCount / course.lessons) * 100)}%
                            </Text>
                        </View>
                        <View className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <View
                                className="h-full bg-[#7b011e] rounded-full"
                                style={{ width: `${(completedCount / course.lessons) * 100}%` }}
                            />
                        </View>
                    </View>

                    {/* Continue Learning Button */}
                    {nextLesson && (
                        <View className="mx-4 mt-4">
                            <TouchableOpacity
                                onPress={onContinue}
                                className="w-full p-4 bg-[#7b011e] rounded-2xl flex-row items-center gap-3 shadow-lg"
                            >
                                <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
                                    <MaterialIcons name="play-arrow" size={24} color="white" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white text-xs font-semibold opacity-80">
                                        Continue Learning
                                    </Text>
                                    <Text className="text-white text-sm font-bold" numberOfLines={1}>
                                        {nextLesson.title}
                                    </Text>
                                </View>
                                <MaterialIcons name="arrow-forward" size={22} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Lessons List */}
                    <View className="px-4 mt-6 pb-8">
                        <Text className="text-slate-900 text-base font-bold mb-4">
                            All Lessons
                        </Text>
                        <View className="gap-3">
                            {course.lessonsList.map((lesson, index) => (
                                <Pressable
                                    key={lesson.id}
                                    onPress={() => !lesson.locked && onLessonSelect(lesson)}
                                    disabled={lesson.locked}
                                    className={`bg-white rounded-2xl border p-4 ${lesson.locked ? 'opacity-60' : 'border-[#e5dfcf]'} ${!lesson.locked ? 'shadow-sm' : ''}`}
                                >
                                    <View className="flex-row items-center gap-3">
                                        {/* Lesson Number */}
                                        <View className="w-8 h-8 rounded-full items-center justify-center bg-[#ebe5d5]">
                                            <Text className="text-xs font-bold text-[#7b011e]">
                                                {index + 1}
                                            </Text>
                                        </View>

                                        {/* Icon */}
                                        <LessonIcon
                                            type={lesson.type}
                                            completed={lesson.completed}
                                            locked={lesson.locked}
                                        />

                                        {/* Content */}
                                        <View className="flex-1">
                                            <View className="flex-row items-center gap-2 mb-1">
                                                <Text className="text-sm font-bold text-slate-900 flex-1" numberOfLines={1}>
                                                    {lesson.title}
                                                </Text>
                                                {lesson.completed && (
                                                    <MaterialIcons name="check-circle" size={18} color="#22c55e" />
                                                )}
                                                {lesson.locked && (
                                                    <MaterialIcons name="lock" size={16} color="#94a3b8" />
                                                )}
                                            </View>
                                            <Text className="text-xs text-slate-500" numberOfLines={1}>
                                                {lesson.description}
                                            </Text>
                                        </View>

                                        {/* Duration */}
                                        <View className="items-end">
                                            <Text className="text-xs text-slate-500">
                                                {lesson.duration}
                                            </Text>
                                            <Text className="text-[10px] text-slate-400 capitalize">
                                                {lesson.type}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Type Badge */}
                                    <View className="mt-3">
                                        <View
                                            className={`px-2 py-1 rounded-full w-fit ${lesson.type === 'video'
                                                ? 'bg-purple-100 text-purple-700'
                                                : lesson.type === 'reading'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : lesson.type === 'quiz'
                                                        ? 'bg-orange-100 text-orange-700'
                                                        : 'bg-green-100 text-green-700'
                                                }`}
                                        >
                                            <Text className="text-[9px] font-semibold capitalize">
                                                {lesson.type}
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </Animated.View>

            {/* Backdrop */}
            <Animated.View
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                className="absolute inset-0 bg-black/50 z-40"
                pointerEvents="none"
            />
        </>
    )
}

export default CourseLessonsModal
