import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const email = "admin@aura-social.app";
    const password = "AuraAdmin2025!";

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { username: "admin", display_name: "Admin Aura" },
    });

    if (error) {
      console.error("Auth error:", JSON.stringify(error));
      return new Response(JSON.stringify({ error: error.message, code: error.status }), { status: 400 });
    }

    console.log("User created:", data.user.id);
    return new Response(JSON.stringify({ success: true, user_id: data.user.id, email }), { status: 200 });
  } catch (e) {
    console.error("Caught:", e.message);
    return new Response(JSON.stringify({ caught: e.message }), { status: 500 });
  }
});
