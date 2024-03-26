import {Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import '../styles/Components.scss';

export const CatalogPanel = () => {
    const router = useRouteNavigator();

    return (
        <Panel>
            <PanelHeader before={<PanelHeaderBack onClick={() => router.back()}/>}>Каталог</PanelHeader>
        </Panel>
    )
}