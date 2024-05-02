import {
  Button,
  Caption,
  Group,
  Paragraph,
  SimpleCell,
  Title,
} from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import { comment, commentProps, error } from "../../shared/types/types";
import { fetchComment } from "../../shared/api/api";
import { CommentsSection } from "../../widgets/comments/CommentsSection";
import styles from './comment.module.css'

export const Comment = ({ commentId }: commentProps) => {
  const [comment, setComment] = useState<comment>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [isKidsShown, setIsKidsShown] = useState<boolean>(false);
  const [error, setError] = useState<error>();

  useEffect(() => {
    fetchComment(commentId, setComment, setError, setIsPending);
  });

  if(error?.isError) {
    return <SimpleCell>ОШИБКА: не удалось загрузить комментарий</SimpleCell>
  }

  if (!isPending && comment !== undefined && comment.hasOwnProperty('text')) {
    if (isKidsShown) {
      const date =
        comment.time === undefined
          ? undefined
          : new Date(comment.time * 1000).toLocaleDateString();
      return (
        <Group className={styles.container}>
          {comment.by !== undefined && <Title>Автор: {comment.by}</Title>}
          {date !== undefined && <Caption>{date}</Caption>}
          <Paragraph className={styles.mainText}>{comment.text}</Paragraph>
          {comment.kids !== undefined && (
            <CommentsSection rootComments={comment.kids} />
          )}
        </Group>
      );
    } else {
      const date =
        comment.time === undefined
          ? undefined
          : new Date(comment.time * 1000).toLocaleDateString();
      return (
        <Group className={styles.container}>
          {comment.by !== undefined && <Title>Автор: {comment.by}</Title>}
          {date !== undefined && <Caption>{date}</Caption>}
          <Paragraph>{comment.text}</Paragraph>
          {comment.kids !== undefined && (
            <Button onClick={() => setIsKidsShown(true)}>Ответы</Button>
          )}
        </Group>
      );
    }
  } else {
    return <SimpleCell></SimpleCell>
  }
};
