import Link from 'next/link';
import Image from 'next/image';

export default function HeaderComponent (props) {
    const { logo, backgroundColor = "#03abf4", width = 224, height = 60} = props;
    return (
        <div className="header" style={{ backgroundColor }}>
            <Link href={'/'}>
                <Image src={logo} alt="logo" width={width} height={height}/>
            </Link>
        </div>
    );
}