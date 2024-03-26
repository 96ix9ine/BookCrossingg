import { 
    PanelHeader, 
    Text, 
    Group,
    CellButton,
    Cell,
    PanelHeaderBack,
    PanelHeaderButton
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon28ArrowLeftOutline } from "@vkontakte/icons";


const AddBookPanelHeaderComponent = (): JSX.Element => {
    const router = useRouteNavigator();


    return (
        <PanelHeader
            className="addBook__panelheader"
            before={
                <Icon28ArrowLeftOutline style={{paddingLeft: 5}} onClick={() => router.back()}/>
            }
        >
            <Group className="group">
                <Text
                    className="panelheader__title"
                >
                    Добавить книгу
                </Text>
                <CellButton
                    onClick={() => {}} 
                    className="cellbutton"
                >
                    <Text className="cellbutton__text">Очистить</Text>
                </CellButton>
            </Group>
        </PanelHeader>
    )
}


export default AddBookPanelHeaderComponent;