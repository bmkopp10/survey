import React, {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from "@mui/lab";
import './Survey.css';
import ChipField from "./ChipField";
import {Survey} from "../types";
import useFormValidator from "../hooks/useFormValidator";

type Props = {}

const SurveyComponent: React.FC<Props> = (props) => {

    const [formData, setFormData] = useState<Survey>({
        birthday: null,
        preferences: {
            pizzaToppings: [],
            techPref: null,
            timezone: null
        },
        name: null,
        password: null
    })

    const { validateForm, validationResult } = useFormValidator('survey')

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await validateForm(formData)
        console.log(validationResult)
    }

    const reset = () => {
        setFormData({
            birthday: null,
            preferences: {
                pizzaToppings: [],
                techPref: null,
                timezone: null
            },
            name: null,
            password: null
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
                    <ChipField value={formData.preferences.pizzaToppings} onChange={(value) =>
                        setFormData({...formData, preferences: {...formData.preferences, pizzaToppings: value}})}/>
                </Grid>

            </Grid>
            <span>{JSON.stringify(validationResult)}</span>
            <div className="ButtonRow">
                <Button variant="contained" type="reset">Reset</Button>
                <Button variant="contained" type="submit">Submit</Button>
            </div>
        </form>
    )
}

export default SurveyComponent;
