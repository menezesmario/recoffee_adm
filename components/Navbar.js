import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">reCoffee</a>
        </Link>
        <Link href="/new">
            <a className="create">Cadastrar Produto</a>
        </Link>
    </nav>
)

export default Navbar;