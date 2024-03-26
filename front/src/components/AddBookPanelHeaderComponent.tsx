import { 
    PanelHeader, 
    Text, 
    Group,
    CellButton,
    Cell,
    PanelHeaderBack
} from "@vkontakte/vkui";
import { useRouteNavigator }from '@vkontakte/vk-mini-apps-router'


const AddBookPanelHeaderComponent = (): JSX.Element => {
    const router = useRouteNavigator();
    return (
        <PanelHeader className="addBook__panelheader" before={<PanelHeaderBack onClick={() => router.back()}/>}>
            <Group className="group">
                <Text
                    className="panelheader__title"
                >
                    Добавить книгу
                </Text>
                <Cell
                    onClick={() => {}} 
                    className="cellbutton"
                >
                    <Text className="cellbutton__text">Очистить</Text>
                </Cell>
            </Group>
        </PanelHeader>
    )
}


export default AddBookPanelHeaderComponent;