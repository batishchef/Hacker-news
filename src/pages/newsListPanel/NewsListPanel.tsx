import {
  Button,
  Caption,
  Group,
  Headline,
  NavIdProps,
  Panel,
  PanelHeader,
  Paragraph,
  PullToRefresh,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
import NewsPrevCell from "../../widgets/newsPrevCell/NewsPrevCell";
import { fetchFreshNewsIdList } from "../../shared/api/api";
import { error, newsIdList } from "../../shared/types/types";
import styles from "./newsListPanel.module.css";
import { shouldAddItems } from "./lib/shouldAddItems";

export const NewsListPanel: FC<NavIdProps> = ({ id }) => {
  const [newsIdList, setNewsIdList] = useState<newsIdList>([]);
  const [newsOnPageCount, setNewsOnPageCount] = useState<number>(10);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<error>({ isError: false });

  useEffect(() => {
    if (isPending) {
      fetchFreshNewsIdList(setNewsIdList, setError, setIsPending);
    }
  }, [isPending]);

  useEffect(() => {
    setInterval(async () => {
      fetchFreshNewsIdList(setNewsIdList, setError, setIsPending);
    }, 60000);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  });

  const scrollHandler = () => {
    shouldAddItems(newsOnPageCount, setNewsOnPageCount);
  };

  const handleErrorButtonClick = () => {
    setIsPending(true);
    setError({ isError: false });
  };

  if (error.isError) {
    return (
      <Panel id={id}>
        <PanelHeader className={styles.panelHeader}>
          <Title>Список новостей</Title>
        </PanelHeader>
        <PullToRefresh onRefresh={() => setIsPending(true)}>
          <Group>
            <Headline>ОШИБКА</Headline>
            <Paragraph>Сервер не отвечает</Paragraph>
            {error.message && <Caption>{error.message}</Caption>}
            <Button mode="primary" onClick={handleErrorButtonClick}>
              Перезагрузить
            </Button>
          </Group>
        </PullToRefresh>
      </Panel>
    );
  }

  if (isPending) {
    return (
      <Panel id={id}>
        <PanelHeader>
          <Title>Список новостей</Title>
        </PanelHeader>
        <Spinner size="large" />
      </Panel>
    );
  } else {
    const newsToShowList = newsIdList.slice(0, newsOnPageCount);
    const newsList = newsToShowList.map((newsId: number) => (
      <NewsPrevCell key={newsId} newsId={newsId} />
    ));

    return (
      <Panel id={id}>
        <PanelHeader>
          <Title>Список новостей</Title>
        </PanelHeader>
        <PullToRefresh onRefresh={() => setIsPending(true)}>
          <Group className={styles.group}>
            <Button mode="primary" onClick={() => setIsPending(true)}>
              Обновить
            </Button>
            {newsList}
          </Group>
        </PullToRefresh>
      </Panel>
    );
  }
};
