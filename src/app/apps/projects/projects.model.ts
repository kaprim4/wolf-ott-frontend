export interface Project {
    id: number;
    title: string;
    category: string;
    state: string;
    shortDesc: string;
    totalQuestions: number;
    totalComments: number;
    teamMembers: {
        image: string;
        name: string;
    }[];
    progress: number;
    variant: string;
}
