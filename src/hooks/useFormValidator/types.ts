export type RuleResult = string | boolean
// how can I use a generic with value?
export type RuleFn = (value: any, form: any) => RuleResult
export type ValidationRules<T> = {
    key: keyof T;
    name?: string;
    required?: boolean;
    rules?: Array<RuleFn>;
    children?: Array<{
        key: string; // not sure how to get keyof child key
        name?: string;
        required?: boolean;
        rules?: Array<RuleFn>;
    }>
}

export type ValidationResult<T> = {
    isValid: boolean;
    errorList: Array<string>;
    model: ValidationModel<T>
}

//export type ValidationModel<T> = Record<keyof T, string>

//export type ValidationModel<T> = Record<keyof T, string | Record<keyof T[keyof T], string>>

// TODO: how to recursively get key of child objects and assign string to them?
export type ValidationModel<T> = Record<keyof T, string | any>


export type FormValidationKey =
    'survey'
