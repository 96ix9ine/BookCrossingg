import { 
    Button, 
    Panel, 
    PanelHeader, 
    PanelHeaderBack, 
    File,
    Text, 
    Avatar, 
    PanelHeaderButton, 
    Div,
    Group,
    Link,
    CellButton,
    Cell,
    IconButton,
    Input,
    Title,
    FormItem,
    CustomSelect,
    CustomSelectOptionInterface,
    Radio,
    Footer,
    RadioGroup
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import "../styles/AddBookPanel/AddBook.scss";
import AddBookPanelHeaderComponent from "../components/AddBookPanelHeaderComponent";
import { 
    Icon16Clear, 
    Icon12ChevronOutline, 
    Icon24Camera,
    Icon28AddOutline
} from "@vkontakte/icons";
import { TabbarComponent } from "../components/Tabbar";
import { useEffect, useState } from "react";


const AddBookPanel = (): JSX.Element => {
    const routeNavigator = useRouteNavigator();
    const [bookName, setBookName] = useState<string>("");
    const [bookAuthor, setBookAuthor] = useState<string>("");
    const [bookDescr, setBookDescr] = useState<string>("");
    const [bookGenre, setBookGenre] = useState<string>("");

    const selectGenres = [
        {
            label: 'Комиксы',
            value: 'Комиксы',
        },
        {
            label: 'Манга',
            value: 'Манга',
        },
        {
            label: 'Фэнтези',
            value: 'Фэнтези',
        },
        {
            label: 'Романтика',
            value: 'Романтика',
        },
        {
            label: 'Драма',
            value: 'Драма',
        },    
        {
            label: 'Детективы',
            value: 'Детективы',
        },
        {
            label: 'История',
            value: 'История',
        },
        {
            label: 'Ужасы',
            value: 'Ужасы',
        },
    ];
    

    return (
        <Panel>
            <Group separator="show">
                <AddBookPanelHeaderComponent />
                
                <div className="container input__wrapper">
                    <div className="top">
                        <Title className="input__title" level="2">Адрес</Title>
                        <Cell onClick={() => {
                            routeNavigator.push("/map")
                        }} className="cellbutton">
                            <Text className="cellbutton__text">Выбрать на карте <Icon12ChevronOutline width={15} height={15}/></Text>
                        </Cell>
                    </div>
                    <Input
                        className="input"
                        type="text"
                        placeholder="Введите адрес"
                    />
                </div>

                <div className="container loadImage__wrapper">
                    <Title className="input__title" level="2">Изображение</Title>
                    <FormItem
                        className="file__wrapper"
                    >
                        <File
                            className="file"
                            size="l"
                        >
                            <Icon28AddOutline width={47} height={47} style={{color: "#A5A5A5"}}/>
                        </File>
                        
                    </FormItem>
                    <Text className="maxSize__text">максимальный размер изображения:<br /> 1000x1000px</Text>
                </div>

                <div className="container input__wrapper">
                    <Title className="input__title bottom__title" level="2">Название</Title>
                    <Input
                        className="input"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        type="text"
                        placeholder="Введите название"
                    />
                </div>

                <div className="container input__wrapper">
                    <Title className="input__title bottom__title" level="2">Автор</Title>
                    <Input
                        className="input"
                        type="text"
                        value={bookAuthor}
                        onChange={(e) => setBookAuthor(e.target.value)}
                        placeholder="Введите автора"
                    />
                </div>

                <div className="container input__wrapper">
                    <Title className="input__title bottom__title" level="2">Описание книги</Title>
                    <Input
                        className="input"
                        type="text"
                        value={bookDescr}
                        onChange={(e) => setBookDescr(e.target.value)}
                        placeholder="Введите описание книги"
                    />
                </div>

                <div className="container input__wrapper">
                    <Title className="input__title bottom__title">Жанры</Title>
                    <CustomSelect
                        id="administrator-select-id"
                        value={bookGenre}
                        onChange={(e) => setBookGenre(e.target.value)}
                        placeholder="Не выбран"
                        options={selectGenres}
                    />
                </div>
                
                <div className="container input__wrapper">
                    <Title className="input__title bottom__title" level="2">Описание книги</Title>
                    <RadioGroup>
                        <Radio name="exchange" value="1" defaultChecked>
                            Бесплатно
                        </Radio>
                        <Radio name="exchange" value="2" defaultChecked>
                            Обмен
                        </Radio>
                    </RadioGroup>
                </div>

                <div className="container input__wrapper">
                    <Title className="input__title bottom__title" level="2">Степень повреждения</Title>
                    <RadioGroup>
                        <Radio name="damage" value="3" defaultChecked>
                            Нет
                        </Radio>
                        <Radio name="damage" value="4" defaultChecked>
                            Небольшие
                        </Radio>
                        <Radio name="damage" value="5" defaultChecked>
                            Сильные
                        </Radio>
                    </RadioGroup>
                </div>
            </Group>

            <Footer>
                <Group>
                    <Text className="footer__text" style={{textAlign: "left"}}>Добавляя книгу, вы подтверждаете, что прочли и соглашаетесь с Политикой конфиденциальности и Пользовательским соглашением</Text>
                    <CellButton 
                        className="addBook__button"
                        onClick={() => {}}
                    >
                        <span>Добавить книгу</span>
                    </CellButton>
                </Group>
            </Footer>
        </Panel>
    );
}


export default AddBookPanel;