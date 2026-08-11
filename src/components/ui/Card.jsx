function Card({ title, description, image, children }) {
    return (
        <div style={{
            background: 'var(--bg)',
            color: 'var(--text)',
            transition: '0.3s',
            fontFamily: 'Montserrat, sans-serif',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
            maxWidth: '300px'
            }}>
            {image && <img src={image} alt={title} />}
            <h3>{title}</h3>
            <p>{description}</p>
            {children}
        </div>
    );
}
export default Card;
