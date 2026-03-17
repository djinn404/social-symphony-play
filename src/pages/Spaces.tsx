import { motion } from "framer-motion";
import { useState } from "react";
import { Hash, Volume2, ChevronDown, Plus, Settings, Users, Mic, Headphones, Lock, Megaphone, Menu } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import AppLayout from "@/components/layout/AppLayout";
import CreateChannelModal from "@/components/spaces/CreateChannelModal";

interface Channel {
  id: string;
  name: string;
  type: "text" | "voice" | "announcement";
  unread?: number;
  locked?: boolean;
}

interface Category {
  name: string;
  channels: Channel[];
}

const initialCategories: Category[] = [
  {
    name: "INFORMATIONS",
    channels: [
      { id: "c1", name: "règles", type: "announcement", locked: true },
      { id: "c2", name: "annonces", type: "announcement" },
    ],
  },
  {
    name: "GÉNÉRAL",
    channels: [
      { id: "c3", name: "discussion", type: "text", unread: 24 },
      { id: "c4", name: "présentations", type: "text" },
      { id: "c5", name: "partage", type: "text", unread: 8 },
    ],
  },
  {
    name: "VOCAL",
    channels: [
      { id: "c6", name: "Lounge", type: "voice" },
      { id: "c7", name: "Collaboration", type: "voice" },
      { id: "c8", name: "Stream", type: "voice" },
    ],
  },
  {
    name: "PROJETS",
    channels: [
      { id: "c9", name: "feedback", type: "text", unread: 3 },
      { id: "c10", name: "showcase", type: "text" },
      { id: "c11", name: "ressources", type: "text" },
    ],
  },
];

const onlineMembers = [
  { name: "Nova FX", status: "En stream", avatar: avatar1 },
  { name: "Kira", status: "En ligne", avatar: avatar1 },
  { name: "Cyber Lab", status: "En vocal", avatar: avatar1 },
  { name: "Earth Views", status: "En ligne", avatar: avatar1 },
  { name: "Pixel Art", status: "Absent", avatar: avatar1 },
];

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

const mockMessages: Message[] = [
  { id: "m1", author: "Nova FX", avatar: avatar1, content: "Quelqu'un a testé le nouveau Figma update ?", time: "14:23" },
  { id: "m2", author: "Kira", avatar: avatar1, content: "Oui ! Les nouvelles variables sont incroyables 🔥", time: "14:25" },
  { id: "m3", author: "Cyber Lab", avatar: avatar1, content: "Je suis en train de migrer tout mon design system dessus", time: "14:28" },
  { id: "m4", author: "Nova FX", avatar: avatar1, content: "Tu pourrais partager ton workflow ? Ça m'intéresse", time: "14:30" },
  { id: "m5", author: "Earth Views", avatar: avatar1, content: "Les auto-layout sont aussi bien améliorés, regardez cette preview", time: "14:32" },
];

function getChannelIcon(type: string, size = 14) {
  if (type === "voice") return <Volume2 size={size} className="flex-shrink-0" />;
  if (type === "announcement") return <Megaphone size={size} className="flex-shrink-0" />;
  return <Hash size={size} className="flex-shrink-0" />;
}

