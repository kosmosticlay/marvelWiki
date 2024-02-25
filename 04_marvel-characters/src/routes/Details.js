import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Details.module.css";

export default function Details() {
  const [selectedChar, setSelectedChar] = useState({});
  const [charEvents, setCharEvents] = useState([]);
  const bgImageRef = useRef();
  const classifiedRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch(
        `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`
      );
      const json = await response.json();
      if (json.data.results.length > 0) {
        setSelectedChar(json.data.results[0]);
        setCharEvents(json.data.results[0].events.items);
      } else {
        setSelectedChar(null);
      }
    };

    getCharacters();
  }, [id]);

  useEffect(() => {
    if (selectedChar && selectedChar.thumbnail && bgImageRef.current) {
      const bgImageUrl = `${selectedChar.thumbnail.path}.${selectedChar.thumbnail.extension}`;
      bgImageRef.current.style.backgroundImage = `url(${bgImageUrl})`;
    }
  }, [selectedChar]);

  useEffect(() => {
    const getComics = async () => {
      const response = await fetch(
        `http://gateway.marvel.com/v1/public/comics/58636`
      );
      const json = await response.json();
      console.log(json);
    };
    getComics();
  }, []);

  return (
    <>
      <div className={styles.detailsWrapper} ref={bgImageRef}>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsAside}>
            <div className={styles.classified} ref={classifiedRef}></div>
            <img
              alt={selectedChar.id}
              src={`${selectedChar?.thumbnail?.path}.${selectedChar?.thumbnail?.extension}`}
            />
            <Link
              to={`https://marvel.fandom.com/wiki/${selectedChar.name}`}
              className={styles.findMoreBtn}
            >
              FIND MORE
            </Link>
          </div>
          <div className={styles.detailsContent}>
            <div className={styles.detailsHeader}>
              <h2>{selectedChar.name}</h2>
              <span>{selectedChar.modified?.slice(0, 4)}</span>
            </div>
            <ul className={styles.eventsList}>
              {charEvents.map((charEvent, idx) => (
                <li key={idx} className={styles.eventsItem}>
                  {charEvent.name}
                </li>
              ))}
            </ul>
            <p>{selectedChar.description || "Unknown Hero"}</p>
          </div>
          <Link className={styles.backLink} to="/">
            X BACK
          </Link>
        </div>
      </div>
    </>
  );
}
