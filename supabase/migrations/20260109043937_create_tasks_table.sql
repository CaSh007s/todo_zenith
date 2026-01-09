create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  title text not null,
  description text,
  status text default 'todo' check (status in ('todo', 'in-progress', 'done')),
  priority text default 'medium' check (priority in ('low', 'medium', 'high')),
  due_date timestamp with time zone,
  tags text[] default '{}',
  position integer default 0, -- For drag and drop ordering
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) so users only see their own tasks
alter table public.tasks enable row level security;

-- Policy: Users can view their own tasks
create policy "Users can view their own tasks" 
on public.tasks for select 
using (auth.uid() = user_id);

-- Policy: Users can insert their own tasks
create policy "Users can insert their own tasks" 
on public.tasks for insert 
with check (auth.uid() = user_id);

-- Policy: Users can update their own tasks
create policy "Users can update their own tasks" 
on public.tasks for update 
using (auth.uid() = user_id);

-- Policy: Users can delete their own tasks
create policy "Users can delete their own tasks" 
on public.tasks for delete 
using (auth.uid() = user_id);