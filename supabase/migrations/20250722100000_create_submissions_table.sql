/*
# [Create Submissions Table]
This script creates the 'submissions' table for student writings and sets up security policies.

## Query Description:
This operation creates a new table named `submissions` to store student contributions. It also enables Row Level Security (RLS) to control data access.
- **Public Read Access:** Anyone can read submissions that have been approved (`is_approved = true`).
- **Public Write Access:** Anyone can submit a new contribution. New submissions are not approved by default.
- **Data Safety:** This is a non-destructive operation. It only adds a new table and policies.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (the table can be dropped)

## Structure Details:
- Table: `public.submissions`
- Columns: `id`, `created_at`, `name`, `title`, `content`, `is_approved`

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes. Adds policies for SELECT and INSERT.
- Auth Requirements: None for submitting, but reading is restricted to approved content.

## Performance Impact:
- Indexes: A primary key index is created on the `id` column.
- Triggers: None.
- Estimated Impact: Low.
*/

-- Create the submissions table
CREATE TABLE public.submissions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    is_approved boolean NOT NULL DEFAULT false,
    CONSTRAINT submissions_pkey PRIMARY KEY (id)
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.submissions IS 'Stores student submissions for the Antigone application.';
COMMENT ON COLUMN public.submissions.name IS 'The name of the student who submitted the text.';
COMMENT ON COLUMN public.submissions.title IS 'The title of the submitted text.';
COMMENT ON COLUMN public.submissions.content IS 'The main content of the submission.';
COMMENT ON COLUMN public.submissions.is_approved IS 'Moderation status. True if the submission is visible to the public.';


-- Enable Row Level Security (RLS) for the table
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access for approved submissions
CREATE POLICY "Allow public read access for approved submissions"
ON public.submissions
FOR SELECT
USING (is_approved = true);

-- Create a policy to allow anyone to insert new submissions
CREATE POLICY "Allow public insert for anyone"
ON public.submissions
FOR INSERT
WITH CHECK (true);
