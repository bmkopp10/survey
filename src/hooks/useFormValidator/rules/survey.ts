import {ValidationRules} from "../types";
import {Survey} from "../../../types";

export const surveyFormRules: Array<ValidationRules<Survey>> = [
    {
        key: 'name',
        required: true,
    },
    {
        key: 'password',
        required: true,
        rules: [
            //(value: Array<TransactionLine>) => (value.length > 0) || 'Transaction does not have any items',
        ]
    }
];
