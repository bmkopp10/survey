import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    Button, Checkbox,
    FormControl, FormControlLabel, FormGroup,
    FormHelperText, FormLabel,
    Grid, Radio, RadioGroup,
    TextField
} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from "@mui/lab";
import styles from './Survey.module.css';
import {PizzaTopping, Survey, TechPref} from "../../types";
import useFormValidator from "../../hooks/useFormValidator";
import {getTimezones, submitSurvey} from "../../modules/api";
import TitleText from "../TitleText/TitleText";

const SurveyComponent: React.FC = () => {

    const techPreferences: TechPref[] = ['both', 'front end', 'back end']
    const pizzaToppingOptions: PizzaTopping[] = ['cheese', 'pepperoni', 'sausage', 'green pepper', 'onion', 'mushroom']

    const [formData, setFormData] = useState<Survey>({
        birthday: '',
        preferences: {
            pizzaToppings: [],
            techPref: '',
            timezone: ''
        },
        name: '',
        password: ''
    })

    const [submitting, setSubmitting] = useState<boolean>(false)

    const [timezones, setTimezones] = useState<string[]>([])

    useEffect(() => {
        async function initTimezones() {
            setTimezones(await getTimezones())
        }

        initTimezones()
    }, [])

    const {validateForm, validationResult, clearResults} = useFormValidator<Survey>('survey')

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await validateForm(formData)
        if (validationResult.isValid) {
            setSubmitting(true)
            const success = await submitSurvey(formData)
            if (success) reset()
            setSubmitting(false)
        }
    }

    const reset = () => {
        setFormData({
            birthday: '',
            preferences: {
                pizzaToppings: [],
                techPref: '',
                timezone: ''
            },
            name: '',
            password: ''
        })
        clearResults()
    }

    const handleChangePizzaTopping = (topping: PizzaTopping) => {
        const pizzaToppings = [...formData.preferences.pizzaToppings]
        const index = pizzaToppings.findIndex(t => t === topping)
        if (index > -1) {
            pizzaToppings.splice(index, 1)
        } else {
            pizzaToppings.push(topping)
        }
        setFormData({...formData, preferences: {...formData.preferences, pizzaToppings}})
    }

    return (
        <form onSubmit={submit} onReset={reset} className={styles.Form}>

            <TitleText text="Survey"/>

            <Grid container spacing={5} className={styles.FormBody}>
                <Grid item xs={12} md={6}>
                    <TextField label="Name"
                               fullWidth
                               helperText={validationResult.model.name}
                               error={!!validationResult.model.name}
                               defaultValue={formData.name}
                               onChange={(e) =>
                                   setFormData({...formData, name: e.target.value})}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField label="Password"
                               fullWidth
                               defaultValue={formData.password}
                               helperText={validationResult.model.password}
                               error={!!validationResult.model.password}
                               onChange={(e) =>
                                   setFormData({...formData, password: e.target.value})}
                               inputProps={{
                                   type: "password",
                                   autoComplete: 'new-password'
                               }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Birthday"
                            value={formData.birthday}
                            onChange={(newValue) => {
                                setFormData({...formData, birthday: newValue});
                            }}
                            renderInput={(params) =>
                                <TextField {...params}
                                           fullWidth
                                           helperText={validationResult.model.birthday}
                                           error={!!validationResult.model.birthday}
                                />
                            }
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl error={!!validationResult.model.preferences?.techPref}>
                        <FormLabel>Tech Preferences</FormLabel>
                        <RadioGroup
                            row
                            value={formData.preferences.techPref}
                            onChange={(event) => setFormData({
                                ...formData,
                                preferences: {...formData.preferences, techPref: event.target.value as TechPref}
                            })}
                        >
                            {techPreferences.map(pref => <FormControlLabel value={pref} control={<Radio />} label={pref} key={pref} />)}
                        </RadioGroup>
                        {!!validationResult.model.preferences?.techPref &&
                            <FormHelperText error>{validationResult.model.preferences?.techPref}</FormHelperText>
                        }
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Autocomplete
                        autoComplete
                        options={timezones}
                        fullWidth
                        isOptionEqualToValue={(option, value) => option !== value}
                        value={formData.preferences.timezone}
                        onChange={(event, newValue) =>
                            setFormData({...formData, preferences: {...formData.preferences, timezone: newValue}})}
                        renderInput={(params) =>
                            <TextField
                                helperText={validationResult.model.preferences?.timezone}
                                error={!!validationResult.model.preferences?.timezone}
                                {...params}
                                label="Timezone"
                            />}
                    />
                </Grid>

                <Grid item xs={12} md={6}>

                    <FormControl
                        error={!!validationResult.model.preferences?.pizzaToppings}
                        component="fieldset"
                        variant="standard"
                    >
                        <FormLabel component="legend">Pizza Toppings</FormLabel>
                        <FormGroup>
                            <Grid container>
                                {pizzaToppingOptions.map(topping =>
                                    <Grid item xs={6} key={topping}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.preferences.pizzaToppings.includes(topping)}
                                                    onChange={() => handleChangePizzaTopping(topping)} name={topping}
                                                />
                                            }
                                            label={topping}
                                        />
                                    </Grid>)}
                            </Grid>
                        </FormGroup>
                        {validationResult.model.preferences?.pizzaToppings &&
                            <FormHelperText>{validationResult.model.preferences?.pizzaToppings}</FormHelperText>
                        }
                    </FormControl>
                </Grid>

            </Grid>
            <div className={styles.ButtonRow}>
                <Button color="info" variant="text" type="reset" disabled={submitting}>Reset</Button>
                <Button color="secondary" type="submit">Submit</Button>
            </div>
        </form>
    )
}

export default SurveyComponent;
