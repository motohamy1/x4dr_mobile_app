import React from 'react'
import { Text, View } from 'react-native'

const Home = () => {
    return (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-black text-3xl font-bold'>Home Screen</Text>
            <Text className='text-gray-400 mt-2'>Tailwind is active!</Text>
        </View>
    )
}

export default Home