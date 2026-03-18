import { motion } from "framer-motion";
import { Settings, Grid3x3, Bookmark, Play, Link as LinkIcon, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import avatar1 from "@/assets/avatar-1.jpg";
import feed1 from "@/assets/feed-1.jpg";
import feed2 from "@/assets/feed-2.jpg";
import feed3 from "@/assets/feed-3.jpg";
import AppLayout from "@/components/layout/AppLayout";
import ThemeToggle from "@/components/ThemeToggle";

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
      <div className="max-w-xl mx-auto pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-12 border-b border-border">
          <span className="text-sm font-semibold text-foreground">{profileData.handle}</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* Profile info */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start gap-4">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-[76px] h-[76px] rounded-2xl object-cover ring-2 ring-border"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground tracking-tight">
                  {profileData.name}
                </h1>
                {profileData.verified && (
                  <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </div>

              <div className="flex gap-4 mt-2">
                <StatItem value={profileData.posts} label="posts" />
                <StatItem value={profileData.followers} label="followers" />
                <StatItem value={profileData.following} label="following" />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4">
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-surface-hover rounded-xl px-3.5 py-2.5 text-[13px] text-foreground outline-none resize-none border border-border focus:border-accent/50 transition-colors"
                  rows={3}
                  maxLength={160}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-1.5 rounded-xl bg-accent text-accent-foreground text-xs font-medium chrome-btn"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => { setBio(profileData.bio); setIsEditing(false); }}
                    className="px-4 py-1.5 rounded-xl chrome-glass text-foreground text-xs"
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
          <div className="flex gap-2 mt-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsEditing(true)}
              className="flex-1 py-2 rounded-xl chrome-glass chrome-btn text-foreground text-xs font-medium"
            >
              Modifier le profil
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              className="flex-1 py-2 rounded-xl chrome-glass chrome-btn text-foreground text-xs font-medium"
            >
              Partager le profil
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
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

        {/* Grid */}
        <div className="grid grid-cols-3 gap-1 p-2">
          {postGrid.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03 }}
              className="aspect-square relative group cursor-pointer rounded-xl overflow-hidden"
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm rounded-xl">
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
