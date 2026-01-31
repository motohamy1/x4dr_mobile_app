import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { CourseCard } from '../components/ui/CourseCard'
import SearchBar from '../components/ui/SearchBar'
import { coursesData } from '../data/coursesData'

const courses = () => {
    return (
        <ScrollView className="flex-1 bg-brand-bg safe-area-inset-top mt-6">
            <View className="px-6 pt-6">
                <Text className="text-brand-primary text-3xl font-bold">Courses</Text>
                <Text className="text-gray-600 text-base mt-2">Explore our medical curriculum</Text>
            </View>
            <SearchBar />
            <View className="mt-2 mb-28">
                <CourseCard course={coursesData[0]} />
                <CourseCard course={coursesData[1]} />
                <CourseCard course={coursesData[2]} />
                {/* <CourseCarousel />
                <CourseCarousel /> */}
            </View>
        </ScrollView>
    )
}

export default courses