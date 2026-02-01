import React from 'react'
import { Text, View } from 'react-native'
import UpcomingCourseCard from './ui/UpcomingCourseCard'

const UpcomingCourse = () => {
    return (
        <View className='mb-12'>
            <View>
                <Text className='text-tdark font-bold text-2xl flex justify-start px-6'>UpcomingCourse</Text>
            </View>
            <View className=' mt-4 pb-4'>
                <UpcomingCourseCard />
            </View>
            <View className='mb-10 pb-10'>
                <UpcomingCourseCard />
            </View>
        </View>
    )
}

export default UpcomingCourse