import './App.css';

const projects = [
  {
    id: 1,
    title: 'Project Arena',
    description: 'A sleek React dashboard for your racing projects.',
    tag: 'Dashboard'
  },
  {
    id: 2,
    title: 'AI Racing Hub',
    description: 'Intelligent insights, race analytics, and speed metrics.',
    tag: 'AI'
  },
  {
    id: 3,
    title: 'Task Sprint',
    description: 'Organize work items, deadlines, and sprint goals.',
    tag: 'Productivity'
  },
  {
    id: 4,
    title: 'Shop Pitstop',
    description: 'E-commerce features for your team and track assets.',
    tag: 'Commerce'
  }
];

function App() {
  const handleOpen = (projectName) => {
    window.alert(`Opening ${projectName}...`);
  };

  return (
    <div className="app-shell">
      <header className="hero-banner">
        <div>
          <p className="eyebrow">Project Arena</p>
          <h1>Build, launch, and manage racing projects.</h1>
          <p className="hero-copy">
            A fast React workspace with a clean interface, ready to run in Vite.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-btn">Get started</button>
          <button className="secondary-btn">View docs</button>
        </div>
      </header>

      <main className="content-area">
        <section className="stats-panel">
          <div>
            <span>02</span>
            <p>Active teams</p>
          </div>
          <div>
            <span>18</span>
            <p>Projects live</p>
          </div>
          <div>
            <span>99%</span>
            <p>Uptime score</p>
          </div>
        </section>

        <section className="cards-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="card-top">
                <span className="project-tag">{project.tag}</span>
                <h2>{project.title}</h2>
              </div>
              <p>{project.description}</p>
              <button onClick={() => handleOpen(project.title)}>Open</button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
