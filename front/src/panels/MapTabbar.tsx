import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Div, Group, ModalPage, ModalPageHeader, ModalRoot, NavIdProps, Panel, Title } from '@vkontakte/vkui';
import { YMaps, Map, ZoomControl, Clusterer, Placemark } from '@pbe/react-yandex-maps';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { PlacemarkData, PlacemarkInfo } from '../components/MapDescription';
import '../styles/Placemark.scss';
import '../styles/ModalWindow.scss';
import '../styles/MapFilter.scss';
import '../styles/Tabbar.scss';
import '../styles/Components.scss';
import { TabbarComponent } from '../components/Tabbar';
import { $books, setActiveBook } from '../store/addBook';
import { getUserBooksFx } from '../api/addBookApi';
import { useUnit } from 'effector-react';
import { $user } from '../store/user';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import anime from 'animejs/lib/anime.es.js';
import { $dealAddress } from '../store/dealAddress';
import { $dealStore } from '../store/deal';
import { getDeals } from '../api/dealApi';
import { IDeal } from '../interfaces/interface';
import { $imagesStore } from '../store/images';

interface CustomMapProps extends NavIdProps {
    coordinates: [number, number, number][];
    fetchedUser?: UserInfo;
}

const CustomMapTabbar: React.FC<CustomMapProps> = ({ coordinates }: CustomMapProps) => {

    const [activePlacemarkId, setActivePlacemarkId] = useState<number | null>(null);
    const [modalActive, setModalActive] = useState<boolean>(true);
    const router = useRouteNavigator();

    const [books, user, dealAddress, dealStore, images] = useUnit([$books, $user, $dealAddress, $dealStore, $imagesStore]);
    const [fetchedUser, setFetchedUser] = useState<UserInfo | null>(null);
    const { first_name, last_name } = { ...user };
    const [pointBooks, setPointBooks] = useState<any>();

    const modalRef = useRef<HTMLDivElement>(null);
      
    const handlePlacemarkClick = (placemarkId: number) => {
        setActivePlacemarkId(placemarkId);
        setModalActive(false);
    };

    const closeModal = () => {
        setActivePlacemarkId(null);
        setModalActive(true);
    };


    const getPointBooks = (deal: IDeal, point: PlacemarkInfo) => {
        if (point.address === deal.address) {
            setPointBooks(deal.bookId);
        }
    }

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

            // getUserBooksFx();

            async function fetchData() {
                try {
                    const user = await bridge.send('VKWebAppGetUserInfo');
                    setFetchedUser(user);


                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
            fetchData();
        }

        getDeals();
        console.log(dealStore);
    }, []);
    

    return (
        <Panel>
            <YMaps query={{ load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon" }}>
                <div className='Map_wrapper'>
                    <Map className='Map' style={{ width: '100vw', height: '100vh' }} defaultState={{ center: [55.174366176405364, 61.38835450474792], zoom: 12 }}>
                        <ZoomControl options={{ float: "right" }} />
                        <Clusterer
                            options={{
                                preset: "islands#invertedBlackClusterIcons",
                                groupByCoordinates: false,
                            }}
                        >
                            {coordinates.map(([lat, lng, pointId, template]) => (
                                <Placemark 
                                key={pointId} 
                                geometry={[lat, lng]} 
                                options={{iconLayout: template, preset: 'islands#redStretchyIcon'}} 
                                properties={{iconContent: PlacemarkData[pointId] ? PlacemarkData[pointId].name : ""}}
                                onClick={() => handlePlacemarkClick(pointId)}/>
                            ))}
                        </Clusterer>
                    </Map>
                </div>
            </YMaps>
            {activePlacemarkId && PlacemarkData[activePlacemarkId] && (
                <ModalRoot activeModal={`placemarkInfo-${activePlacemarkId}`}>
                    <ModalPage
                        id={`placemarkInfo-${activePlacemarkId}`}
                        className='modal__window_background'
                        getRootRef={modalRef}
                        onClose={closeModal}
                        header={
                            <div className='modal__window_header'>
                                <ModalPageHeader>Информация о метке</ModalPageHeader>
                            </div>
                        }
                        settlingHeight={60}
                        dynamicContentHeight={true}
                        onOpen={() => {
                            anime({
                                targets: '.vkuiModalPage__in',
                                background: [
                                    'linear-gradient(75deg, rgba(85,134,198,1) 0%, rgba(49,59,85,1) 20%, rgba(60,113,167,1) 45%, rgba(60,105,150,1) 55%, rgba(49,59,85,1) 80%, rgba(109,120,133,1) 100%)',
                                    'linear-gradient(-75deg, rgba(85,134,198,1) 0%, rgba(49,59,85,1) 20%, rgba(60,113,167,1) 45%, rgba(60,105,150,1) 55%, rgba(49,59,85,1) 80%, rgba(109,120,133,1) 100%)'
                                ],
                                direction: 'alternate',
                                loop: true,
                                easing: 'easeInOutSine',
                                duration: 6800,
                                opacity: 1
                            });
                        }}
                    >
                        <div className="modal__window">
                            <h2 className="modal__window_title item"><strong>Имя:</strong>{PlacemarkData[activePlacemarkId].name}</h2>
                            <p className="modal__window_type item"><strong>Тип:</strong> {PlacemarkData[activePlacemarkId].type}</p>
                            <p className="modal__window_address item"><strong>Адрес:</strong> {PlacemarkData[activePlacemarkId].address}</p>
                            <p className="modal__window_time item"><strong>Время работы:</strong> {PlacemarkData[activePlacemarkId].time}</p>
                            <p className="modal__window_prompt item"><strong>Примечание:</strong> {PlacemarkData[activePlacemarkId].prompt}</p>
                            <p className='modal__window_listbooks item'>Список книг:</p>

                            <Div className='modal__window_listbooks-container'>
                                {
                                    dealStore.map(deal => deal.address === PlacemarkData[activePlacemarkId].address &&
                                        // <MapBooksFactory bookdId={deal.bookId}/>
                                        books.map(bookItem => bookItem.id === deal.bookId &&
                                            <Group 
                                                onClick={() => {router.push("/aboutBook"), setActiveBook(bookItem)}} 
                                                className='modal__window_book_container' 
                                                separator='hide'
                                            >
                                                <Div 
                                                    className='modal__window_div_image'
                                                >
                                                    <img 
                                                        className='modal__window_image' 
                                                        src={'http://localhost:3000/' + images.find(image => image.bookId === bookItem.id)?.path} 
                                                        alt={bookItem.title} 
                                                    />
                                                </Div>
                                                <Div className='modal__window_book-textContent'>
                                                    <Title className='modal__window_book__name'>{bookItem.title}</Title>
                                                    <Title className='modal__window_book__descr'>{bookItem.author}</Title>
                                                    <Title className='modal__window_book__descr'>{bookItem.genre}</Title>
                                                    <Title className='modal__window_book__descr'>{`${first_name + " " + last_name}`}</Title>
                                                </Div>
                                            </Group>
                                        )
                                    )
                                }
                            </Div>
                        </div>
                    </ModalPage>
                </ModalRoot>
            )}
            {modalActive && <TabbarComponent/>}
        </Panel>
    );
};

export default CustomMapTabbar;
