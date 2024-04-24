import { Icon28ArrowLeftOutline } from "@vkontakte/icons";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Group, Panel, PanelHeader, Text, SimpleCell, Avatar, CellButton } from "@vkontakte/vkui";
import * as React from "react";
import { ProfileProps } from "./Profile";
import "../styles/AboutBook.scss"
import { useUnit } from "effector-react";
import { $user, $userServerStore } from "../store/user";
import { useEffect } from "react";
import { $activeBook } from "../store/addBook";
import { $imagesStore } from "../store/images";
import { $dealStore } from "../store/deal";
import { $dealAddress } from "../store/dealAddress";
import { getDeals } from "../api/dealApi";
import { getUserIdFx, getVkUserId } from "../api/addUserApi";

const AboutBook: React.FC<ProfileProps> = () => {
    const routeNavigator = useRouteNavigator();
    const [user, activeBook, images, dealStore, dealAddress, userServerStore] = useUnit([$user, $activeBook, $imagesStore, $dealStore, $dealAddress, $userServerStore]);
    const { photo_max_orig, city, first_name, last_name } = { ...user };

    useEffect(() => {
        getDeals();
        console.log(activeBook)
    }, []);


    const handleMessagesClick = async (userId: string | undefined) => {
        if (userId) {
            const vkUserId = await getVkUserId(userId);
            window.open(`https://vk.com/im?sel=${vkUserId.vkId}`, '_blank');
        }

        else {
            // TODO: snackbar about error
        }
    };

    return (
        <Panel>
            <Group>
                <PanelHeader before={<Icon28ArrowLeftOutline style={{paddingLeft: 5}} onClick={() => routeNavigator.back()} />}>
                        <Text className="book_header">Книга</Text>
                </PanelHeader>
                <div className="book_title">
                    <img 
                        width={190} 
                        src={'http://localhost:3000/' + images.find(image => image.bookId === activeBook.id)?.path} 
                        alt="фото книги">
                    </img>
                    {activeBook.title ? <Text className="book_name">{activeBook.title}</Text> : <Text className="book_name">Нет названия</Text>}
                </div>
                <SimpleCell className="user" before={<Avatar size={72} src={photo_max_orig} />}>
                    <p>{`${first_name + " " + last_name}`}</p>
                    <p>{`${user?.city.title}`}</p>
                </SimpleCell>
                <div className="book_info">
                    <div className="book_Author">
                        <Text className="book_description_title">Автор</Text>
                        <Text>{activeBook.author}</Text>
                    </div>
                    <div className="book_Genre">
                        <Text className="book_description_title">Жанр</Text>
                        <Text className="genre">{activeBook.genre}</Text>
                    </div>
                    <div className="book_Description">
                        <Text className="book_description_title">Описание книги</Text>
                        <Text>
                            {activeBook.descripton}
                        </Text>
                    </div>
                    <div className="bool_damage">
                        <Text className="book_description_title">Степень повреждения книги</Text>
                        <Text>{activeBook.damageLevel}</Text>
                    </div>
                    <div className="book_Adress">
                        <Text className="book_description_title">Адрес встречи</Text>
                        {
                            dealStore.map(deal => deal.bookId == activeBook.id && <Text>{deal.address}</Text>) 
                        }
                    </div>
                </div>
                <CellButton className="write-seller">
                    <span 
                        className="write-seller_btn"
                        onClick={() => handleMessagesClick(activeBook.userId)}
                    >
                        Написать продавцу
                    </span>
                </CellButton>
            </Group>
        </Panel>
    );
};

export default AboutBook;