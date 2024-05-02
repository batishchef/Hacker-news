import {
  Caption,
  Group,
  Headline,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import React from "react";
import { useEffect, useState } from "react";
import { NewsData, newsPrevCellProps } from "../../shared/types/types";
import { fetchNewsData } from "../../shared/api/api";
import styles from './newsPrevCell.module.css'
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

const NewsPrevCell = ({ newsId }: newsPrevCellProps) => {
  const [data, setData] = useState<NewsData>();
  const [isPending, setIsPending] = useState<boolean>(true);

  const routeNavigator = useRouteNavigator();


  useEffect(() => {
    fetchNewsData(newsId, setData, setIsPending)
  }, [data]);

  if (!isPending && data !== undefined) {
    const date = data.time !== undefined ? new Date(data.time * 1000).toLocaleDateString() : undefined

    return (
      <Group className={styles.group} onClick={() => routeNavigator.push(`news/${newsId}`)}>
          <Title className={styles.title}>{data.title}</Title>
          <Headline className={styles.rating}>Рейтинг: {data.score}</Headline>
          {data.time !== undefined && <Headline className={styles.author}>Автор: {data.by}</Headline>}
          <Caption className={styles.date}>Дата публикации: {date}</Caption>
      </Group>
    );
  } else {
    return (
      <Group>
          <Spinner size="medium" />
      </Group>
    );
  }
};

export default React.memo(NewsPrevCell);
