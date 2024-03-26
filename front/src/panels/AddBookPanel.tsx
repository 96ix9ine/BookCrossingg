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
    CustomSelect
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


const AddBookPanel = (): JSX.Element => {
    const routeNavigator = useRouteNavigator();
    const genres = ["Комиксы", "Манга", "Фэнтези", "Романтика", "Драма", "Детективы", "История", "Ужасы"];

    return (
        <Panel>
            <Div>
                <AddBookPanelHeaderComponent />
                
                <div className="container input__wrapper">
                    <div className="top">
                        <Title className="input__title" level="2">Адрес</Title>
                        <Cell onClick={() => {}} className="cellbutton">
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
                        type="text"
                        placeholder="Введите название"
                    />
                </div>

                <div className="container input__wrapper">
                    <Title className="input__title bottom__title" level="2">Автор</Title>
                    <Input
                        className="input"
                        type="text"
                        placeholder="Введите автора"
                    />
                </div>

                <div className="container input__wrapper">
                    <Title className="input__title bottom__title" level="2">Описание книги</Title>
                    <Input
                        className="input"
                        type="text"
                        placeholder="Введите описание книги"
                    />
                </div>

                <div className="container input__wrapper">
                    {/* <CustomSelect
                        id="administrator-select-id"
                        placeholder="Не выбран"
                        allowClearButton
                    /> */}
                </div>
            </Div>
            <TabbarComponent/>
        </Panel>
    );
}


export default AddBookPanel;