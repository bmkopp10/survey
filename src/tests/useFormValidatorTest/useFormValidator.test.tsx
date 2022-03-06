import {render} from '@testing-library/react'
import * as React from 'react'
import useFormValidator from "../../hooks/useFormValidator";
import {UseFormValidator} from "../../hooks/useFormValidator/types";
import {act} from "react-dom/test-utils";
import * as helpers from '../../hooks/useFormValidator/helper';

// TODO: test child validation

type MockSurvey = {
    requiredField: string;
    notRequiredField: string;
    requiredFieldWithOneRule: string;
    requiredFieldWithTwoRules: string;
    notRequiredFieldWithOneRule: string;
    notRequiredFieldWithTwoRules: string;
}

function setup(): UseFormValidator<MockSurvey> {

    jest.spyOn(helpers,"getValidationRules").mockReturnValue([
        {
            key: 'requiredField',
            required: true
        },
        {
            key: 'notRequiredField',
            required: false,
        },
        {
            key: 'requiredFieldWithOneRule',
            required: true,
            rules: [
                (value: string) => (value.length >= 3) || 'must be greater than 3 characters',
            ]
        },
        {
            key: 'requiredFieldWithTwoRules',
            required: true,
            rules: [
                (value: string) => (value.length >= 3) || 'must be greater than 3 characters',
                (value: string) => (value.includes('b')) || 'must contain the letter b',
            ]
        },
        {
            key: 'notRequiredFieldWithOneRule',
            required: false,
            rules: [
                (value: string) => (value.length >= 3) || 'must be greater than 3 characters',
            ]
        },
        {
            key: 'notRequiredFieldWithTwoRules',
            required: false,
            rules: [
                (value: string) => (value.length >= 3) || 'must be greater than 3 characters',
                (value: string) => (value.includes('b')) || 'must contain the letter b',
            ]
        },

    ]);

    const returnVal = {}
    function TestComponent() {
        // getValidationRules is mocked, it doesn't matter what key we pass in
        Object.assign(returnVal, useFormValidator<MockSurvey>('survey'))
        return null
    }
    render(<TestComponent />)
    return returnVal as UseFormValidator<MockSurvey>
}

describe('useFormValidator', () => {

    test('required fields', async () => {

        const useFormValidatorData = setup();
        const mockSurvey: MockSurvey = {
            requiredField: "",
            notRequiredField: "",
            requiredFieldWithOneRule: "",
            requiredFieldWithTwoRules: "",
            notRequiredFieldWithOneRule: "",
            notRequiredFieldWithTwoRules: ""
        }

        await act(async () => {
            await useFormValidatorData.validateForm(mockSurvey)
        })

        expect(useFormValidatorData.validationResult.isValid).toBeFalsy()
        expect(useFormValidatorData.validationResult.errorList.length).toBe(3)
        expect(useFormValidatorData.validationResult.model.requiredField).toBe("Required Field is required")
        expect(useFormValidatorData.validationResult.model.requiredFieldWithOneRule).toBe("Required Field With One Rule is required")
        expect(useFormValidatorData.validationResult.model.requiredFieldWithTwoRules).toBe("Required Field With Two Rules is required")

    })

    test('first rule failed - required field', async () => {

        const useFormValidatorData = setup();
        const mockSurvey: MockSurvey = {
            requiredField: "",
            notRequiredField: "",
            requiredFieldWithOneRule: "ba",
            requiredFieldWithTwoRules: "te",
            notRequiredFieldWithOneRule: "",
            notRequiredFieldWithTwoRules: ""
        }

        await act(async () => {
            await useFormValidatorData.validateForm(mockSurvey)
        })

        expect(useFormValidatorData.validationResult.isValid).toBeFalsy()
        expect(useFormValidatorData.validationResult.errorList.length).toBe(3)
        expect(useFormValidatorData.validationResult.model.requiredFieldWithOneRule).toBe("must be greater than 3 characters")
        expect(useFormValidatorData.validationResult.model.requiredFieldWithTwoRules).toBe("must be greater than 3 characters")

    })

    test('second rule failed - required field', async () => {

        const useFormValidatorData = setup();
        const mockSurvey: MockSurvey = {
            requiredField: "",
            notRequiredField: "",
            requiredFieldWithOneRule: "test",
            requiredFieldWithTwoRules: "testagain",
            notRequiredFieldWithOneRule: "",
            notRequiredFieldWithTwoRules: ""
        }

        await act(async () => {
            await useFormValidatorData.validateForm(mockSurvey)
        })

        expect(useFormValidatorData.validationResult.isValid).toBeFalsy()
        expect(useFormValidatorData.validationResult.errorList.length).toBe(2)
        expect(useFormValidatorData.validationResult.model.requiredFieldWithTwoRules).toBe("must contain the letter b")

    })

    test('all rules pass', async () => {

        const useFormValidatorData = setup();
        const mockSurvey: MockSurvey = {
            requiredField: "something here",
            notRequiredField: "",
            requiredFieldWithOneRule: "test",
            requiredFieldWithTwoRules: "there is a b in this field",
            notRequiredFieldWithOneRule: "",
            notRequiredFieldWithTwoRules: ""
        }

        await act(async () => {
            await useFormValidatorData.validateForm(mockSurvey)
        })

        expect(useFormValidatorData.validationResult.isValid).toBeTruthy()
        expect(useFormValidatorData.validationResult.errorList.length).toBe(0)

    })

    test('first rule failed - not required field', async () => {

        const useFormValidatorData = setup();
        const mockSurvey: MockSurvey = {
            requiredField: "",
            notRequiredField: "",
            requiredFieldWithOneRule: "",
            requiredFieldWithTwoRules: "",
            notRequiredFieldWithOneRule: "ba",
            notRequiredFieldWithTwoRules: "te"
        }

        await act(async () => {
            await useFormValidatorData.validateForm(mockSurvey)
        })

        expect(useFormValidatorData.validationResult.isValid).toBeFalsy()
        expect(useFormValidatorData.validationResult.errorList.length).toBe(5)
        expect(useFormValidatorData.validationResult.model.notRequiredFieldWithOneRule).toBe("must be greater than 3 characters")
        expect(useFormValidatorData.validationResult.model.notRequiredFieldWithTwoRules).toBe("must be greater than 3 characters")

    })

    test('second rule failed - not required field', async () => {

        const useFormValidatorData = setup();
        const mockSurvey: MockSurvey = {
            requiredField: "",
            notRequiredField: "",
            requiredFieldWithOneRule: "",
            requiredFieldWithTwoRules: "",
            notRequiredFieldWithOneRule: "test",
            notRequiredFieldWithTwoRules: "testagain"
        }

        await act(async () => {
            await useFormValidatorData.validateForm(mockSurvey)
        })

        expect(useFormValidatorData.validationResult.isValid).toBeFalsy()
        expect(useFormValidatorData.validationResult.errorList.length).toBe(4)
        expect(useFormValidatorData.validationResult.model.notRequiredFieldWithTwoRules).toBe("must contain the letter b")

    })

})
