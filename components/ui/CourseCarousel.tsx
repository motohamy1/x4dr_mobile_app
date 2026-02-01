import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { coursesData } from '../../app/data/coursesData';
import { Course } from '../../app/types/course.types';
import { CourseCard } from './CourseCard';

const { width: windowWidth } = Dimensions.get('window');

type CourseCarouselProps = {
    data?: Course[];
    width?: number;
    height?: number;
    autoPlay?: boolean;
    loop?: boolean;
    scrollAnimationDuration?: number;
    autoPlayInterval?: number;
    onSnapToItem?: (index: number) => void;
};

export const CourseCarousel = React.forwardRef<ICarouselInstance, CourseCarouselProps>((props, ref) => {
    const {
        data = coursesData,
        width = windowWidth,
        height = 280,
        autoPlay = true,
        loop = true,
        scrollAnimationDuration = 1000,
        autoPlayInterval = 3000,
        onSnapToItem,
    } = props;

    const progress = useSharedValue<number>(0);
    const carouselRef = useRef<ICarouselInstance>(null);

    // Sync the forwarded ref with our local ref
    React.useImperativeHandle(ref, () => carouselRef.current!);

    const onPressPagination = (index: number) => {
        carouselRef.current?.scrollTo({ index, animated: true });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Carousel
                ref={carouselRef}
                width={width}
                height={height}
                autoPlay={autoPlay}
                loop={loop}
                data={data}
                scrollAnimationDuration={scrollAnimationDuration}
                autoPlayInterval={autoPlayInterval}
                onProgressChange={(_, absoluteProgress) => {
                    progress.value = absoluteProgress;
                }}
                onSnapToItem={onSnapToItem}
                renderItem={({ item }) => (
                    <CourseCard course={item} />
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                containerStyle={{ gap: 5 }}
                onPress={onPressPagination}
            />
        </View>
    );
});

CourseCarousel.displayName = 'CourseCarousel';

// const styles = StyleSheet.create({
//     arrowShadow: {
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 4,
//         },
//         shadowOpacity: 0.3,
//         shadowRadius: 10,
//         elevation: 10,
//     },
//     leftFade: {
//         position: 'absolute',
//         left: 0,
//         top: 0,
//         bottom: 0,
//         width: 35,
//         zIndex: 10,
//     },
//     rightFade: {
//         position: 'absolute',
//         right: 0,
//         top: 0,
//         bottom: 0,
//         width: 35,
//         zIndex: 10,
//     },
// });
