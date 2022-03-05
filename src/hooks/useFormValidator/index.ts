import {FormValidationKey, RuleFn, ValidationModel, ValidationResult, ValidationRules} from "./types";
import {surveyFormRules} from "./rules/survey";
import {camelCaseToLabel} from "../../util/string";
import {useSyncState} from "../useSyncState";

// use when validation is optional and you need to pass something in so it doesnt break
// alternative to this is polluting everything with ternaries
export const emptyValidationResult: ValidationResult<unknown> = {
    isValid: true,
    model: {},
    errorList: []
}

export default function useFormValidator<T>(key: FormValidationKey) {

    const [validationResult, setValidationResult] = useSyncState<ValidationResult<T>>({
        isValid: true,
        errorList: [],
        model: {} as ValidationModel<T>,
    })

    function clearResults() {
        setValidationResult({
            isValid: true,
            errorList: [],
            model: {} as ValidationModel<T>
        })
    }

    const validationRules = getValidationRules(key);

    function getValidationRules(key: FormValidationKey): Array<ValidationRules<any>> {
        switch (key) {
            case 'survey':
                return surveyFormRules;
            default:
                throw new Error('No matching form validation for key: ' + key);
        }
    }

    function getFieldError(value: string, rules: Array<RuleFn>, form: T): string | boolean {

        const firstFailedRule = rules.find((rule) => {
            const isValid = rule(value, form);
            if (isValid !== true) {
                return isValid;
            }
        });
        if (firstFailedRule && typeof firstFailedRule(value, form) === 'string') return firstFailedRule(value, form);
        return false;
    }

    function isRequired(form: any, required?: boolean | keyof any) : boolean {
        if (typeof required === 'string') {
            return !!form[required];
        }

        return !!required;
    }

    async function validateForm(form: T) {
        clearResults();

        const validationObj: ValidationResult<T> = {
            isValid: true,
            errorList: [],
            model: {} as ValidationModel<T>
        }

        for (const vr of validationRules) {
            //@ts-ignore
            const formKeyValue = form[vr.key]

            if (formKeyValue !== null && formKeyValue !== undefined && formKeyValue !== '') {
                // a value exists, now check it against rules
                if (vr.rules) {
                    const error = getFieldError(formKeyValue, vr.rules, form);
                    if (error) {
                        //@ts-ignore
                        validationObj.model[vr.key] = error;
                        validationObj.errorList.push(error as string)
                        validationObj.isValid = false;
                    }
                }
            } else {
                // a value does not exist, check to see if it's required
                if (isRequired(form, vr.required)) {
                    const message = (vr.name ? vr.name : camelCaseToLabel(vr.key as string)) + ' is required';
                    //@ts-ignore
                    validationObj.model[vr.key] = message;
                    validationObj.errorList.push(message)
                    validationObj.isValid = false;
                }
            }
        }
        await setValidationResult(validationObj)
    }

    return {
        validateForm,
        validationResult,
        clearResults
    };

}
