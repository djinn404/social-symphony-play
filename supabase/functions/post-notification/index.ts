import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { post } = await req.json();

    if (!post || !post.author || (!post.text && !post.media)) {
      return new Response(
        JSON.stringify({ error: "Invalid post data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const postContent = [
      post.author?.name ? `Auteur: ${post.author.name}` : "",
      post.text ? `Contenu: ${post.text}` : "",
      post.media ? `[Contient un média: ${post.media.type || "image"}]` : "",
    ].filter(Boolean).join("\n");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Tu es un assistant IA pour le réseau social Aura. Quand un nouveau post est créé, tu génères une notification concise et engageante en français.

Règles:
- La notification doit être courte (max 80 caractères)
- Utilise un emoji pertinent au début
- Mentionne le nom de l'auteur
- Résume le sujet du post de manière accrocheuse
- Donne aussi une catégorie parmi: trending, communauté, créateur, viral, info
- Donne un score de pertinence de 1 à 10

Réponds UNIQUEMENT avec un JSON valide: {"notification": "...", "category": "...", "relevance": N}`
          },
          {
            role: "user",
            content: `Nouveau post sur Aura:\n${postContent}`
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || "";

    // Parse the AI response JSON
    let notification = { notification: "📝 Nouveau post publié!", category: "communauté", relevance: 5 };
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        notification = JSON.parse(jsonMatch[0]);
      }
    } catch {
      console.error("Failed to parse AI response:", aiContent);
    }

    return new Response(
      JSON.stringify({
        success: true,
        notification: notification.notification,
        category: notification.category,
        relevance: notification.relevance,
        postId: post.id,
        author: post.author?.name,
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("post-notification error:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
