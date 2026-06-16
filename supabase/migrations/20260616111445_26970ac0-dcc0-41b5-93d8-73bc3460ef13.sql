DROP POLICY IF EXISTS "Authenticated users can delete chat logs" ON public.chat_logs;
DROP POLICY IF EXISTS "Authenticated users can update owner replies" ON public.chat_logs;
DROP POLICY IF EXISTS "Authenticated can update" ON public.owner_status;

CREATE POLICY "Signed-in owners can delete chat logs"
ON public.chat_logs
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Signed-in owners can update owner replies"
ON public.chat_logs
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Signed-in owners can update online status"
ON public.owner_status
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);