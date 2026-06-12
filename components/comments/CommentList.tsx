import { formatRelativeTime } from "@/lib/utils";
import { t } from "@/lib/i18n/uk";
import type { CommentWithProfile } from "@/types/database";

interface CommentListProps {
  comments: CommentWithProfile[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className="text-sm text-muted-foreground">{t("deals.noComments")}</p>;
  }

  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li key={comment.id} className="rounded-lg border p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-medium text-sm">
              {comment.profile?.username ?? "Анонім"}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(comment.created_at)}
            </span>
          </div>
          <p className="text-sm whitespace-pre-wrap">{comment.body}</p>
        </li>
      ))}
    </ul>
  );
}
