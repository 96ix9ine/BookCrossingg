import React, { useState } from "react";
import { Accordion, Cell, Div } from "@vkontakte/vkui";

interface AccordionItem {
  id: number;
  title: string;
}

export const AccordionVKID: React.FC = () => {
  const data: AccordionItem[] = [
    {
      id: 1,
      title: 'Фильтры'
    }
  ];

  const [openId, setOpenId] = useState<number | null>(2);
  const [selectedType, setSelectedType] = useState<string | null>(null);


  return (
    <>
      {data.map(({ id, title }) => (
        <Div className="map_div_filter">
          <Accordion
            key={id}
            expanded={openId === id}
            onChange={(e) => (e ? setOpenId(id) : setOpenId(null))}
          >
            <Accordion.Summary className="map_accordion">{title}</Accordion.Summary>
            <Accordion.Content>
              {/* <Cell className="map_accordion_item" Component="label" after={<Cell.Checkbox/>}>
              Все
              </Cell> */}
              <Cell className="map_accordion_item" Component="label" after={<Cell.Checkbox checked={selectedType === 'Коворкинг'} onChange={() => setSelectedType(selectedType === 'Коворкинг' ? null : 'Коворкинг')} />}>
              Коворкинги
              </Cell>
              <Cell className="map_accordion_item" Component="label" after={<Cell.Checkbox checked={selectedType === 'Торговый Центр'} onChange={() => setSelectedType(selectedType === 'Торговый Центр' ? null : 'Торговый Центр')} />}>
              Торговые Центры
              </Cell>
              <Cell className="map_accordion_item" Component="label" after={<Cell.Checkbox checked={selectedType === 'Кофейня'} onChange={() => setSelectedType(selectedType === 'Кофейня' ? null : 'Кофейня')} />}>
              Кофейни
              </Cell>
              <Cell className="map_accordion_item" Component="label" after={<Cell.Checkbox checked={selectedType === 'Книжный магазин'} onChange={() => setSelectedType(selectedType === 'Книжный магазин' ? null : 'Книжный магазин')} />}>
              Книжные магазины
              </Cell>
            </Accordion.Content>
          </Accordion>
        </Div>
      ))}
    </>
  );
};