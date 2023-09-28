import { makeStyles } from "@mui/styles"

const useStyle = makeStyles({
    container: {
        display: "grid",
        marginInline: "42%",
        marginBlock: "13%",
        backgroundColor: "white",
        width: "330px",
        padding: "20px",
        paddingInline: "30px",
        borderRadius: "5px"
    }
});

const Container = (props) => {
    const classes = useStyle();
    return <>
        <div className={classes.container}>
            {props.children}
        </div>
    </>
}

export default Container;