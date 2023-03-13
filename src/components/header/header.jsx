import Link from "next/link"
import Image from "next/image"

export const Header = () => (
    <header>
        <div>
            <div className="topNav">
                <Image alt="logo" src={'/favicon.ico'} width={50} height={50} />
                <nav>
                    <ul>
                        <li>
                            <Link href='/'> Home </Link>
                        </li>
                        <li>
                            <Link href='/events'> Events </Link>
                        </li>
                        <li>
                            <Link href='/about-us'> About us </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <p className="title"> Prueba pagina NextJs</p>
        </div>
    </header>
)