import vkBridge, { parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge';
import { useAdaptivity, useAppearance, useInsets } from '@vkontakte/vk-bridge-react';
import { AdaptivityProvider, ConfigProvider, AppRoot } from '@vkontakte/vkui';
import { RouterProvider, createHashRouter } from '@vkontakte/vk-mini-apps-router';
import '@vkontakte/vkui/dist/vkui.css';

import { transformVKBridgeAdaptivity } from './utils';
import { App } from './App';

export const AppConfig = () => {
  const vkBridgeAppearance = useAppearance() || undefined;
  const vkBridgeInsets = useInsets() || undefined;
  const adaptivity = transformVKBridgeAdaptivity(useAdaptivity());
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(window.location.search);

  // Указываем пути для панелей
  const router = createHashRouter([
    {
      path: '/',
      panel: 'home_panel',
      view: 'default_view',
    },
    {
      path: 'map',
      panel: 'map_panel',
      view: 'default_view',
    },
    {
      path: 'mapTabbar',
      panel: 'mapTabbar_panel',
      view: 'default_view',
    },
    {
      path: 'aboutbook',
      panel: 'aboutbook_panel',
      view: 'default_view',
    },
    {
      path: 'profile',
      panel: 'profile_panel',
      view: 'default_view',
    },
    {
      path: 'addbook',
      panel: 'addbook_panel',
      view: 'default_view',
    }
  ])

  return (
    <ConfigProvider
      appearance={vkBridgeAppearance}
      platform={vk_platform === 'desktop_web' ? 'vkcom' : undefined}
      isWebView={vkBridge.isWebView()}
      hasCustomPanelHeaderAfter={false}
    >
      <AdaptivityProvider {...adaptivity}>
        <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
