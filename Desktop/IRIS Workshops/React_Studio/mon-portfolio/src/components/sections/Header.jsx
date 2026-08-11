import styles from '../../styles/Header.module.css';
function Header({onToggleTheme, isDark}) {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px'
            }}>
            <h1>👨‍💻 [Votre Nom]</h1>
            <nav className={styles['nav-links']}>
                <a href="#about" className={styles['nav-link']}>À propos</a>
                <a href="#projects" className={styles['nav-link']}>Projets</a>
                <a href="#contact" className={styles['nav-link']}>Contact</a>
            </nav>
            <button onClick={onToggleTheme} style={{
                padding: '8px 16px',
                borderRadius: '4px',
                background: 'var(--bg)',
                color: 'var(--text)',
                border: '1px solid #e5e7eb'
            }}>
                {!isDark ? '🌙 Dark' : '☀️ Light'}
            </button>
        </header>
    );
}
export default Header;
