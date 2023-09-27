import { makeStyles } from "@mui/styles"

const useStyle = makeStyles({
    link: {
        marginTop: "15px",
        fontSize: "14px",
        lineHeight: "16px"
    }
});

const LinkContainer = (props) => {
    const classes = useStyle();
    return <>
        <div className={classes.link}>
            {props.children}
        </div>
    </>
}

export default LinkContainer;