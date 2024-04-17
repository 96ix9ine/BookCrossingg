import { Icon28ArrowLeftOutline } from "@vkontakte/icons";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Group, Panel, PanelHeader, Text, SimpleCell, Avatar, CellButton } from "@vkontakte/vkui";
import * as React from "react";
import { ProfileProps } from "./Profile";
import "../styles/AboutBook.scss"
import { useUnit } from "effector-react";
import { $user } from "../store/user";
import { useEffect } from "react";
import { $activeBook } from "../store/addBook";
import { $imagesStore } from "../store/images";

const AboutBook: React.FC<ProfileProps> = () => {
    const routeNavigator = useRouteNavigator();
    const [user, activeBook, images] = useUnit([$user, $activeBook, $imagesStore]);
    const { photo_max_orig, city, first_name, last_name } = { ...user };

    useEffect(() => {
        console.log(activeBook)
    }, []);

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
                        <Text className="book_name">{activeBook.title}</Text>
                    </div>
                <SimpleCell className="user" before={<Avatar size={72} src={photo_max_orig} />}>
                    <p>{`${first_name + " " + last_name}`}</p>
                    <p>{`${user?.city}`}</p>
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
                            {activeBook.description}
                        </Text>
                    </div>
                    <div className="bool_damage">
                        <Text className="book_description_title">Степень повреждения книги</Text>
                        <Text>{activeBook.damageLevel}</Text>
                    </div>
                    <div className="book_Adress">
                        <Text className="book_description_title">Адрес встречи</Text>
                        <Text>Челябинск, Черкасская улица</Text>
                    </div>
                </div>
                <CellButton className="write-seller">
                    <span className="write-seller_btn">Написать продавцу</span>
                </CellButton>
            </Group>
        </Panel>
    );
};

export default AboutBook;