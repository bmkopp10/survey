import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from "@mui/lab";
import styles from './Survey.module.css';
import ChipField from "../ChipField/ChipField";
import {Survey, TechPref} from "../../types";
import useFormValidator from "../../hooks/useFormValidator";
import {getTimezones, submitSurvey} from "../../modules/api";
import TitleText from "../TitleText/TitleText";

type Props = {}

const SurveyComponent: React.FC<Props> = (props) => {

    const techPreferences: TechPref[] = ['both', 'front end', 'back end']

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
                    <FormControl fullWidth error={!!validationResult.model.preferences?.techPref}>
                        <InputLabel>Tech Preference</InputLabel>
                        <Select
                            value={formData.preferences.techPref}
                            label="Tech Preference"
                            onChange={(event) => setFormData({
                                ...formData,
                                preferences: {...formData.preferences, techPref: event.target.value as TechPref}
                            })}
                        >
                            {techPreferences.map(p => <MenuItem value={p} key={p}>{p}</MenuItem>)}
                        </Select>
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
                    <ChipField
                        value={formData.preferences.pizzaToppings}
                        onChange={(value) =>
                            setFormData({...formData, preferences: {...formData.preferences, pizzaToppings: value}})
                        }
                        helperText={validationResult.model.preferences?.pizzaToppings}
                        error={!!validationResult.model.preferences?.pizzaToppings}
                    />
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
