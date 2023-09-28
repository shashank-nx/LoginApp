import Image from 'next/image';
import { Button } from '@mui/material';
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function HeaderComponent(props) {
    const router = useRouter();
    const { logo, isLogin, backgroundColor = "#03abf4", width = "100%", height = 60 } = props;

    const logoutHandler = async () => {
        await axios.get("/api/auth/logout");
        router.push('/user/login');
    }

    return (
        <div className="header" style={{ backgroundColor }}>
            <Image src={logo} alt="logo" width={width} height={height} />
            {
                isLogin &&
                <Button variant="contained" color="error" sx={{ float: "right" }} onClick={logoutHandler}>
                    Logout
                </Button>
            }
        </div>
    );
}
