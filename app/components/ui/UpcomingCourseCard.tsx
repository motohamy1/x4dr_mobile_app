import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

const dummyUpcomingCourses = [
    {
        id: '1',
        title: 'Cardiology Fundamentals',
        date: 'Feb 15, 2026',
    },
    {
        id: '2',
        title: 'Neurology Advanced',
        date: 'Feb 20, 2026',
    },
    {
        id: '3',
        title: 'Pediatrics Basics',
        date: 'Mar 1, 2026',
    },
];

const UpcomingCourseCard = () => {
    // const renderItem = ({ item }: { item: typeof dummyUpcomingCourses[0] }) => {
    return (
        <View
            className='flex-row bg-brand-primary mx-6 rounded-3xl py-4 px-6 items-center gap-4'
            style={{
                width: windowWidth * 0.9,
                height: 90,
                shadowColor: 'rgb(255 255 255 / 0.5)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 25,
                elevation: 10,
                paddingBottom: 12
            }}>
            <Image
                source={require('../../../assets/images/icon.png')}
                style={{ width: 40, height: 40 }}
                resizeMode='contain'
            />
            <View className='flex-1'>
                <Text className='font-semibold text-base text-torange'>{dummyUpcomingCourses[0].title}</Text>
                <Text className='text-sm text-gray-500'>{dummyUpcomingCourses[0].date}</Text>
            </View>
            <TouchableOpacity className='bg-brand-bg px-4 py-2 rounded-full justify-center'>
                <Text className='text-tdark font-semibold text-sm'>Notify Me</Text>
            </TouchableOpacity>
        </View>
    )
};


export default UpcomingCourseCard