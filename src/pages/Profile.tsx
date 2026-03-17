import { motion } from "framer-motion";
import { Settings, Grid3x3, Bookmark, Play, Link as LinkIcon, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import avatar1 from "@/assets/avatar-1.jpg";
import feed1 from "@/assets/feed-1.jpg";
import feed2 from "@/assets/feed-2.jpg";
import feed3 from "@/assets/feed-3.jpg";
import AppLayout from "@/components/layout/AppLayout";

const profileData = {
  name: "Nova FX",
  handle: "@nova.fx",
  avatar: avatar1,
  verified: true,
  bio: "Créateur de contenu visuel · Motion designer · J'explore les frontières entre technologie et art 🌌",
  location: "Tokyo, Japan",
  website: "novafx.studio",
  joined: "Mars 2024",
  followers: "24.3k",
  following: "892",
  posts: "1,247",
};

const tabs = [
  { id: "posts", label: "Posts", icon: Grid3x3 },
  { id: "videos", label: "Vidéos", icon: Play },
  { id: "saved", label: "Enregistrés", icon: Bookmark },
];

const postGrid = [feed1, feed2, feed3, feed1, feed2, feed3, feed1, feed2, feed3];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profileData.bio);

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto pb-20">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-12 border-b border-border/30">
          <span className="text-sm font-semibold text-foreground">{profileData.handle}</span>
          <button className="text-muted-foreground hover:text-foreground">
            <Settings size={18} />
          </button>
        </div>

        {/* Profile info */}
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-start gap-4">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-[72px] h-[72px] rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                  {profileData.name}
                </h1>
                {profileData.verified && (
                  <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </div>

              {/* Stats row */}
              <div className="flex gap-4 mt-2">
                <StatItem value={profileData.posts} label="posts" />
                <StatItem value={profileData.followers} label="followers" />
                <StatItem value={profileData.following} label="following" />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-3">
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-surface rounded-lg px-3 py-2 text-[13px] text-foreground outline-none resize-none border border-border/30 focus:border-accent/50"
                  rows={3}
                  maxLength={160}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 rounded-lg bg-accent text-accent-foreground text-xs font-medium"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => { setBio(profileData.bio); setIsEditing(false); }}
                    className="px-3 py-1 rounded-lg bg-surface text-foreground text-xs"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[13px] text-foreground leading-relaxed">{bio}</p>
            )}

            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <MapPin size={11} /> {profileData.location}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-accent">
                <LinkIcon size={11} /> {profileData.website}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Calendar size={11} /> Rejoint {profileData.joined}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 py-1.5 rounded-lg bg-surface text-foreground text-xs font-medium shadow-aura hover:shadow-aura-hover transition-all"
            >
              Modifier le profil
            </button>
            <button className="flex-1 py-1.5 rounded-lg bg-surface text-foreground text-xs font-medium shadow-aura hover:shadow-aura-hover transition-all">
              Partager le profil
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/30">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs transition-colors relative ${
                  activeTab === tab.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="profile-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                    transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-0.5 p-0.5">
          {postGrid.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="aspect-square relative group cursor-pointer"
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-foreground text-xs font-medium">♥ 2.4k</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <span className="text-sm font-bold text-foreground">{value}</span>
      <span className="text-[11px] text-muted-foreground ml-1">{label}</span>
    </div>
  );
}
