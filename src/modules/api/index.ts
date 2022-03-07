import {Survey} from "../../types";

export const getTimezones = async (): Promise<string[]> => {
    const response = await fetch('http://worldtimeapi.org/api/timezone')
    if (response.ok) {
        return response.json()
    }
    return [];
}

export const submitSurvey = async (survey: Survey): Promise<boolean> => {
    const body = JSON.stringify(survey)
    const response = await fetch('/submit', {
        method: 'post',
        body,
    })
    return response.ok;
}
