import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalPage, ModalPageHeader, ModalRoot, Panel } from '@vkontakte/vkui';
import { YMaps, Map, SearchControl, GeolocationControl, ZoomControl, Clusterer, Placemark } from '@pbe/react-yandex-maps';
import { PlacemarkData, PlacemarkInfo } from '../components/MapDescription';
import { AccordionVKID } from '../components/MapFilter';
import '../styles/Placemark.css';
import '../styles/ModalWindow.css';
import '../styles/MapFilter.css';
import '../styles/Tabbar.scss'
import { TabbarComponent } from '../components/Tabbar';


interface CustomMapProps {
    coordinates: [number, number, number][];
}

const CustomMap: React.FC<CustomMapProps> = ({ coordinates }) => {

    const [activePlacemarkId, setActivePlacemarkId] = useState<number | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
      
    const handlePlacemarkClick = (placemarkId: number) => {
        setActivePlacemarkId(placemarkId);
    };

    const closeModal = () => {
        setActivePlacemarkId(null);
    };

    // const filteredCoordinates = useMemo(() => {
    //     if (!selectedType) return coordinates;
      
    //     return coordinates.filter(([lat, lng, _, type]) => type === selectedType);
    //   }, [coordinates, selectedType]);

    useEffect(() => {
        const script = document.createElement('script');
        document.body.appendChild(script);
        script.type = "text/javascript";
        script.src = `https://api-maps.yandex.ru/v3/?apikey=e6598c17-363a-4fdb-bd29-e0a48d1f04ca&lang=ru`;
        script.onload = async () => {
            const ymaps = window.ymaps3;
            await ymaps.ready;
            const ymaps3Reactify = await ymaps.import('@yandex/ymaps3-reactify');
            const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);

            setData({
                reactify,
                ymaps
            });
        }

    }, []);

    return (
        <Panel>
            <YMaps query={{ ns: "use-load-option", load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon" }}>
                <div className='Map_wrapper'>
                    <Map className='Map' style={{ width: '100vw', height: '100vh' }} defaultState={{ center: [55.174366176405364, 61.38835450474792], zoom: 12 }}>
                        <AccordionVKID/>
                        {/* <SearchControl options={{ float: "right" }} />
                        <GeolocationControl options={{ float: "left" }} /> */}
                        <ZoomControl options={{ float: "right" }} />
                        <Clusterer
                            options={{
                                preset: "islands#invertedVioletClusterIcons",
                                groupByCoordinates: false,
                            }}
                        >
                            {coordinates.map(([lat, lng, pointId, template]) => (
                                <Placemark key={pointId} geometry={[lat, lng]} options={{iconLayout: template}} onClick={() => handlePlacemarkClick(pointId)}/>
                            ))}
                        </Clusterer>
                    </Map>
                </div>
            </YMaps>
            {activePlacemarkId && PlacemarkData[activePlacemarkId] && ( // PlacemarkData[activePlacemarkId] - проверка на то что этот элемент существует и его можно открыть
                <ModalRoot activeModal={`placemarkInfo-${activePlacemarkId}`}>
                <ModalPage
                    id={`placemarkInfo-${activePlacemarkId}`}
                    onClose={closeModal}
                    header={<ModalPageHeader>Информация о метке</ModalPageHeader>}
                    settlingHeight={50}
                    dynamicContentHeight={true}
                >                   
                    <div className="modal__window">
                        <h2 className="modal__window_title item"><strong>Имя:</strong>{PlacemarkData[activePlacemarkId].name}</h2>
                        <p className="modal__window_type item"><strong>Тип:</strong> {PlacemarkData[activePlacemarkId].type}</p>
                        <p className="modal__window_address item"><strong>Адрес:</strong> {PlacemarkData[activePlacemarkId].address}</p>
                        <p className="modal__window_time item"><strong>Время работы:</strong> {PlacemarkData[activePlacemarkId].time}</p>
                        <p className="modal__window_prompt item"><strong>Примечание:</strong> {PlacemarkData[activePlacemarkId].prompt}</p>
                    </div>
                </ModalPage>
                </ModalRoot>
            )}
            <TabbarComponent/>
        </Panel>
    );
};

export default CustomMap;
