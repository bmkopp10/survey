import React, {useEffect, useState} from "react";
import {Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from "@mui/lab";
import './Survey.css';
import ChipField from "../ChipField/ChipField";
import {Survey, TechPref} from "../../types";
import useFormValidator from "../../hooks/useFormValidator";
import {getTimezones} from "../../modules/api";

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

    const [timezones, setTimezones] = useState<string[]>([])

    useEffect(() => {
        async function initTimezones() {
            setTimezones(await getTimezones())
        }

        initTimezones()
    }, [])

    const {validateForm, validationResult} = useFormValidator('survey')

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await validateForm(formData)
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
    }

    return (
        <form onSubmit={submit} onReset={reset} className="Form">

            <span className="Title">Survey</span>

            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                    <TextField label="Name"
                               fullWidth
                               variant="standard"
                               defaultValue={formData.name}
                               onChange={(e) =>
                                   setFormData({...formData, name: e.target.value})}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField label="Password"
                               fullWidth
                               defaultValue={formData.password}
                               variant="standard"
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
                            renderInput={(params) => <TextField {...params} variant="standard" fullWidth/>}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Tech Preference</InputLabel>
                        <Select
                            variant="standard"
                            value={formData.preferences.techPref}
                            label="Tech Preference"
                            onChange={(event) => setFormData({
                                ...formData,
                                preferences: {...formData.preferences, techPref: event.target.value as TechPref}
                            })}
                        >
                            {techPreferences.map(p => <MenuItem value={p} key={p}>{p}</MenuItem>)}
                        </Select>
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
                        renderInput={(params) => <TextField {...params} label="Timezone" variant="standard"/>}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <ChipField value={formData.preferences.pizzaToppings} onChange={(value) =>
                        setFormData({...formData, preferences: {...formData.preferences, pizzaToppings: value}})}/>
                </Grid>

            </Grid>
            <div className="ButtonRow">
                <Button variant="contained" type="reset">Reset</Button>
                <Button variant="contained" type="submit">Submit</Button>
            </div>
        </form>
    )
}

export default SurveyComponent;
