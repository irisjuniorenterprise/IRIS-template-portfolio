import Card from '../ui/Card';
import Button from '../ui/Button';
function Projects() {
    const projects = [
        { title: 'Portfolio IRIS', description: 'Site vitrine IRIS' },
        { title: 'App Météo', description: 'React + OpenWeather' },
    ];
    return (
        <section id="projects" style={{ padding: '40px 20px' }}>
            <h2>📁 Projets</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {projects.map((project, index) => (
                <Card key={index} title={project.title} description={project.description}>
                    <Button variant="outline">Voir le projet</Button>
                </Card>
                ))}
            </div>
        </section>
    );
}
export default Projects;
