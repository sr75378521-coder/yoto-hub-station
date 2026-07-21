-- Updated-at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Yoto connections
CREATE TABLE public.yoto_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  yoto_user_id text,
  access_token_ciphertext text NOT NULL,
  refresh_token_ciphertext text NOT NULL,
  scope text,
  token_type text,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.yoto_connections TO authenticated;
GRANT ALL ON public.yoto_connections TO service_role;
ALTER TABLE public.yoto_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own yoto connection" ON public.yoto_connections
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own yoto connection" ON public.yoto_connections
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own yoto connection" ON public.yoto_connections
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own yoto connection" ON public.yoto_connections
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER trg_yoto_connections_updated_at
  BEFORE UPDATE ON public.yoto_connections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- OAuth transient state
CREATE TABLE public.yoto_oauth_states (
  state text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code_verifier text NOT NULL,
  redirect_to text,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '15 minutes'),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.yoto_oauth_states TO authenticated;
GRANT ALL ON public.yoto_oauth_states TO service_role;
ALTER TABLE public.yoto_oauth_states ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own oauth state" ON public.yoto_oauth_states
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX yoto_oauth_states_expires_idx ON public.yoto_oauth_states(expires_at);
