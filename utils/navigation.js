import Link from 'next/link'


export function Navigation(props) {
    return (
        <nav>
            <Link href="/">
                <a> Trophy Room </a>
            </Link>
            |
            <Link href="/baseball">
                <a> Fantasy Baseball </a>
            </Link>
        </nav>
    )
}
