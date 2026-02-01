import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Types for download data
interface DownloadItem {
    id: string
    title: string
    progress: number
    total: number
    progressPercent: number
    thumbnail: any
}

interface OfflineCourse {
    id: string
    title: string
    lessons: number
    thumbnail: any
    downloadedLessons: {
        id: string
        title: string
    }[]
    expanded: boolean
}

import { coursesData } from '../data/coursesData'

const DownloadsPage = () => {
    const insets = useSafeAreaInsets()

    // State for accordion expansions
    const [offlineCourses, setOfflineCourses] = useState<OfflineCourse[]>(
        coursesData.slice(0, 4).map((course, index) => ({
            id: course.id,
            title: course.title,
            lessons: course.lessons || 10,
            thumbnail: course.image,
            downloadedLessons: [
                { id: '1', title: 'Introduction' },
                { id: '2', title: 'Key Concepts' },
                { id: '3', title: 'Case Study 1' }
            ],
            expanded: index === 0, // Expand the first one by default
        }))
    )

    const [activeDownload] = useState<DownloadItem>({
        id: '1',
        title: 'Emergency Medicine Protocols',
        progress: 4,
        total: 12,
        progressPercent: 38,
        thumbnail: null,
    })

    // Toggle accordion expansion
    const toggleAccordion = (id: string) => {
        setOfflineCourses((prev) =>
            prev.map((course) =>
                course.id === id ? { ...course, expanded: !course.expanded } : course
            )
        )
    }

    // Delete lesson
    const deleteLesson = (courseId: string, lessonId: string) => {
        // Handle deletion logic here
        console.log(`Delete lesson ${lessonId} from course ${courseId}`)
    }

    return (
        <View className="flex-1 bg-brand-bg">
            {/* Header */}
            <View
                className="px-4 py-4 flex-row items-center border-b border-[#e5dfcf]"
                style={{ paddingTop: insets.top + 16 }}
            >
                <TouchableOpacity className="p-2 -ml-2 rounded-full bg-[#ebe5d5]">
                    <MaterialIcons name="arrow-back-ios-new" size={24} color="#7b011e" />
                </TouchableOpacity>
                <Text className="flex-1 text-center mr-8 text-[#7b011e] text-lg font-bold tracking-tight">
                    Downloads
                </Text>
            </View>

            <ScrollView
                scrollEnabled={true}
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* In Progress Section */}
                <View className="px-4 pt-6">
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-[#7b011e] text-sm font-bold uppercase tracking-wider">
                            In Progress
                        </Text>
                        <Text className="text-[#7b011e] text-xs font-semibold">1 Active</Text>
                    </View>

                    {/* Active Download Card */}
                    <View className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5dfcf]">
                        <View className="flex-row items-center gap-3 mb-3">
                            <View className="w-10 h-10 bg-[#7b011e]/10 rounded-lg items-center justify-center">
                                <MaterialIcons name="downloading" size={24} color="#7b011e" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-slate-900 font-bold text-sm leading-tight">
                                    {activeDownload.title}
                                </Text>
                                <Text className="text-slate-500 text-[10px] mt-0.5">
                                    {activeDownload.progress} of {activeDownload.total} lessons
                                </Text>
                            </View>
                            <TouchableOpacity className="p-1">
                                <MaterialIcons name="pause-circle" size={24} color="#94a3b8" />
                            </TouchableOpacity>
                        </View>
                        {/* Progress Bar */}
                        <View className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <View
                                className="h-full bg-[#7b011e] rounded-full"
                                style={{ width: `${activeDownload.progressPercent}%` }}
                            />
                        </View>
                    </View>
                </View>

                {/* Offline Lessons Section */}
                <View className="px-4 pt-8">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-[#7b011e] text-sm font-bold uppercase tracking-wider">
                            Offline Lessons
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-[#7b011e] text-xs font-bold">Manage Storage</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Course Accordions */}
                    <View className="gap-3">
                        {offlineCourses.map((course) => (
                            <View
                                key={course.id}
                                className="bg-white rounded-2xl border border-[#e5dfcf] shadow-sm overflow-hidden"
                            >
                                {/* Accordion Header */}
                                <TouchableOpacity
                                    className="flex-row items-center gap-4 p-4"
                                    onPress={() => toggleAccordion(course.id)}
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        source={course.thumbnail}
                                        className="w-12 h-12 rounded-xl border border-[#e5dfcf]"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1">
                                        <Text className="text-slate-900 font-bold text-sm">
                                            {course.title}
                                        </Text>
                                        <Text className="text-slate-500 text-[11px] font-medium mt-1">
                                            {course.lessons} lessons
                                        </Text>
                                    </View>
                                    <Animated.View
                                        style={{
                                            transform: [
                                                {
                                                    rotate: course.expanded ? '180deg' : '0deg',
                                                },
                                            ],
                                        }}
                                    >
                                        <MaterialIcons name="expand-more" size={24} color="#94a3b8" />
                                    </Animated.View>
                                </TouchableOpacity>

                                {/* Accordion Content */}
                                {course.expanded && (
                                    <View className="px-4 pb-2 border-t border-[#f5f1e6]">
                                        {course.downloadedLessons.map((lesson, index) => (
                                            <View
                                                key={lesson.id}
                                                className={`flex-row items-center justify-between py-3 ${index < course.downloadedLessons.length - 1
                                                    ? 'border-b border-[#f5f1e6]'
                                                    : ''
                                                    }`}
                                            >
                                                <View className="flex-row items-center gap-3">
                                                    <MaterialIcons
                                                        name="check-circle"
                                                        size={18}
                                                        color="#7b011e"
                                                    />
                                                    <Text className="text-xs text-slate-700 font-medium">
                                                        {lesson.title}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => deleteLesson(course.id, lesson.id)}
                                                >
                                                    <MaterialIcons
                                                        name="delete"
                                                        size={18}
                                                        color="#94a3b8"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DownloadsPage
