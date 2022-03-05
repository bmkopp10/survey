import React, {useState} from "react";
import {Chip, TextField} from "@mui/material";
import "./ChipField.css"

type Props = {
    value: string[];
    onChange: (value: string[]) => void;
}

const ChipField: React.FC<Props> = (props) => {

    const [value, setValue] = useState<string | null>(null)

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (value) {
                addChip(value)
                setValue('')
            }
        }
    }

    const addChip = (chip: string) => {
        const copy = [...props.value]
        copy.push(chip)
        props.onChange(copy)
    }

    const deleteChip = (chip: string) => {
        const copy = [...props.value]
        const newArray = copy.filter(d => d !== chip)
        props.onChange(newArray)
    }

    return (
        <React.Fragment>
            <TextField label="Pizza Toppings"
                       fullWidth
                       defaultValue={value}
                       variant="standard"
                       onChange={(e) => setValue(e.target.value)}
                       onKeyPress={handleKeyPress}
            />
            <div className="ChipContainer">
                {props.value.map((data) => {
                    return (
                        <div className="Chip" key={data}>
                            <Chip
                                label={data}
                                onDelete={() => deleteChip(data)}
                            />
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    )

}

export default ChipField;
