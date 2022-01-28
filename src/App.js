import styles from "./App.module.scss";
import Header from "./Components/Header/index.jsx";
import FlatsCard from "./Components/FlatsCard";
import Search from "./Components/Searchbar/index";
import Stays from "./Components/Stays/index";
import { data } from "./Components/data/stays";
import { useState, useEffect } from "react";

function App() {
  const [cercaInput, setCercaInput] = useState("");
  const [rooms, setRooms] = useState(data);

  const handleCercaInput = (e) => setCercaInput(e.target.value);
  const [isModalShown, setModalShown] = useState(false);
  
  const handleModal = () => {
    setModalShown(true);
  }

  useEffect(() => {
    const search = data.filter(
      (flats) =>
        flats.city.toLowerCase().includes(cercaInput.toLowerCase()) ||
        cercaInput === ""
    );

    setRooms(search);
  }, [cercaInput]);

  return (
    <div className="App">
      <div>
      <Header 
        onClickMod={handleModal}
      />
      {isModalShown && <Search
        cercaInput={cercaInput}
        handleCercaInput={handleCercaInput}
        onClickNav={setCercaInput}
      
      /> }
      </div>
      <Stays count={rooms.length} />
      <section className={styles.cardContainer}>
        {rooms.map((flats) => (
          <FlatsCard
            key={flats.id}
            image={flats.photo}
            superHost={flats.superHost}
            type={flats.type}
            beds={flats.beds}
            rating={flats.rating}
            title={flats.title}
          />
        ))}
      </section>
      <Stays count={rooms.length} />
    </div>
  );
}

export default App;