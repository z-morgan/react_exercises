interface TrainingDetails {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
declare const analyzeHours: (average: number, success: boolean) => [number, string];
declare const calculateExercises: (hours: number[], target: number) => TrainingDetails;
