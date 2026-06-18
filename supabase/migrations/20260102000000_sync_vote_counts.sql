-- Keep deals.hot_count / cold_count in sync when users vote.
-- Runs as SECURITY DEFINER so regular users don't need UPDATE on deals (RLS).

CREATE OR REPLACE FUNCTION public.sync_deal_vote_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'hot' THEN
      UPDATE public.deals SET hot_count = hot_count + 1 WHERE id = NEW.deal_id;
    ELSE
      UPDATE public.deals SET cold_count = cold_count + 1 WHERE id = NEW.deal_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'hot' THEN
      UPDATE public.deals SET hot_count = GREATEST(0, hot_count - 1) WHERE id = OLD.deal_id;
    ELSE
      UPDATE public.deals SET cold_count = GREATEST(0, cold_count - 1) WHERE id = OLD.deal_id;
    END IF;
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.vote_type = NEW.vote_type THEN
      RETURN NEW;
    END IF;
    IF OLD.vote_type = 'hot' THEN
      UPDATE public.deals
      SET hot_count = GREATEST(0, hot_count - 1), cold_count = cold_count + 1
      WHERE id = NEW.deal_id;
    ELSE
      UPDATE public.deals
      SET cold_count = GREATEST(0, cold_count - 1), hot_count = hot_count + 1
      WHERE id = NEW.deal_id;
    END IF;
    RETURN NEW;
  END IF;

  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS votes_sync_deal_counts ON public.votes;

CREATE TRIGGER votes_sync_deal_counts
  AFTER INSERT OR UPDATE OR DELETE ON public.votes
  FOR EACH ROW EXECUTE FUNCTION public.sync_deal_vote_counts();

-- Repair counts from existing vote rows (safe to re-run).
UPDATE public.deals d
SET
  hot_count = COALESCE((
    SELECT COUNT(*)::int FROM public.votes v
    WHERE v.deal_id = d.id AND v.vote_type = 'hot'
  ), 0),
  cold_count = COALESCE((
    SELECT COUNT(*)::int FROM public.votes v
    WHERE v.deal_id = d.id AND v.vote_type = 'cold'
  ), 0);
