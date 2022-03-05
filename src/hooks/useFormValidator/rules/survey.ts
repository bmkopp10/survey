import {ValidationRules} from "../types";
import {Survey} from "../../../types";

export const surveyFormRules: Array<ValidationRules<Survey>> = [
    {
        key: 'name',
        required: true,
        rules: [
            (value: string) => (value === 'Brian') || 'Your name must be Brian',
        ]
    },
    {
        key: 'password',
        required: true,
        rules: [
        ]
    }
];
