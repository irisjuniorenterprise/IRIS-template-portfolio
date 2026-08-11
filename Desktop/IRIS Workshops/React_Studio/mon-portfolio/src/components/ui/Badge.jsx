function Badge({ children, color = '#1a3969' }) {
    return (
        <span style={{
            background: color,
            color: 'white',
            padding: '4px 14px',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            display: 'inline-block',
            margin: '4px'
            }}>
            {children}
        </span>
    );
}
export default Badge;
