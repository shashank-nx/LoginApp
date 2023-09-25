import Link from 'next/link';
import Image from 'next/image';
import { deleteCookie } from 'cookies-next';
import { Button } from '@mui/material';
import { useRouter } from "next/navigation";

export default function HeaderComponent(props) {
    const router = useRouter();
    const { logo, isLogin, backgroundColor = "#03abf4", width = 224, height = 60 } = props;

    const logoutHandler = () => {
        deleteCookie('auth');
        router.push('/');
    }

    return (
        <div className="header" style={{ backgroundColor }}>
            <Link href={'/'}>
                <Image src={logo} alt="logo" width={width} height={height} />
            </Link>
            {
                isLogin &&
                <Button sx={{ float: "right" }} onClick={logoutHandler}>
                    Logout
                </Button>
            }
        </div>
    );
}