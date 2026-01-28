import React from 'react'
import { ScrollView } from 'react-native'
import CurrentCourse from '../components/CurrentCourse'
import Header from '../components/Header'

const HomePage = () => {
    return (
        <ScrollView className="flex-1 bg-light-background safe-area-inset-top">
            <Header />
            <CurrentCourse />
            {/* Add more sections here */}
        </ScrollView>
    )
}

export default HomePage