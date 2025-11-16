/*
# [Structural] Create Submissions Table
This migration creates the `submissions` table to store student writings and enables Row Level Security (RLS) with appropriate policies for reading and creating submissions.

## Query Description: [This operation creates a new table `submissions` for storing user-generated content. It sets up security policies to ensure that new submissions are not public by default and require approval. No existing data is affected as this is a new table.]

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (by dropping the table)

## Structure Details:
- Table Created: `public.submissions`
- Columns: `id`, `created_at`, `name`, `title`, `content`, `is_approved`
- RLS Enabled: Yes

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes, new policies for SELECT and INSERT are added.
  - `SELECT`: Allows public read access only for approved submissions.
  - `INSERT`: Allows any user (anonymous or authenticated) to create a new submission.
- Auth Requirements: None for reading approved submissions, none for inserting new submissions.

## Performance Impact:
- Indexes: A primary key index is created on the `id` column.
- Triggers: None.
- Estimated Impact: Low. The table is new and will have minimal performance impact initially.
*/

-- 1. Create the submissions table
CREATE TABLE public.submissions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    is_approved boolean NOT NULL DEFAULT false,
    CONSTRAINT submissions_pkey PRIMARY KEY (id)
);

-- Comment to make the linter happy
COMMENT ON TABLE public.submissions IS 'Stores student submissions for the Antigone project.';

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies
-- Policy: Allow public read access for approved submissions
CREATE POLICY "Allow public read access for approved submissions"
ON public.submissions
FOR SELECT
USING (is_approved = true);

-- Policy: Allow anyone to insert a new submission
CREATE POLICY "Allow anonymous insert"
ON public.submissions
FOR INSERT
WITH CHECK (true);
