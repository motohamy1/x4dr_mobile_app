export interface Course {
    id: string;
    title: string;
    category: string;
    color: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    lessons?: number;
    image?: any;
    rating?: number;
    reviews?: string;
    isPopular?: boolean;
}