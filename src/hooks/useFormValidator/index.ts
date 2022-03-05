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

    function ifExists(value: unknown) {
        return value !== null && value !== undefined && value !== ''
    }

    async function validateForm(form: T) {
        clearResults();

        const validationObj: ValidationResult<T> = {
            isValid: true,
            errorList: [],
            model: {} as ValidationModel<T>
        }

        for (const parent of validationRules) {
            //@ts-ignore
            const parentValue = form[parent.key]

            if (ifExists(parentValue)) {
                // a value exists, now check it against rules
                if (parent.rules) {
                    const error = getFieldError(parentValue, parent.rules, form);
                    if (error) {
                        //@ts-ignore
                        validationObj.model[parent.key] = error;
                        validationObj.errorList.push(error as string)
                        validationObj.isValid = false;
                    }
                }
            } else {
                // a value does not exist, check to see if it's required
                if (parent.required) {
                    const message = (parent.name ? parent.name : camelCaseToLabel(parent.key as string)) + ' is required';
                    //@ts-ignore
                    validationObj.model[parent.key] = message;
                    validationObj.errorList.push(message)
                    validationObj.isValid = false;
                }
            }
            // this is duplicate code, needs refactoring
            if (parent.children) {
                for (const child of parent.children) {
                    //@ts-ignore
                    const childValue = form[parent.key][child.key]

                    if (ifExists(childValue)) {

                        if (child.rules) {

                            const error = getFieldError(childValue, child.rules, form);
                            if (error) {
                                //@ts-ignore
                                validationObj.model[parent.key] = {...validationObj.model[parent.key], [child.key]: error}
                                validationObj.errorList.push(error as string)
                                validationObj.isValid = false;
                            }

                        }

                    } else {
                        if (child.required) {
                            const message = (child.name ? child.name : camelCaseToLabel(child.key as string)) + ' is required';
                            //@ts-ignore
                            validationObj.model[parent.key] = {...validationObj.model[parent.key], [child.key]: message}
                            validationObj.errorList.push(message)
                            validationObj.isValid = false;
                        }
                    }
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
