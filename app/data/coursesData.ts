import { Course } from '../types/course.types';

export const coursesData: Course[] = [
    {
        id: '1',
        title: 'Hematology Essentials',
        category: 'Biology',
        color: '#7b011e',
        level: 'Beginner',
        lessons: 12,
        image: require('../../assets/images/courses/hematology.png'),
        rating: 4.9,
        reviews: '1.2k reviews',
        isPopular: true
    },
    {
        id: '2',
        title: 'Medical Anatomy',
        category: 'Biology',
        color: '#7b011e',
        level: 'Intermediate',
        lessons: 20,
        image: require('../../assets/images/courses/anatomy.png'),
        rating: 4.8,
        reviews: '850 reviews',
        isPopular: true
    },
    {
        id: '3',
        title: 'Advanced Surgery',
        category: 'Practice',
        color: '#1a1a1a',
        level: 'Advanced',
        lessons: 25,
        image: require('../../assets/images/courses/hematology.png'), // Reuse image for now
        rating: 4.7,
        reviews: '2.1k reviews',
        isPopular: false
    }
];