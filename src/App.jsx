import { useState, useEffect } from 'react'
import './App.css';
import backImage from './Asset/back.png';
import fsImage from './Asset/Track1.jpg';
import dsaImage from './Asset/track 3.jpg';
import car1Image from './Asset/car1.png';
import car2Image from './Asset/car2.png';
import car3Image from './Asset/car3.png';
import car4Image from './Asset/car4.png';
import car5Image from './Asset/car5.png';
import car6Image from './Asset/car6.png';
import car7Image from './Asset/car7.png';
import car8Image from './Asset/car8.png';

const cars = [car1Image, car2Image, car3Image, car4Image];
const topCars = [car5Image, car6Image, car7Image, car8Image];
const homepageCars = [car1Image, car2Image, car3Image, car4Image, car5Image];
const fsBottomLinks = [
  'https://movie-booking-rust-ten.vercel.app/',
  'https://neoflix-nu.vercel.app/',
  'https://example.com/fs-demo3',
  'https://example.com/fs-demo4'
];
const fsTopLinks = [
  'https://example.com/fs-demo5',
  'https://example.com/fs-demo6',
  'https://example.com/fs-demo7',
  'https://example.com/fs-demo8'
];
const fsTopTitles = [
  'FS Top Car 5',
  'FS Top Car 6',
  'FS Top Car 7',
  'FS Top Car 8'
];
const fsBottomTitles = [
  'Naman Cinema',
  'NeoFlix',
  'FS Bottom Car 3',
  'FS Bottom Car 4',
];

const dsaBottomLinks = [
  'https://example.com/dsa-demo1',
  'https://example.com/dsa-demo2',
  'https://example.com/dsa-demo3',
  'https://example.com/dsa-demo4'
];
const dsaTopLinks = [
  'https://example.com/dsa-demo5',
  'https://example.com/dsa-demo6',
  'https://example.com/dsa-demo7',
  'https://example.com/dsa-demo8'
];
const dsaTopTitles = [
  'DSA Top Racer 5',
  'DSA Top Racer 6',
  'DSA Top Racer 7',
  'DSA Top Racer 8'
];
const dsaBottomTitles = [
  'DSA Runner 1',
  'DSA Runner 2',
  'DSA Runner 3',
  'DSA Runner 4',
];

