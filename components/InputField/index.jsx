import { TextField, Button } from "@mui/material";

export const InputTextField = (props) => {
    const { size = "small", variant = "outlined", style, value, onChange, ...rest } = props;
    const textFieldStyle = { paddingBlockEnd: "20px", ...style}
    return <TextField size={size} variant={variant} sx={textFieldStyle} value={value} onChange={onChange} {...rest}/>
}

export const ButtonField = (props) => {
    const { variant = "outlined", style, label, enabled=true, onSumbit } = props;
    return <Button variant={variant} sx={style} onClick={onSumbit} disabled={!enabled}>{label}</Button>
}