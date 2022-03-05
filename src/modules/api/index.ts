export const getTimezones = async (): Promise<string[]> => {
    const response = await fetch('http://worldtimeapi.org/api/timezone')
    if (response.ok) {
        return response.json()
    }
    return [];
}
