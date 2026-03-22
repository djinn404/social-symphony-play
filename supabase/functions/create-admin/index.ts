import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const email = "admin@aura-social.app";
    const password = "AuraAdmin2025!";

    // Create user without trigger dependency
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    // Manually create profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      username: "admin",
      display_name: "Admin Aura",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      bio: "Administrateur de la plateforme Aura",
    });

    if (profileError) {
      return new Response(JSON.stringify({ error: profileError.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, email, password, user_id: data.user.id }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ caught: e.message }), { status: 500 });
  }
});
