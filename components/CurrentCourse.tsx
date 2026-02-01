import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';
import { Circle } from 'react-native-svg';

const CurrentCourse = () => {
    return (
        <View className='flex rounded-3xl my-4 mx-6 py-4 px-6 bg-brand-primary'>
            <View className='flex-row gap-16 pt-6'>
                <View className='flex justify-start items-center'>
                    <AnimatedCircularProgress
                        size={80}
                        width={15}
                        fill={100}
                        tintColor='#f5f1e6'
                        backgroundColor='#f5f1e6'
                        renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="8" fill="#000000" />}
                    />
                </View>

                <View className='justify-start gap-2'>
                    <TouchableOpacity className='bg-tbright rounded-2xl px-4 py-2 justify-center'>
                        <Text className='text-brand-primary font-bold text-center'>IN PROGRESS</Text>
                    </TouchableOpacity>
                    <View>
                        <Text className='text-tbright text-center'>Pediatric Course</Text>
                    </View>
                </View>

            </View>
            <View className='flex justify-center p-6 mt-4'>
                <Progress.Bar
                    progress={0.4}
                    width={250}
                    color="#f5f1e6"
                    borderColor="#f5f1e6"
                    borderWidth={1}
                />
            </View>
            <TouchableOpacity className='flex-row justify-center items-center bg-tbright rounded-3xl p-4 mt-2 gap-2'>
                <Ionicons name="play" size={15} color="black" backgroundColor="#7b011e" className='rounded-full p-2 items-center justify-center' />
                <Text className='text-tdark text-center font-bold'>Resume Lesson</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CurrentCourse