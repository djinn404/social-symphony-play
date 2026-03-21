import { motion } from "framer-motion";
import { Settings, Grid3x3, Bookmark, Play, Link as LinkIcon, MapPin, Calendar, LogOut } from "lucide-react";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const tabs = [
  { id: "posts", label: "Posts", icon: Grid3x3 },
  { id: "videos", label: "Vidéos", icon: Play },
  { id: "saved", label: "Enregistrés", icon: Bookmark },
];

export default function ProfilePage() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profile?.bio || "");
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [website, setWebsite] = useState(profile?.website || "");

  const handleSave = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ bio, display_name: displayName, location, website, updated_at: new Date().toISOString() })
      .eq("id", user.id);
    if (error) {
      toast.error("Erreur de sauvegarde");
    } else {
      toast.success("Profil mis à jour !");
      await refreshProfile();
      setIsEditing(false);
    }
  };

  const avatar = profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`;
  const joinedDate = user?.created_at ? formatDistanceToNow(new Date(user.created_at), { locale: fr, addSuffix: true }) : "";

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto pb-24">
        <div className="flex items-center justify-between px-5 h-12 border-b border-border">
          <span className="text-sm font-semibold text-foreground">@{profile?.username}</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors" title="Déconnexion">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start gap-4">
            <img src={avatar} alt="" className="w-[76px] h-[76px] rounded-2xl object-cover ring-2 ring-border" />
            <div className="flex-1">
              {isEditing ? (
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="text-lg font-bold text-foreground bg-transparent border-b border-accent/50 outline-none w-full"
                  placeholder="Nom"
                />
              ) : (
                <h1 className="text-lg font-bold text-foreground tracking-tight">
                  {profile?.display_name || profile?.username}
                </h1>
              )}
              <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
            </div>
          </div>

          <div className="mt-4">
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-muted/50 rounded-xl px-3.5 py-2.5 text-[13px] text-foreground outline-none resize-none border border-border focus:border-accent/50 transition-colors"
                  rows={3}
                  maxLength={160}
                  placeholder="Ta bio..."
                />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Localisation"
                  className="w-full bg-muted/50 rounded-xl px-3.5 py-2 text-[13px] text-foreground outline-none border border-border focus:border-accent/50 transition-colors"
                />
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Site web"
                  className="w-full bg-muted/50 rounded-xl px-3.5 py-2 text-[13px] text-foreground outline-none border border-border focus:border-accent/50 transition-colors"
                />
                <div className="flex gap-2">
                  <button onClick={handleSave} className="px-4 py-1.5 rounded-xl bg-accent text-accent-foreground text-xs font-medium chrome-btn">
                    Sauvegarder
                  </button>
                  <button onClick={() => setIsEditing(false)} className="px-4 py-1.5 rounded-xl chrome-glass text-foreground text-xs">
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-[13px] text-foreground leading-relaxed">{profile?.bio || "Pas encore de bio"}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                  {profile?.location && (
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin size={11} /> {profile.location}
                    </span>
                  )}
                  {profile?.website && (
                    <span className="flex items-center gap-1 text-[11px] text-accent">
                      <LinkIcon size={11} /> {profile.website}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Calendar size={11} /> Rejoint {joinedDate}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsEditing(true)}
              className="flex-1 py-2 rounded-xl chrome-glass chrome-btn text-foreground text-xs font-medium"
            >
              Modifier le profil
            </motion.button>
          </div>
        </div>

        <div className="flex border-b border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs transition-colors relative ${
                  activeTab === tab.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="profile-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-8 text-center text-muted-foreground text-xs">
          {activeTab === "posts" && "Tes posts apparaîtront ici"}
          {activeTab === "videos" && "Tes vidéos apparaîtront ici"}
          {activeTab === "saved" && "Tes posts enregistrés apparaîtront ici"}
        </div>
      </div>
    </AppLayout>
  );
}
