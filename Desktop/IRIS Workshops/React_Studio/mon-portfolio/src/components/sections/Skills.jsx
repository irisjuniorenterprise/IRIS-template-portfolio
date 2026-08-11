import Badge from '../ui/Badge';
function Skills() {
    const skills = ['HTML', 'CSS', 'JavaScript',
    'React', 'Python', 'Git'];
    return (
        <section id="skills" style={{ padding: '40px 20px' }}>
            <h2>🚀 Compétences</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((skill, index) => (
                <Badge key={index} color="#1a3969">{skill}</Badge>
            ))}
            </div>
        </section>
    );
}
export default Skills;
