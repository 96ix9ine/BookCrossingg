import { 
    Button, 
    Panel, 
    PanelHeader, 
    File,
    Text, 
    Group,
    CellButton,
    Cell,
    Input,
    Title,
    FormItem,
    CustomSelect,
    Radio,
    Footer,
    RadioGroup,
    Snackbar,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import "../styles/AddBookPanel/AddBook.scss";
import { 
    Icon12ChevronOutline, 
    Icon28ArrowLeftOutline,
    Icon28CheckCircleOutline
} from "@vkontakte/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUnit } from "effector-react";
import { $books, addResultBook } from "../store/addBook";
import { handleCreateBook, handleImageUpload } from "../api/addBookApi";
import { IDataState } from "../interfaces/interface";
import { $userServerStore, $user } from "../store/user";
import { initialState } from "../constatns/FormDataConstant";
import { getUserIdFx } from "../api/addUserApi";
import { handleCreateDeal } from "../api/dealApi";
import { $dealAddress, setDealAddress } from "../store/dealAddress";


const AddBookPanel = (): JSX.Element => {
    const routeNavigator = useRouteNavigator();
    const [bookImageFile, setBookImageFile] = useState<any | null>(null);

    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [images, setImages] = useState<any>([]);
    const [done, setDone] = useState<boolean>(false);

    const userServer = useUnit($userServerStore);
    const userVk = useUnit($user);
    const dealAddress = useUnit($dealAddress);

    const [formData, setFormData] = useState<IDataState>(initialState);
    const [go, setGo] = useState({
        start: false,
        bookId: '',
    });

    const books = useUnit($books);


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


    const handleSubmit = useCallback(async () => {
        let user_Id: string = "";

        if (userVk != null) {
            user_Id = await getUserIdFx(userVk.id);
        }

        const result = await handleCreateBook(user_Id.id, formData);
        addResultBook(result);
        const deal = handleSetAddress(user_Id.id, result.id, dealAddress);   

        if (result.id !== '') {
            setGo({
                start: true,
                bookId: result.id
            })
        }

        console.log(deal);

        setDone(true);
        resetBookData();
        console.log("Сохранено")
    }, [formData, userServer])


    const handleSetAddress = async (userId: any, resultId: any, address:  any) => {
        return await handleCreateDeal(userId, resultId, address);
    }


    const handleImageChange = (event: any) => {
        const files = event.target.files;
        setSelectedImages([...selectedImages, ...files]);
    };


    const handleChangeValue = (e: any, field: keyof IDataState) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };


    useEffect(() => {
        if (go.start) {
            handleImageUpload(selectedImages, go.bookId);
        }

        console.log(dealAddress);
        console.log(done);
    }, []);

    const resetBookData = () => {
        setFormData(initialState);
        setDone(false);
        // setSelectedImages([]);
        setDealAddress("");
    }


    const openSuccess = () => {
        if (snackbar) return;
        setSnackbar(
            <Snackbar className="addbook_snackbar"
                onClose={() => setSnackbar(null)}
                before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
                duration={1000}
            >
                Книга успешно добавлена
            </Snackbar>
        );
    };

    return (
        <Panel>
            <Group separator="hide">
                <PanelHeader
                    className="addBook__panelheader"
                    id="addbook"
                    before={
                        <Icon28ArrowLeftOutline style={{paddingLeft: 5}} onClick={() => {routeNavigator.push("/"); resetBookData();}}/>
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
                        value={dealAddress ? dealAddress : "Выберите адрес"}
                        disabled
                    />
                </div>
                
                {
                    done
                    ?
                    <Text>
                        Упс
                    </Text>
                    :   
                    <form onSubmit={handleSubmit}>
                        <div className="container loadImage__wrapper">
                            <Title className="input__title" level="2">Изображение</Title>
                            <FormItem
                                className="file__wrapper"
                            >
                                <File
                                    className="file"
                                    size="l"
                                    appearance="overlay"
                                    onChange={handleImageChange}
                                >
                                    {
                                        images.map((image: any, id: any) => {
                                            return <img key={id} src={'http://localhost:3000/' + image.path}/>
                                        })
                                    }
                                </File>
                            </FormItem>
                            <Text className="maxSize__text">максимальный размер изображения:<br /> 1000x1000px</Text>
                        </div>

                        <div className="container input__wrapper">
                            <Title className="input__title bottom__title" level="2">Название</Title>
                            <Input
                                className="input"
                                value={formData.title}
                                onChange={(e) => handleChangeValue(e, "title")}
                                type="text"
                                placeholder="Введите название"
                            />
                        </div>

                        <div className="container input__wrapper">
                            <Title className="input__title bottom__title" level="2">Автор</Title>
                            <Input
                                className="input"
                                type="text"
                                value={formData.author}
                                onChange={(e) => handleChangeValue(e, "author")}
                                placeholder="Введите автора"
                            />
                        </div>

                        <div className="container input__wrapper">
                            <Title className="input__title bottom__title" level="2">Описание книги</Title>
                            <Input
                                className="input"
                                type="text"
                                value={formData.description}
                                onChange={(e) => handleChangeValue(e, "description")}
                                placeholder="Введите описание книги"
                            />
                        </div>

                        <div className="container input__wrapper">
                            <Title className="input__title bottom__title">Жанры</Title>
                            <CustomSelect
                                id="administrator-select-id"
                                value={formData.genre}
                                onChange={(e) => handleChangeValue(e, "genre")}
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
                                    onChange={(e) => handleChangeValue(e, "dealType")}
                                >
                                    Бесплатно
                                </Radio>
                                <Radio 
                                    name="exchange" 
                                    value="2" 
                                    defaultChecked
                                    onChange={(e) => handleChangeValue(e, "dealType")}
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
                                    value="Нет"
                                    defaultChecked
                                    onChange={(e) => handleChangeValue(e, "damageLevel")}
                                >
                                    Нет
                                </Radio>
                                <Radio 
                                    name="damage" 
                                    value="4" 
                                    defaultChecked
                                    onChange={(e) => handleChangeValue(e, "damageLevel")}
                                >
                                    Небольшие
                                </Radio>
                                <Radio 
                                    name="damage"
                                    value="5"
                                    defaultChecked
                                    onChange={(e) => handleChangeValue(e, "damageLevel")}
                                >
                                    Сильные
                                </Radio>
                            </RadioGroup>
                        </div>
                        <FormItem>
                            <Group separator="hide">
                                <Text className="footer__text" style={{textAlign: "left"}}>Добавляя книгу, вы подтверждаете, что прочли и соглашаетесь с Политикой конфиденциальности и Пользовательским соглашением</Text>
                                <Button 
                                    type="submit"
                                    className="addBook__button"
                                >
                                    Сохранить
                                </Button>
                            </Group>
                        </FormItem>
                    </form>
                }
                
                
            </Group>
        </Panel>
    );
}


export default AddBookPanel;