const projects = [
  {
    id: 1,
    title: 'Full Stack Team',
    displayName: 'FS',
    image: fsImage
  },
  {
    id: 2,
    title: 'DSA Team',
    displayName: 'DSA',
    image: dsaImage
  }
];

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [clickedCars, setClickedCars] = useState([]);
  const [vanishedCars, setVanishedCars] = useState([]);
  const winRefs = /* persisted map of stateKey -> Window */ (() => {
    const r = { current: {} };
    return r;
  })();
  const intervalRefs = /* persisted map of stateKey -> interval id */ (() => {
    const r = { current: {} };
    return r;
  })();

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.selectedTeamId) {
        const project = projects.find((item) => item.id === event.state.selectedTeamId);
        setSelectedTeam(project || null);
      } else {
        setSelectedTeam(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      // cleanup intervals and event listener
      Object.values(intervalRefs.current).forEach((id) => clearInterval(id));
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const openProject = (project) => {
    setSelectedTeam(project);
    window.history.pushState({ selectedTeamId: project.id }, '', `?team=${project.id}`);
  };

  const closePreview = () => {
    if (window.history.state?.selectedTeamId) {
      window.history.back();
      return;
    }
    setSelectedTeam(null);
  };

  const rotations = [-4, -2, 2, 4, -4, -2, 2, 4];

  const currentBottomLinks = selectedTeam?.id === 2 ? dsaBottomLinks : fsBottomLinks;
  const currentTopLinks = selectedTeam?.id === 2 ? dsaTopLinks : fsTopLinks;
  const currentBottomTitles = selectedTeam?.id === 2 ? dsaBottomTitles : fsBottomTitles;
  const currentTopTitles = selectedTeam?.id === 2 ? dsaTopTitles : fsTopTitles;

  const handleCarClick = (index, isTopLayer, event) => {
    event.stopPropagation();
    const stateKey = isTopLayer ? `top-${index}` : `bottom-${index}`;
    if (clickedCars.includes(stateKey) || vanishedCars.includes(stateKey)) return;
    setClickedCars((prev) => [...prev, stateKey]);

    // animate vanish after short delay so click feels responsive
    setTimeout(() => {
      setVanishedCars((prev) => [...prev, stateKey]);
    }, 650);

    const currentBottomLinks = selectedTeam?.id === 2 ? dsaBottomLinks : fsBottomLinks;
    const currentTopLinks = selectedTeam?.id === 2 ? dsaTopLinks : fsTopLinks;

    // If there's an associated link, open it and wait for window close to reset
    const link = isTopLayer ? currentTopLinks[index] : currentBottomLinks[index];
    if (link) {
      const w = window.open(link, '_blank');
      if (w) {
        winRefs.current[stateKey] = w;
        // poll for close
        const id = setInterval(() => {
          try {
            if (w.closed) {
              clearInterval(id);
              delete intervalRefs.current[stateKey];
              delete winRefs.current[stateKey];
              setClickedCars((prev) => prev.filter((i) => i !== stateKey));
              setVanishedCars((prev) => prev.filter((i) => i !== stateKey));
            }
          } catch (e) {
            // ignore cross-origin access errors
          }
        }, 500);
        intervalRefs.current[stateKey] = id;
        return;
      }
    }

    // fallback: if no link or popup blocked, reset after timeout
    setTimeout(() => {
      setClickedCars((prev) => prev.filter((i) => i !== stateKey));
      setVanishedCars((prev) => prev.filter((i) => i !== stateKey));
    }, 3600);
  };

  if (selectedTeam) {
    if (selectedTeam.id === 1) {

      return (
        <div className="fs-preview" onClick={closePreview}>
          <div className="fs-track">
            <img className="fs-track-bg" src={selectedTeam.image} alt={selectedTeam.title} />
            <div className="fs-start-line" />
            <div className="fs-car-row">
              {cars.map((car, index) => {
                const bottomKey = `bottom-${index}`;
                const dataIndex = index;
                if (vanishedCars.includes(bottomKey)) return null;
                const isClicked = clickedCars.includes(bottomKey);
                const style = isClicked
                  ? {
                      animation: 'none',
                      transform: `translateY(800px) scale(1.02) rotate(${rotations[dataIndex]}deg)`,
                      opacity: 0,
                      transition: 'transform 0.6s ease-in, opacity 0.6s ease-in',
                    }
                  : undefined;
                const link = currentBottomLinks[index] || null;
                return (
                  <div className="car-wrapper" key={bottomKey} data-index={dataIndex}>
                    <img
                      data-index={dataIndex}
                      className={`fs-car fs-car-${index + 1} ${isClicked ? 'clicked' : ''}`}
                      src={car}
                      alt={`Racing car ${index + 1}`}
                      onClick={(event) => {
                        if (link) window.open(link, '_blank');
                        handleCarClick(index, false, event);
                      }}
                      style={style}
                    />
                    <span className="car-tooltip-bottom">{currentBottomTitles[index] || ''}</span>
                  </div>
                );
              })}
            </div>
            <div className="fs-car-row fs-car-row-top">
              {topCars.map((car, index) => {
                const topKey = `top-${index}`;
                const dataIndex = index + 4;
                if (vanishedCars.includes(topKey)) return null;
                const isClicked = clickedCars.includes(topKey);
                const style = isClicked
                  ? {
                      animation: 'none',
                      transform: `translateY(800px) scale(1.02) rotate(${rotations[dataIndex]}deg)`,
                      opacity: 0,
                      transition: 'transform 0.6s ease-in, opacity 0.6s ease-in',
                    }
                  : undefined;
                const link = currentTopLinks[index] || null;
                const title = currentTopTitles[index] || '';
                return (
                  <div className="car-wrapper car-wrapper-top" key={topKey} data-index={dataIndex}>
                    <img
                      data-index={dataIndex}
                      className={`fs-car fs-car-${index + 1} ${isClicked ? 'clicked' : ''}`}
                      src={car}
                      alt={`Racing car top ${index + 1}`}
                      onClick={(event) => {
                        if (link) window.open(link, '_blank');
                        handleCarClick(index, true, event);
                      }}
                      style={style}
                    />
                    <span className="car-tooltip">{title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (selectedTeam.id === 2) {
      // Render same track layout for DSA
      return (
        <div className="fs-preview dsa-preview" onClick={closePreview}>
          <div className="fs-track">
            <img className="fs-track-bg" src={selectedTeam.image} alt={selectedTeam.title} />
            <div className="fs-start-line" />
            <div className="fs-car-row">
              {cars.map((car, index) => {
                const bottomKey = `bottom-${index}`;
                const dataIndex = index;
                if (vanishedCars.includes(bottomKey)) return null;
                const isClicked = clickedCars.includes(bottomKey);
                const style = isClicked
                  ? {
                      animation: 'none',
                      transform: `translateY(800px) scale(1.02) rotate(${rotations[dataIndex]}deg)`,
                      opacity: 0,
                      transition: 'transform 0.6s ease-in, opacity 0.6s ease-in',
                    }
                  : undefined;
                const link = currentBottomLinks[index] || null;
                return (
                  <div className="car-wrapper" key={bottomKey} data-index={dataIndex}>
                    <img
                      data-index={dataIndex}
                      className={`fs-car fs-car-${index + 1} ${isClicked ? 'clicked' : ''}`}
                      src={car}
                      alt={`Racing car ${index + 1}`}
                      onClick={(event) => {
                        if (link) window.open(link, '_blank');
                        handleCarClick(index, false, event);
                      }}
                      style={style}
                    />
                    <span className="car-tooltip-bottom">{currentBottomTitles[index] || ''}</span>
                  </div>
                );
              })}
            </div>
            <div className="fs-car-row fs-car-row-top">
              {topCars.map((car, index) => {
                const topKey = `top-${index}`;
                const dataIndex = index + 4;
                if (vanishedCars.includes(topKey)) return null;
                const isClicked = clickedCars.includes(topKey);
                const style = isClicked
                  ? {
                      animation: 'none',
                      transform: `translateY(800px) scale(1.02) rotate(${rotations[dataIndex]}deg)`,
                      opacity: 0,
                      transition: 'transform 0.6s ease-in, opacity 0.6s ease-in',
                    }
                  : undefined;
                const link = currentTopLinks[index] || null;
                const title = currentTopTitles[index] || '';
                return (
                  <div className="car-wrapper car-wrapper-top" key={topKey} data-index={dataIndex}>
                    <img
                      data-index={dataIndex}
                      className={`fs-car fs-car-${index + 1} ${isClicked ? 'clicked' : ''}`}
                      src={car}
                      alt={`Racing car top ${index + 1}`}
                      onClick={(event) => {
                        if (link) window.open(link, '_blank');
                        handleCarClick(index, true, event);
                      }}
                      style={style}
                    />
                    <span className="car-tooltip">{title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fullscreen-image" onClick={closePreview}>
        <img src={selectedTeam.image} alt={selectedTeam.title} />
      </div>
    );
  }

  return (
    <div className="app-shell" style={{ backgroundImage: `url(${backImage})` }}>
      <h1 className="page-heading" data-text="Welcome to Project Arena">Welcome to Project Arena</h1>
      <div className="homepage-circle" aria-hidden="true">
        {homepageCars.map((car, index) => (
          <div className="homepage-car" key={index}>
            <div className="homepage-car-inner">
              <img src={car} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className="team-flags">
        {projects.map((project) => (
          <button
            key={project.id}
            data-text={project.displayName}
            className={`team-option ${project.displayName.toLowerCase()}`}
            onClick={() => openProject(project)}
            aria-label={`Open ${project.title}`}
          >
            {project.displayName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
