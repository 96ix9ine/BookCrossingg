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
    RadioGroup,
    Image
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import "../styles/AddBookPanel/AddBook.scss";
import { 
    Icon16Clear, 
    Icon12ChevronOutline, 
    Icon24Camera,
    Icon28AddOutline,
    Icon28ArrowLeftOutline
} from "@vkontakte/icons";
import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { $books } from "../store/addBook";
import { createBookFx } from "../api/addBookApi";
import { IBook } from "../interfaces/IBook";


const AddBookPanel = (): JSX.Element => {
    const routeNavigator = useRouteNavigator();
    const [bookName, setBookName] = useState<string>("");
    const [bookAuthor, setBookAuthor] = useState<string>("");
    const [bookDescr, setBookDescr] = useState<string>("");
    const [bookGenre, setBookGenre] = useState<string>("");
    const [bookDealType, setBookDealType] = useState<string>("");
    const [bookDamageLevel, setBookDamageLevel] = useState<string>("");
    const [bookImageFile, setBookImageFile] = useState<any | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");

    const book = useUnit($books);

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


    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setImageUrl(imageURL);
    }


    useEffect(() => {
        console.log(imageUrl);
    }, [imageUrl]);


    const resetBookData = () => {
        setBookName("");
        setBookAuthor("");
        setBookDescr("");
        setBookGenre("");
        setBookDealType("");
        setBookDamageLevel("");
    }


    const addBook = async () => {
        const newBook: IBook = {
            name: bookName,
            author: bookAuthor,
            description: bookDescr,
            genre: bookGenre,
            dealType: bookDealType,
            damageLevel: bookDamageLevel,
            imagePath: imageUrl
        }

        return await createBookFx(newBook);
    }
    

    return (
        <Panel>
            <Group separator="show">
                <PanelHeader
                    className="addBook__panelheader"
                    id="addbook"
                    before={
                        <Icon28ArrowLeftOutline style={{paddingLeft: 5}} onClick={() => routeNavigator.back()}/>
                    }
                >
                    <Group className="group">
                        <Text
                            className="panelheader__title"
                        >
                            Добавить книгу
                        </Text>
                        <CellButton
                            onClick={() => {resetBookData()}} 
                            className="cellbutton"
                        >
                            <Text className="cellbutton__text">Очистить</Text>
                        </CellButton>
                    </Group>
                </PanelHeader>
                
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
                        disabled
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
                            appearance="overlay"
                            onChange={handleFileUpload}
                        >
                            {
                                bookImageFile 
                                ? 
                                    <img src={imageUrl} /> 
                                : 
                                    <Icon28AddOutline width={47} height={47} style={{color: "#A5A5A5"}}/>
                            }
                            
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
                    <Title className="input__title bottom__title" level="2">Тип сделки</Title>
                    <RadioGroup>
                        <Radio
                            name="exchange"
                            value="1"
                            defaultChecked
                            onChange={() => setBookDealType("Бесплатно")}
                        >
                            Бесплатно
                        </Radio>
                        <Radio 
                            name="exchange" 
                            value="2" 
                            defaultChecked
                            onChange={() => setBookDealType("Обмен")}
                        >
                            Обмен
                        </Radio>
                    </RadioGroup>
                </div>

                <div className="container input__wrapper">
                    <Title className="input__title bottom__title" level="2">Степень повреждения</Title>
                    <RadioGroup>
                        <Radio
                            name="damage"
                            value="3"
                            defaultChecked
                        >
                            Нет
                        </Radio>
                        <Radio 
                            name="damage" 
                            value="4" 
                            defaultChecked
                        >
                            Небольшие
                        </Radio>
                        <Radio 
                            name="damage"
                            value="5"
                            defaultChecked
                        >
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
                        onClick={() => {addBook(); resetBookData()}}
                    >
                        <span>Добавить книгу</span>
                    </CellButton>
                </Group>
            </Footer>
        </Panel>
    );
}


export default AddBookPanel;