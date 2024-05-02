import {
  Group,
  Headline,
  SimpleCell,
} from "@vkontakte/vkui";
import { Comment } from "../../entities/comment/Comment";
import styles from './commentsSection.module.css'

export type CommentsSectionProps = {
  rootComments: Array<number> | null;
};

export const CommentsSection = ({ rootComments }: CommentsSectionProps) => {

  if (rootComments === null) {
    return <SimpleCell>Комментариев нет</SimpleCell>;
  } else {
    const commentsTree = rootComments.map((comment) => (
      <Comment key={comment} commentId={comment} />
    ));
    return (
      <Group className={styles.commentsSection}>
        {commentsTree}
      </Group>
    );
  }
};
