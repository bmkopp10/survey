import React, {useMemo, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from "@mui/lab";
import './Survey.css';
import ChipField from "./ChipField";

type Props = {}

type Form = {
    name: string | null;
    password: string | null;
    birthday: string | null;
    preferences: {
        techPref: "front end" | "back end" | "both" | null
        pizzaToppings: string[]
        timezone: string | null;
    }
}

const Survey: React.FC<Props> = (props) => {

    const [formData, setFormData] = useState<Form>({
        birthday: null,
        preferences: {
            pizzaToppings: [],
            techPref: null,
            timezone: null
        },
        name: null,
        password: null
    })

    const formIsValid = useMemo((): boolean => {
        if (formData.name) {
            return true
        }
        return false;
    }, [formData])

    const submit = () => {
        alert('submitting')
    }

    const reset = () => {
        alert('resetting')
    }

    return (
        <form onSubmit={submit} onReset={reset} className="Form">
            <span className="Title">Survey</span>

            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                    <TextField label="Name"
                               fullWidth
                               variant="standard"
                               value={formData.name}
                               onChange={(e) =>
                                   setFormData({...formData, name: e.target.value})}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField label="Password"
                               fullWidth
                               value={formData.password}
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

            <div className="ButtonRow">
                <Button variant="contained" type="reset">Reset</Button>
                <Button variant="contained" type="submit" disabled={!formIsValid}>Submit</Button>
            </div>
        </form>
    )
}

export default Survey;
