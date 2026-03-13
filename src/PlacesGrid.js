import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './placeGrid.css'
import locationIcon from "./images/location.png";

export default function PlacesGrid({ apiUrl }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');

    fetch(apiUrl)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Request failed with status ${r.status}`);
        }
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        setPlaces(data.data || []);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error('Fetch error', err);
        setPlaces([]);
        setError('Unable to load places right now.');
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [apiUrl]);
  

  if (loading) return <div className="page-wrap"><p>Loading...</p></div>;
  if (error) return <div className="page-wrap"><p>{error}</p></div>;
  if (!places.length) return <div className="page-wrap"><p>No places found.</p></div>;

  return (
    <div className="page-wrap">
      <main>
        <section className="hero">
          <h1 className="title">Welcome</h1>
          <p className="subtitle">Explore the world around you</p>
        </section>

        <section className="grid">
          {places.map((p) => (
            <article
              key={p.id}
              className="card"
              onClick={() => navigate(`/place/${p.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' && navigate(`/place/${p.id}`))}
            >
              <div className="thumb">
                <img src={p.image} loading="lazy" alt={p.title|| 'place'} />
              </div>
              <div className="card-body">
                <h3>{p.title}</h3>
                <p className="meta"><img src={locationIcon} alt="Location"  style={{width:"20px"}}/>{p.location}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
