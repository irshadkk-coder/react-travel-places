import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './placeDetails.css'
import locationIcon from "./images/location.png";
export default function PlaceDetails({ apiUrl }) {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');

    fetch(`${apiUrl}/view/${id}/`)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Request failed with status ${r.status}`);
        }
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        setPlace(data.data || null);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error('Fetch error', err);
        setPlace(null);
        setError('Unable to load place details right now.');
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [apiUrl, id]);

  if (loading) return <div className="page-wrap"><p>Loading...</p></div>;
  if (error) return <div className="page-wrap"><p>{error}</p></div>;
  if (!place) return <div className="page-wrap"><p>Place not found.</p></div>;

  const gallery = Array.isArray(place.gallery) ? place.gallery : [];
  const placeTitle = place.name || place.title || 'Place';

  return (
    <div className="page-wrap">
      <main>
        <section className="place-header">
          <h1 className="place-title">{placeTitle}</h1>
          <div className="tags">
            <span className='category-name'>{place.category_name}</span>  {place.location && <span className="meta"><img src={locationIcon} alt="Location"  style={{width:"20px"}}/> {place.location}</span>}
          </div>
        </section>

        <section className="gallery-grid">
          <div className="main-image">
            <img src={place.image}  alt={placeTitle} />
          </div>
          <div className="side-gallery">
            {gallery.map((g, i) => (
              <div key={i} className="small-thumb">
                <img src={g.image} alt={`${placeTitle} ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>

        <section className="details">
          <h2>Place Details</h2>
          <p>{place.description }</p>
        </section>
      </main>
    </div>
  );
}
