function Button({ children, variant = 'primary', onClick }) {
    const styles = {
    primary:   { background: '#1a3969', color: 'white' },
    secondary: { background: '#ff6633', color: 'white' },
    outline:   { background: 'transparent', border: '2px solid #1a3969' ,color: 'var(--text)' }
    };
    return (
        <button
            onClick={onClick}
            style={{
            padding: '10px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            ...styles[variant]
            }}
            >
            {children}
        </button>
    );
}
export default Button;
