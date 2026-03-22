import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const email = "admin@aura-social.app";
  const password = "AuraAdmin2025!";

  // Try to find existing user first
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const existing = existingUsers?.users?.find(u => u.email === email);
  
  if (existing) {
    return new Response(JSON.stringify({ success: true, message: "User already exists", user_id: existing.id }), { status: 200 });
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { username: "admin", display_name: "Admin Aura" },
  });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify({ success: true, user_id: data.user.id }), { status: 200 });
});
