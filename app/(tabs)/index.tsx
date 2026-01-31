import React from 'react'
import { ScrollView } from 'react-native'
import CurrentCourse from '../components/CurrentCourse'
import ExploreCourses from '../components/ExploreCourses'
import Header from '../components/Header'
import UpcomingCourse from '../components/UpcomingCourse'

const HomePage = () => {
    return (
        <ScrollView scrollEnabled={true} className="flex-1 bg-light-background safe-area-inset-top">
            <Header />
            <CurrentCourse />
            <ExploreCourses />
            <UpcomingCourse />
            {/* Add more sections here */}
        </ScrollView>
    )
}

export default HomePage