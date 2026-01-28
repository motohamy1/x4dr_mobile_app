import React from 'react'
import { Image, Text, View } from 'react-native'

const Header = () => {
    return (
        <View className='safe-area-inset-top flex-row justify-between items-center mt-10 p-4 gap-2 
                         border-b-2 border-[#7b011e] rounded-b-lg'>

            <View className='flex justify-start items-center mt-4'>
                <Text className='text-[#7b011e] text-2xl font-bold'>Welcome Back, </Text>
                <Text className='text-light-text text-sm font-bold text-light-primary'>Mahmoud Eltohamy</Text>
            </View>

            <View className='flex justify-end items-center mt-2'>
                <Image source={require('@/assets/images/android-icon-foreground.png')}
                    className='w-10 h-10' />
                <Text className='text-[#7b011e] text-xl font-bold'>X4DR</Text>
            </View>

        </View>
    )
}

export default Header