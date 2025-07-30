// @ts-nocheck
import CitizenLayout from '@/components/layouts/CitizenLayout';
import MyQuizPage from '@/components/quiz/MyQuizPage';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
interface Quiz {
    id: number;
    title: string;
    score: number;
    created_at: string;
    total_questions?: number;
    difficulty?: 'mudah' | 'sedang' | 'sulit';
}

interface MyQuizPageRouteProps {
    quizzes: Quiz[];
    [key: string]: unknown;
}
const MyQuizPageRoute = () => {
    const { props } = usePage<PageProps<MyQuizPageRouteProps>>();
    const reedems = props.redeems || [];
    const user = props.auth?.user ?? null;
    if (!user) return null;

    return (
        <CitizenLayout currentPage="my-merchandise">
            <MyQuizPage auth={{ user }} quizzes={reedems} />
        </CitizenLayout>
    );
};

export default MyQuizPageRoute;
