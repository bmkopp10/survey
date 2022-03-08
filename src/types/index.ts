export type Survey = {
    name: string;
    password: string;
    birthday: string | null;
    preferences: SurveyPreferences
}

export type SurveyPreferences = {
    techPref: TechPref;
    pizzaToppings: string[];
    timezone: string | null;
}

export type TechPref = "front end" | "back end" | "both" | ""

export type PizzaTopping = 'cheese' | 'pepperoni' | 'sausage' | 'mushroom' | 'onion' | 'green pepper'
