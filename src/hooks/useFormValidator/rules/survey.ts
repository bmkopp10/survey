import {ValidationRules} from "../types";
import {Survey} from "../../../types";

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
        key: 'birthday',
        required: true,
        rules: [
            (value: string) => (new Date(value).getFullYear() > 1930) || "You're too old to take this survey",
            (value: string) => (new Date(value).getFullYear() < 2023) || "You're not even born yet",
        ]
    },
    {
        key: 'preferences',
        required: false,
        children:[
            {
                key: 'pizzaToppings',
                required: true,
                rules: [
                    (value: string[]) => (value.length > 0) || 'You must include at least 1 pizza topping, you dont even like cheese?',
                ]
            },
            {
                key: 'techPref',
                required: true
            },
            {
                key: 'timezone',
                required: true
            }
        ],
    }
];
