import {ValidationRules} from "../types";
import {Survey, SurveyPreferences} from "../../../types";

export const surveyFormRules: Array<ValidationRules<Survey>> = [
    {
        key: 'name',
        required: true,
        rules: [
            (value: string) => (value.length >= 3) || 'Your name must be at least 3 characters',
        ]
    },
    {
        key: 'password',
        required: true,
        rules: [
            (value: string) => (value.length >= 8) || 'Password must be at least 8 characters',
        ]
    },
    {
        key: 'preferences',
        required: true,
        rules: [
            (value: SurveyPreferences) => (value.pizzaToppings.length > 0) || 'You must include at least 1 pizza topping, you dont even like cheese?',
            (value: SurveyPreferences) => (value.techPref !== null) || 'You must select a tech preference',

        ]
    }
];
