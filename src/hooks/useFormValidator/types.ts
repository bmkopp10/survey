export type RuleResult = string | boolean
// how can I use a generic with value?
export type RuleFn = (value: any, form: any) => RuleResult
export type ValidationRules<T> = {
    key: keyof T;
    name?: string;
    required?: boolean | keyof T;
    rules?: Array<RuleFn>
}

export type ValidationResult<T> = {
    isValid: boolean;
    errorList: Array<string>;
    model: ValidationModel<T>
}

export type ValidationModel<T> = Record<keyof T, string>

export type FormValidationKey =
    'survey'
