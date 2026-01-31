import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TextInput, View } from 'react-native'

const SearchBar = () => {
    return (
        <View className="flex-row items-center bg-white/80 rounded-2xl px-4 mx-4 my-4 h-14 border border-brand-primary/20 shadow-sm">
            <Ionicons name="search" size={22} color={Colors.light.tint} />
            <TextInput
                className="flex-1 ml-3 text-lg text-brand-primary"
                placeholder="Search for courses..."
                placeholderTextColor={Colors.light.icon}
            />
        </View>
    )
}

export default SearchBar