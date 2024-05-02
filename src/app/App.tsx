import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, Header } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { DEFAULT_VIEW_PANELS } from './routes/routes';
import { NewsListPanel } from '../pages/newsListPanel/NewsListPanel';
import { NewsPanel } from '../pages/newsPanel/NewsPanel';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.NEWSLIST } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  // const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);
  const [popout, setPopout] = useState<ReactNode | null>(null);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <NewsListPanel id="newsList" />
          <NewsPanel id="news/:newsId" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
