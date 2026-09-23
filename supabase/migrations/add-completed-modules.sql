-- Run once if training_progress already existed without completed_modules
alter table public.training_progress
  add column if not exists completed_modules text[] not null default '{}';

-- Optional: treat legacy single-timestamp completions as all five modules done
update public.training_progress
set completed_modules = array['module-1','module-2','module-3','module-4','module-5']
where peer_basics_completed_at is not null
  and (completed_modules is null or completed_modules = '{}');
