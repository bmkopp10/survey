export type Survey = {
    name: string | null;
    password: string | null;
    birthday: string | null;
    preferences: {
        techPref: "front end" | "back end" | "both" | null
        pizzaToppings: string[]
        timezone: string | null;
    }
}
