import CourseLessonsModal, { CourseData, Lesson } from '@/components/ui/CourseLessonsModal';
import SecureVideoPlayer from '@/components/ui/SecureVideoPlayer';
import VideoPlaybackChoice from '@/components/ui/VideoPlaybackChoice';
import { MaterialIcons } from '@expo/vector-icons';
import { documentDirectory, downloadAsync, getInfoAsync } from 'expo-file-system';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ImageBackground,
    Pressable,
    Animated as RNAnimated,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyCoursesPage = () => {
    const insets = useSafeAreaInsets()
    const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null)
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
    const [showPlaybackChoice, setShowPlaybackChoice] = useState(false)
    const [showVideoPlayer, setShowVideoPlayer] = useState(false)
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const SAMPLE_VIDEO_URL = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

    const handleDownloadAndPlay = async () => {
        if (!selectedLesson) return;

        // Define a local path
        const fileName = `lesson-${selectedLesson.id}.mp4`;
        const fileUri = documentDirectory + fileName;

        try {
            // Check if exists
            const fileInfo = await getInfoAsync(fileUri);
            if (fileInfo.exists) {
                console.log('File already exists, playing local:', fileUri);
                setVideoUri(fileUri);
                setShowPlaybackChoice(false);
                setShowVideoPlayer(true);
                return;
            }

            // Download
            setIsDownloading(true);

            const downloadRes = await downloadAsync(
                SAMPLE_VIDEO_URL,
                fileUri
            );

            setIsDownloading(false);
            if (downloadRes.status === 200) {
                setVideoUri(downloadRes.uri);
                setShowPlaybackChoice(false);
                setShowVideoPlayer(true);
            } else {
                Alert.alert('Download Failed', 'Could not download video.');
            }

        } catch (e) {
            setIsDownloading(false);
            console.error(e);
            Alert.alert('Error', 'An error occurred while downloading.');
        }
    };

    const handleStream = () => {
        setVideoUri(SAMPLE_VIDEO_URL);
        setShowPlaybackChoice(false);
        setShowVideoPlayer(true);
    };

    // Helper to generate lessons for each course based on progress
    const generateLessons = (courseId: string, totalLessons: number, progress: number): Lesson[] => {
        const completedCount = Math.round((progress / 100) * totalLessons)
        const lessonTypes: Lesson['type'][] = ['video', 'reading', 'quiz', 'practice']

        return Array.from({ length: totalLessons }, (_, i) => {
            const isCompleted = i < completedCount
            const isLocked = i > completedCount

            return {
                id: `${courseId}-lesson-${i + 1}`,
                title: `Lesson ${i + 1}: ${getLessonTitle(courseId, i)}`,
                description: getLessonDescription(courseId, i),
                duration: `${Math.floor(Math.random() * 30) + 10} min`,
                type: lessonTypes[i % lessonTypes.length],
                completed: isCompleted,
                locked: isLocked,
            }
        })
    }

    const getLessonTitle = (courseId: string, index: number): string => {
        const titles: Record<string, string[]> = {
            '1': ['Triage Basics', 'Cardiac Emergencies', 'Respiratory Distress', 'Trauma Assessment', 'Burn Treatment', 'Shock Management', 'Pediatric Emergencies', 'Toxicology', 'Disaster Preparedness', 'Airway Management', 'CPR Protocols', 'Post-Care Assessment'],
            '2': ['Heart Anatomy', 'Circulatory System', 'Common Arrhythmias', 'Hypertension', 'Coronary Artery Disease', 'Heart Failure', 'Valvular Disorders', 'Diagnostic Tests', 'ECG Basics', 'Medications', 'Lifestyle Factors', 'Risk Assessment', 'Prevention Strategies', 'Case Studies', 'Advanced Topics', 'Research Methods', 'Clinical Practice', 'Final Review'],
            '3': ['Neuroanatomy Intro', 'CNS Structure', 'PNS Overview', 'Brain Lobes', 'Neurotransmitters', 'Motor Pathways', 'Sensory Systems', 'Reflex Arcs', 'Stroke Assessment', 'Parkinson Disease', 'Multiple Sclerosis', 'Epilepsy', 'Headaches', 'Spinal Cord', 'Neuropathies', 'Dementia', 'Brain Imaging', 'Clinical Cases', 'Neuroplasticity', 'Advanced Topics'],
            '4': ['Newborn Assessment', 'Developmental Milestones', 'Nutrition Basics', 'Vaccination Schedule', 'Common Illnesses', 'Fever Management', 'Respiratory Issues', 'Gastrointestinal', 'Skin Conditions', 'Behavioral Health', 'Adolescent Care', 'Growth Monitoring', 'Safety Guidelines', 'Emergency Protocols', 'Chronic Conditions'],
            '5': ['ECG Fundamentals', 'Normal Sinus Rhythm', 'Arrhythmia Detection', 'Atrial Fibrillation', 'Ventricular Tachycardia', 'Bradycardia', 'Heart Blocks', 'STEMI Recognition', 'NSTEMI Patterns', 'Ischemia Changes'],
        }
        return titles[courseId]?.[index] || `Module ${index + 1}`
    }

    const getLessonDescription = (courseId: string, index: number): string => {
        const descriptions: Record<string, string[]> = {
            '1': ['Learn triage protocols', 'Cardiac emergency response', 'Respiratory distress scenarios', 'Trauma assessment', 'Burn treatment protocols', 'Shock management', 'Pediatric emergencies', 'Toxicological emergencies', 'Mass casualty preparedness', 'Advanced airway', 'CPR guidelines', 'Post-care protocols'],
            '2': ['Cardiovascular anatomy', 'Blood circulation', 'Heart rhythm disorders', 'Hypertension management', 'Coronary artery disease', 'Heart failure treatment', 'Valve disorders', 'Diagnostic procedures', 'ECG interpretation', 'Cardiovascular medications', 'Lifestyle impact', 'Risk assessment', 'Prevention strategies', 'Patient cases', 'Research topics', 'Research methods', 'Clinical guidelines', 'Course review'],
            '3': ['Nervous system anatomy', 'Central nervous system', 'Peripheral nervous system', 'Cerebral lobes', 'Neurotransmitter functions', 'Motor pathways', 'Sensory systems', 'Reflex mechanisms', 'Stroke protocols', 'Parkinson overview', 'MS fundamentals', 'Epilepsy disorders', 'Headache types', 'Spinal disorders', 'Neuropathy overview', 'Dementia diagnosis', 'Neuroimaging', 'Clinical presentations', 'Neuroplasticity', 'Advanced neuroscience'],
            '4': ['Newborn assessment', 'Developmental milestones', 'Pediatric nutrition', 'Vaccination schedules', 'Childhood illnesses', 'Fever management', 'Respiratory conditions', 'GI disorders', 'Skin conditions', 'Behavioral health', 'Adolescent health', 'Growth monitoring', 'Safety guidelines', 'Emergency scenarios', 'Chronic conditions'],
            '5': ['Electrocardiography intro', 'Normal sinus rhythm', 'Arrhythmia identification', 'Atrial fib recognition', 'Ventricular tachycardia', 'Bradycardia assessment', 'Heart block patterns', 'STEMI identification', 'NSTEMI findings', 'Ischemia detection'],
        }
        return descriptions[courseId]?.[index] || `Content for lesson ${index + 1}`
    }

    // Course data with lessons
    const courses: CourseData[] = [
        {
            id: '1',
            title: 'Emergency Medicine Protocols',
            description: 'Master emergency response procedures',
            category: 'Emergency',
            duration: '8 hours',
            lessons: 12,
            progress: 65,
            thumbnail: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400',
            instructor: 'Dr. Sarah Johnson',
            level: 'Intermediate',
            content: 'This comprehensive course covers essential emergency medicine protocols including triage procedures, cardiac emergencies, respiratory distress, trauma management, and disaster preparedness. Learn evidence-based approaches to critical care situations.',
            lessonsList: generateLessons('1', 12, 65),
        },
        {
            id: '2',
            title: 'Cardiology Fundamentals',
            description: 'Understanding heart diseases',
            category: 'Cardiology',
            duration: '12 hours',
            lessons: 18,
            progress: 40,
            thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
            instructor: 'Dr. Michael Chen',
            level: 'Beginner',
            content: 'Explore the fundamentals of cardiovascular medicine including anatomy, common cardiac conditions, diagnostic techniques, and treatment options. Perfect for medical students and junior residents.',
            lessonsList: generateLessons('2', 18, 40),
        },
        {
            id: '3',
            title: 'Neuroscience Deep Dive',
            description: 'Advanced neural pathways',
            category: 'Neurology',
            duration: '15 hours',
            lessons: 20,
            progress: 20,
            thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400',
            instructor: 'Dr. Emily Roberts',
            level: 'Advanced',
            content: 'An in-depth exploration of the nervous system covering neuroanatomy, neurophysiology, common neurological disorders, and advanced diagnostic techniques. Designed for senior residents and practicing physicians.',
            lessonsList: generateLessons('3', 20, 20),
        },
        {
            id: '4',
            title: 'Pediatrics Essentials',
            description: 'Child healthcare basics',
            category: 'Pediatrics',
            duration: '10 hours',
            lessons: 15,
            progress: 85,
            thumbnail: 'https://images.unsplash.com/photo-1584515933487-9b17ed4b095f?w=400',
            instructor: 'Dr. Lisa Park',
            level: 'Beginner',
            content: 'Comprehensive pediatric care covering developmental milestones, common childhood illnesses, vaccination schedules, and pediatric emergency protocols. Essential for family practitioners and pediatricians.',
            lessonsList: generateLessons('4', 15, 85),
        },
        {
            id: '5',
            title: 'ECG Interpretation',
            description: 'Master heart rhythm analysis',
            category: 'Cardiology',
            duration: '6 hours',
            lessons: 10,
            progress: 50,
            thumbnail: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400',
            instructor: 'Dr. James Wilson',
            level: 'Intermediate',
            content: 'Learn to interpret electrocardiograms with confidence. Covers normal sinus rhythm, arrhythmias, myocardial infarction patterns, and conduction abnormalities. Includes practice tracings and case studies.',
            lessonsList: generateLessons('5', 10, 50),
        },
    ]

    const getLevelColor = (level: CourseData['level']) => {
        switch (level) {
            case 'Beginner':
                return 'bg-green-100 text-green-700'
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-700'
            case 'Advanced':
                return 'bg-red-100 text-red-700'
        }
    }

    const CourseCard = ({ course, onPress }: { course: CourseData; onPress: () => void }) => {
        const scale = React.useRef(new RNAnimated.Value(1)).current

        const handlePressIn = () => {
            RNAnimated.spring(scale, {
                toValue: 0.96,
                useNativeDriver: true,
            }).start()
        }

        const handlePressOut = () => {
            RNAnimated.spring(scale, {
                toValue: 0.99,
                useNativeDriver: true,
            }).start()
        }

        return (
            <RNAnimated.View style={{ transform: [{ scale }] }}>
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={onPress}
                    className="bg-white rounded-2xl border border-[#e5dfcf] shadow-sm overflow-hidden"
                >
                    <View className="flex-row">
                        {/* Thumbnail */}
                        <ImageBackground
                            source={{ uri: course.thumbnail }}
                            className="w-24 h-24 rounded-l-2xl"
                            imageStyle={{ resizeMode: 'cover' }}
                        >
                            <View className="flex-1 bg-black/20" />
                        </ImageBackground>

                        {/* Content */}
                        <View className="flex-1 p-3 justify-between">
                            <View>
                                <View className="flex-row items-center gap-2 mb-1">
                                    <Text className="text-[10px] text-[#7b011e] font-semibold uppercase">
                                        {course.category}
                                    </Text>
                                    <View
                                        className={`px-2 py-0.5 rounded-full ${getLevelColor(course.level)}`}
                                    >
                                        <Text className="text-[9px] font-semibold">{course.level}</Text>
                                    </View>
                                </View>
                                <Text className="text-sm font-bold text-slate-900" numberOfLines={1}>
                                    {course.title}
                                </Text>
                                <Text className="text-xs text-slate-500" numberOfLines={1}>
                                    {course.description}
                                </Text>
                            </View>

                            {/* Progress */}
                            <View>
                                <View className="flex-row justify-between items-center mb-1">
                                    <Text className="text-[10px] text-slate-500">
                                        {course.progress}% complete
                                    </Text>
                                    <Text className="text-[10px] text-slate-500">
                                        {course.lessons} lessons
                                    </Text>
                                </View>
                                <View className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <View
                                        className="h-full bg-[#7b011e] rounded-full"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </RNAnimated.View>
        )
    }

    const handleLessonSelect = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        if (lesson.type === 'video') {
            setShowPlaybackChoice(true);
        } else {
            // For now, only video is handled per request, but we can expand.
            Alert.alert('Content', 'This lesson content is not a video. Coming soon.');
        }
    };

    return (
        <View className="flex-1 bg-brand-bg">
            {/* Header */}
            <View
                className="px-4 py-4 flex-row items-center justify-between border-b border-[#e5dfcf]"
                style={{ paddingTop: insets.top + 16 }}
            >
                <Text className="text-[#7b011e] text-xl font-bold tracking-tight">My Courses</Text>
                <TouchableOpacity className="p-2 rounded-full bg-[#ebe5d5]">
                    <MaterialIcons name="search" size={24} color="#7b011e" />
                </TouchableOpacity>
            </View>

            {/* Course List */}
            <ScrollView
                scrollEnabled={true}
                className="flex-1"
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            >
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-slate-600 text-sm font-semibold">
                        {courses.length} Courses in progress
                    </Text>
                </View>

                <View className="gap-3">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onPress={() => setSelectedCourse(course)}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Course Lessons Modal */}
            <CourseLessonsModal
                visible={!!selectedCourse}
                course={selectedCourse}
                onClose={() => setSelectedCourse(null)}
                onLessonSelect={handleLessonSelect}
                onContinue={() => {
                    if (selectedCourse) {
                        const next = selectedCourse.lessonsList.find(l => !l.completed && !l.locked);
                        if (next) handleLessonSelect(next);
                    }
                }}
            />

            {/* Playback Choice Modal */}
            <VideoPlaybackChoice
                visible={showPlaybackChoice && !isDownloading}
                onCancel={() => {
                    setShowPlaybackChoice(false);
                    setSelectedLesson(null);
                }}
                onDownload={handleDownloadAndPlay}
                onStream={handleStream}
                title={selectedLesson?.title}
            />

            {/* Loading / Downloading Indicator */}
            {isDownloading && (
                <View className="absolute inset-0 z-50 justify-center items-center bg-black/60">
                    <View className="bg-white p-6 rounded-2xl items-center shadow-lg">
                        <ActivityIndicator size="large" color="#7b011e" />
                        <Text className="text-gray-800 font-bold mt-4">Downloading Video...</Text>
                        <Text className="text-gray-500 text-xs mt-1">Please wait</Text>
                    </View>
                </View>
            )}

            {/* Secure Video Player */}
            <SecureVideoPlayer
                visible={showVideoPlayer}
                source={videoUri ? { uri: videoUri } : undefined}
                onClose={() => {
                    setShowVideoPlayer(false);
                    setSelectedLesson(null);
                    setVideoUri(null);
                }}
                title={selectedLesson?.title}
            />
        </View>
    )
}

export default MyCoursesPage
