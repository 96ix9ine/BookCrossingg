import { Icon28ArrowLeftOutline } from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Group, Panel, PanelHeader, Text, SimpleCell, Avatar, CellButton } from "@vkontakte/vkui";
import * as React from "react";
import { ProfileProps } from "./Profile";
import "../styles/AboutBook.scss"

const AboutBook: React.FC<ProfileProps> = ({fetchedUser}) => {
    const { photo_max_orig, city, first_name, last_name } = { ...fetchedUser };
    const routeNavigator = useRouteNavigator();

    return (
        <Panel>
            <Group>
                <PanelHeader before={<Icon28ArrowLeftOutline style={{paddingLeft: 5}} onClick={() => routeNavigator.back()} />}>
                        <Text className="book_header">Книга</Text>
                </PanelHeader>
                    <div className="book_title">
                        <img width={190} src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_655ef7271457c967f7e88543_655ef922b7f52370d5b5524b/scale_1200" alt="фото книги"></img>
                        <Text className="book_name">Заголовок книги</Text>
                    </div>
                <SimpleCell className="user" before={<Avatar size={72} src={photo_max_orig} />}>
                <p>{`${first_name + " " + last_name}`}</p>
                <p>{`${city}`}</p>
                </SimpleCell>
                <div className="book_info">
                <div className="book_Author">
                <Text className="book_description_title">Автор</Text>
                <Text>Анджей Сапковский</Text>
                </div>
                <div className="book_Genre">
                <Text className="book_description_title">Жанр</Text>
                <Text className="genre">Современная зарубежная проза</Text>
                <Text className="genre">Фентези</Text>
                <Text className="genre">Романтика</Text>
                </div>
                <div className="book_Description">
                <Text className="book_description_title">Описание книги</Text>
                <Text>
                    Ведьмак — это мастер меча и мэтр волшебства, ведущий непрерывную войну
                     с кровожадными монстрами, которые угрожают покою сказочной страны. «Ведьмак»
                      — это мир на острие меча, ошеломляющее действие, незабываемые ситуации,
                       великолепные боевые сцены.
                    Читайте продолжение саги о Ведьмаке!
                </Text>
                </div>
                <div className="bool_damage">
                <Text className="book_description_title">Степень повреждения книги</Text>
                <Text>Нет повреждений</Text>
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