export default function SpacesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeChannel, setActiveChannel] = useState("c3");
  const [showMembers, setShowMembers] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const allChannels = categories.flatMap((c) => c.channels);
  const currentChannel = allChannels.find((ch) => ch.id === activeChannel);
  const categoryNames = categories.map((c) => c.name);

  const handleCreateChannel = (data: { name: string; type: "text" | "voice" | "announcement"; category: string; isPrivate: boolean }) => {
    const newChannel: Channel = {
      id: `c${Date.now()}`,
      name: data.name,
      type: data.type,
      locked: data.isPrivate,
    };

    setCategories((prev) => {
      const existing = prev.find((c) => c.name === data.category);
      if (existing) {
        return prev.map((c) =>
          c.name === data.category
            ? { ...c, channels: [...c.channels, newChannel] }
            : c
        );
      }
      return [...prev, { name: data.category, channels: [newChannel] }];
    });

    setActiveChannel(newChannel.id);
  };

  const channelList = (
    <>
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {categories.map((cat) => (
          <div key={cat.name} className="mb-3">
            <div className="flex items-center justify-between px-1 mb-1 group">
              <div className="flex items-center gap-1">
                <ChevronDown size={10} className="text-muted-foreground" />
                <span className="text-[10px] font-semibold text-muted-foreground tracking-wider">{cat.name}</span>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity"
              >
                <Plus size={12} />
              </button>
            </div>
            {cat.channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => { setActiveChannel(ch.id); setShowMobileSidebar(false); }}
                className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-[13px] transition-colors ${
                  activeChannel === ch.id
                    ? "bg-surface-active text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
                }`}
              >
                {getChannelIcon(ch.type)}
                <span className="truncate">{ch.name}</span>
                {ch.locked && <Lock size={10} className="ml-auto text-muted-foreground" />}
                {ch.unread && (
                  <span className="ml-auto text-[10px] bg-accent text-accent-foreground px-1.5 rounded-full font-medium">
                    {ch.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-border/30">
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] text-muted-foreground hover:text-foreground hover:bg-surface/50 transition-colors"
        >
          <Plus size={14} />
          <span>Créer un salon</span>
        </button>
      </div>
    </>
  );

  return (
    <AppLayout>
      <div className="flex h-full">
        {/* Desktop channel sidebar */}
        <div className="w-[220px] bg-surface/50 border-r border-border/30 hidden md:flex flex-col">
          <div className="h-12 flex items-center justify-between px-3 border-b border-border/30">
            <h2 className="text-sm font-semibold text-foreground truncate">Design Hub</h2>
            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
          {channelList}
          <div className="p-2 border-t border-border/30 flex items-center gap-2">
            <div className="relative">
              <img src={avatar1} alt="" className="w-7 h-7 rounded-full object-cover" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-online rounded-full border-2 border-surface" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-foreground truncate">You</p>
              <p className="text-[9px] text-muted-foreground">En ligne</p>
            </div>
            <div className="flex gap-1">
              <button className="text-muted-foreground hover:text-foreground"><Mic size={14} /></button>
              <button className="text-muted-foreground hover:text-foreground"><Headphones size={14} /></button>
              <button className="text-muted-foreground hover:text-foreground"><Settings size={14} /></button>
            </div>
          </div>
        </div>

        {/* Mobile sidebar overlay */}
        {showMobileSidebar && (
          <>
            <div className="fixed inset-0 bg-background/60 z-40 md:hidden" onClick={() => setShowMobileSidebar(false)} />
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              className="fixed left-0 top-0 bottom-0 w-[260px] bg-card z-50 flex flex-col md:hidden"
            >
              <div className="h-12 flex items-center justify-between px-3 border-b border-border/30">
                <h2 className="text-sm font-semibold text-foreground">Design Hub</h2>
                <button onClick={() => setShowMobileSidebar(false)} className="text-muted-foreground">
                  <ChevronDown size={16} className="rotate-90" />
                </button>
              </div>
              {channelList}
            </motion.div>
          </>
        )}

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <div className="h-12 flex items-center justify-between px-4 border-b border-border/30">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowMobileSidebar(true)} className="md:hidden text-muted-foreground hover:text-foreground">
                <Menu size={18} />
              </button>
              {getChannelIcon(currentChannel?.type || "text", 16)}
              <span className="text-sm font-medium text-foreground">{currentChannel?.name || "discussion"}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="text-muted-foreground hover:text-accent transition-colors"
                title="Créer un salon"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => setShowMembers(!showMembers)}
                className={`text-muted-foreground hover:text-foreground transition-colors ${showMembers ? "text-foreground" : ""}`}
              >
                <Users size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 group hover:bg-surface/30 -mx-2 px-2 py-1 rounded-md transition-colors"
                  >
                    <img src={msg.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[13px] font-semibold text-foreground">{msg.author}</span>
                        <span className="font-mono-utility text-[10px] text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-[13px] text-foreground/90 leading-relaxed">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-3 border-t border-border/30">
                <div className="flex items-center gap-2 bg-surface rounded-xl px-3 py-2">
                  <Plus size={18} className="text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={`Envoyer un message dans #${currentChannel?.name || "discussion"}`}
                    className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none"
                  />
                </div>
              </div>
            </div>

            {showMembers && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                className="border-l border-border/30 overflow-hidden hidden md:block"
              >
                <div className="p-3">
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wider mb-2">
                    EN LIGNE — {onlineMembers.length}
                  </p>
                  {onlineMembers.map((m) => (
                    <div key={m.name} className="flex items-center gap-2 py-1.5 px-1 rounded-md hover:bg-surface/50 transition-colors">
                      <div className="relative">
                        <img src={m.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-online rounded-full border border-background" />
                      </div>
                      <div>
                        <p className="text-[12px] text-foreground">{m.name}</p>
                        <p className="text-[10px] text-muted-foreground">{m.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <CreateChannelModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        categories={categoryNames}
        onCreateChannel={handleCreateChannel}
      />
    </AppLayout>
  );
}
