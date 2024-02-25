import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch(
        "https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023"
      );
      const json = await response.json();
      setCharacters(json.data.results);
    };

    getCharacters();
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.logo}>MARVEL WIKI</h1>
        <span>Click to find the hero's classified information</span>
      </header>
      <div className={styles.main}>
        <ul className={styles.characterList}>
          {characters.length > 0 ? (
            characters.map((character) => {
              if (!character.thumbnail.path.includes("image_not_available")) {
                return (
                  <Link to={`/character/${character.id}`} key={character.id}>
                    <div className={styles.card}>
                      <img
                        src={`${character.thumbnail.path}.jpg`}
                        alt={character.name}
                      />
                      <div className={styles.hoverOverlay}>
                        <span>{character.name}</span>
                      </div>
                    </div>
                  </Link>
                );
              } else {
                return null;
              }
            })
          ) : (
            <div className={styles.loading}>LOOKING FOR YOUR 🔥HEROS🔥</div>
          )}
        </ul>
      </div>
    </div>
  );
}
