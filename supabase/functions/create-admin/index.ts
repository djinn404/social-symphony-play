import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const email = "admin@aura-social.app";
    const password = "AuraAdmin2025!";

    // Use raw API call
    const res = await fetch(`${url}/auth/v1/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${serviceKey}`,
        "apikey": serviceKey,
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
      }),
    });

    const body = await res.text();
    console.log("Response:", res.status, body);

    if (!res.ok) {
      return new Response(JSON.stringify({ status: res.status, body }), { status: 400 });
    }

    const user = JSON.parse(body);

    // Create profile with service role client
    const supabase = createClient(url, serviceKey);
    await supabase.from("profiles").insert({
      id: user.id,
      username: "admin",
      display_name: "Admin Aura",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      bio: "Administrateur Aura",
    });

    return new Response(JSON.stringify({ success: true, email, password }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});
