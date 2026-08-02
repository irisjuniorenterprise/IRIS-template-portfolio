function Header() {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px'
            }}>
            <h1>👨‍💻 [Votre Nom]</h1>
            <nav>
                <a href="#about">À propos</a>
                <a href="#projects">Projets</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
}
export default Header;
