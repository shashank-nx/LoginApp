import { TextField, Button } from "@mui/material";

export const InputTextField = (props) => {
    const { size = "small", variant = "outlined", style, label, value, onChange } = props
    return <TextField size={size} variant={variant} label={label} sx={style} value={value} onChange={onChange}/>
}

export const ButtonField = (props) => {
    const { variant = "outlined", style, label, enabled, onSumbit } = props;
    return <Button variant={variant} sx={style} onClick={onSumbit} disabled={!enabled}>{label}</Button>
}