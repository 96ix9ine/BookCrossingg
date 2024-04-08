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
    RadioProps
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import "../styles/AddBookPanel/AddBook.scss";
import { 
    Icon12ChevronOutline, 
    Icon28AddOutline,
    Icon28ArrowLeftOutline
} from "@vkontakte/icons";
import { useCallback, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { $books } from "../store/addBook";
import { createBookFx, handleCreateBook, handleImageUpload } from "../api/addBookApi";
import { IBook, IDataState } from "../interfaces/interface";
import { $userServerStore, $user } from "../store/user";
import axios from "axios";
import { initialState } from "../constatns/FormDataConstant";
import { getUserIdFx } from "../api/addUserApi";


const AddBookPanel = (): JSX.Element => {
    const routeNavigator = useRouteNavigator();
    const [bookImageFile, setBookImageFile] = useState<any | null>(null);

    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [images, setImages] = useState<any>([]);
    const [done, setDone] = useState<boolean>(false);

    const userServer = useUnit($userServerStore);
    const userVk = useUnit($user);

    const [bufferId, setBufferId] = useState("");
    

    const [formData, setFormData] = useState<IDataState>(initialState);
    const [go, setGo] = useState({
        start: false,
        bookId: '',
    });


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


    // const handleImageUpload = (event: any) => {
    //     const file = event.target.files[0];
    //     const imageURL = URL.createObjectURL(file);
    //     setImageUrl(imageURL);
    // }


    const handleSubmit = useCallback(async () => {
        console.log(userServer);
        console.log(userVk?.id);
        let user_Id: string = "";

        if (userVk != null) {
            user_Id = await getUserIdFx(userVk.id);
        }

        // console.log(`${user_Id.id} userId`);

        const result = await handleCreateBook(user_Id, formData);

        if (result.id !== '') {
            setGo({
                start: true,
                bookId: result.id
            })
        }

        // console.log(result.id)

        setDone(true);
    }, [formData, userServer])


    const handleImageChange = (event: any) => {
        const files = event.target.files;
        setSelectedImages([...selectedImages, ...files]);
    };


    const handleChangeValue = (e: any, field: keyof IDataState) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };


    const getUserImages = async (bookId: string) => {
        try {
            const response = await axios.get('http://localhost:3000/user/' + bookId +'/images');
            console.log(response);
            setImages(response.data)
        } 
        
        catch (error) {
            console.error(error);
        }
    } 


    useEffect(() => {
        // handleImageUpload(selectedImages, go.bookId);
    }, [selectedImages]);


    const resetBookData = () => {
        setFormData(initialState);
    }


    const addBook = async () => {
        const userid = userServer?.userId.toString();

        const newBook: IBook = {
            title: formData.title,
            author: formData.author,
            description: formData.description,
            genre: formData.genre,
            dealType: formData.dealType,
            damageLevel: formData.damageLevel,
            userId: userid
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
                                        bookImageFile 
                                        ? 
                                            images.map((image: any, id: any) => {
                                                return <img key={id} src={'http://localhost:3000/' + image.path}/>
                                            })
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
                            <Group>
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

            <Footer>
                
            </Footer>
        </Panel>
    );
}


export default AddBookPanel;