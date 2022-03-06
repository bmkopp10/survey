import {FormValidationKey, ValidationRules} from "./types";
import {surveyFormRules} from "./rules/survey";

export function getValidationRules(key: FormValidationKey): Array<ValidationRules<any>> {
    switch (key) {
        case 'survey':
            return surveyFormRules;
        default:
            throw new Error('No matching form validation for key: ' + key);
    }
}
