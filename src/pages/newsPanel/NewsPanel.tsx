import { Icon24Back } from "@vkontakte/icons";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Caption,
  Group,
  Headline,
  IconButton,
  Link,
  NavIdProps,
  Panel,
  PanelHeader,
  PullToRefresh,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
import { NewsData } from "../../shared/types/types";
import { fetchNewsData } from "../../shared/api/api";
import styles from "./newsPanel.module.css";
import { CommentsSection } from "../../widgets/comments/CommentsSection";

export const NewsPanel: FC<NavIdProps> = ({ id }) => {
  const [isPending, setIsPending] = useState<boolean>(true);
  const [newsData, setNewsData] = useState<NewsData>();

  const routeNavigator = useRouteNavigator();

  const { newsId } = useParams<"newsId">();

  useEffect(() => {
    if (isPending) {
      fetchNewsData(newsId, setNewsData, setIsPending);
    }
  }, [newsData, isPending]);

  if (!isPending && newsData !== undefined) {
    const date =
      newsData.time === undefined
        ? undefined
        : new Date(newsData.time * 1000).toLocaleDateString();

    return (
      <Panel id={id} className={styles.panel}>
        <PanelHeader
          before={
            <IconButton onClick={() => routeNavigator.push(`/`)} aria-label="Назад">
              <Icon24Back />
            </IconButton>
          }
        >
          Назад
        </PanelHeader>
        <PullToRefresh onRefresh={() => setIsPending(true)}>
          <Group className={styles.newsBody}>
            <Title>{newsData?.title}</Title>
            <Headline>Автор: {newsData?.by}</Headline>
            <Caption>{date}</Caption>
            <Link href={newsData?.url}>Посмотреть новость</Link>
            <Title>Комментарии</Title>
            <CommentsSection
              rootComments={newsData.kids ? newsData.kids : null}
            />
          </Group>
        </PullToRefresh>
      </Panel>
    );
  } else {
    return (
      <Panel id={id}>
        <PanelHeader
          before={
            <IconButton onClick={() => routeNavigator.push(`/`)} aria-label="Назад">
              <Icon24Back />
            </IconButton>
          }
        >
          Назад
        </PanelHeader>
        <Group>
          <Spinner size="large"></Spinner>
        </Group>
      </Panel>
    );
  }
};
