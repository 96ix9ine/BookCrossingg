import React, { useState, useRef } from "react";
import { Checkbox, Group, Search, Footer, Button } from "@vkontakte/vkui";
import { FixedSizeList } from 'react-window';
import "../styles/StartScreens.scss";
import { CityisListObjects } from "./CitiesList";
import { StartScreensPanel } from "../panels/StartScreensPanel";

// interface StartSearchProps {
//   goHeaderSearch: () => void;
// }

export const StartSearchComponent: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const listRef = useRef<FixedSizeList>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // Сбрасываем прокрутку при изменении поиска
    if (listRef.current) {
      listRef.current.scrollTo(0);
    }
  };

  const handleItemClick = (id: number) => {
    if (selectedCity === id) {
      setSelectedCity(null);
    } else {
      setSelectedCity(id);
    }
  };

  const CitiesFiltered = CityisListObjects.filter(
    ({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1
  );
  // const [activePanel, setActivePanel] = useState<string>("1");
  // const goToNextPanel = () => {
  //   goHeaderSearch = () => setActivePanel("3");
  // }

  // Функция для рендеринга каждого элемента списка
  const Row = ({ index, style }) => (
    <div style={style} className={`checkbox-right ${selectedCity === CitiesFiltered[index].id ? 'active' : ''}`} onClick={() => handleItemClick(CitiesFiltered[index].id)}>
      <span>{CitiesFiltered[index].name}</span>
      <Checkbox checked={selectedCity === CitiesFiltered[index].id} onChange={() => {}} />
    </div>
  );

  return (
    <React.Fragment>
      <Group>
        <Search value={search} onChange={onChange} after={null} />
        {CitiesFiltered.length > 0 && (
          <FixedSizeList
            height={600}
            itemCount={CitiesFiltered.length}
            itemSize={50}
            width={'100%'}
            ref={listRef}
          >
            {Row}
          </FixedSizeList>
        )}
        {/* {selectedCity && (
          <Footer>
            <Button onClick={goToNextPanel}>Your Button Text</Button>
          </Footer>
        )} */}
        {CitiesFiltered.length === 0 && <Footer>Ничего не найдено</Footer>}
      </Group>
    </React.Fragment>
  );
};
