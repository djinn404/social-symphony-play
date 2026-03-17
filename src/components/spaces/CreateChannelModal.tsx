import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Hash, Volume2, Megaphone, Lock, ChevronDown } from "lucide-react";

interface CreateChannelModalProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
  onCreateChannel: (channel: {
    name: string;
    type: "text" | "voice" | "announcement";
    category: string;
    isPrivate: boolean;
  }) => void;
}

const channelTypes = [
  {
    id: "text" as const,
    icon: Hash,
    label: "Textuel",
    desc: "Envoyer des messages, images, GIFs, émojis et plus",
  },
  {
    id: "voice" as const,
    icon: Volume2,
    label: "Vocal",
    desc: "Parler, streamer et partager son écran",
  },
  {
    id: "announcement" as const,
    icon: Megaphone,
    label: "Annonce",
    desc: "Publier des annonces importantes pour les membres",
  },
];

export default function CreateChannelModal({ open, onClose, categories, onCreateChannel }: CreateChannelModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"text" | "voice" | "announcement">("text");
  const [category, setCategory] = useState(categories[0] || "");
  const [isPrivate, setIsPrivate] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreateChannel({
      name: name.trim().toLowerCase().replace(/\s+/g, "-"),
      type,
      category,
      isPrivate,
    });
    setName("");
    setType("text");
    setIsPrivate(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[420px] bg-card rounded-2xl shadow-lg z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-1">
              <h2 className="text-base font-semibold text-foreground">Créer un salon</h2>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground px-5 mb-4">
              Personnalisez votre espace avec un nouveau salon
            </p>

            <div className="px-5 pb-5 space-y-4">
              {/* Channel type */}
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase block mb-2">
                  Type de salon
                </label>
                <div className="space-y-1.5">
                  {channelTypes.map((ct) => {
                    const Icon = ct.icon;
                    const selected = type === ct.id;
                    return (
                      <button
                        key={ct.id}
                        onClick={() => setType(ct.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                          selected
                            ? "bg-surface-active shadow-aura-hover"
                            : "bg-surface/50 hover:bg-surface"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          selected ? "bg-accent/20 text-accent" : "bg-surface text-muted-foreground"
                        }`}>
                          <Icon size={16} />
                        </div>
                        <div className="text-left flex-1">
                          <span className={`text-[13px] font-medium ${selected ? "text-foreground" : "text-foreground/80"}`}>
                            {ct.label}
                          </span>
                          <p className="text-[11px] text-muted-foreground leading-tight">{ct.desc}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selected ? "border-accent" : "border-muted-foreground/40"
                        }`}>
                          {selected && <div className="w-2 h-2 rounded-full bg-accent" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Channel name */}
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase block mb-1.5">
                  Nom du salon
                </label>
                <div className="flex items-center gap-2 bg-surface rounded-xl px-3 py-2.5">
                  {type === "voice" ? (
                    <Volume2 size={16} className="text-muted-foreground flex-shrink-0" />
                  ) : (
                    <Hash size={16} className="text-muted-foreground flex-shrink-0" />
                  )}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="nouveau-salon"
                    className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none"
                    maxLength={50}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase block mb-1.5">
                  Catégorie
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className="w-full flex items-center justify-between bg-surface rounded-xl px-3 py-2.5 text-[13px] text-foreground"
                  >
                    <span>{category}</span>
                    <ChevronDown size={14} className={`text-muted-foreground transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {showCategoryDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-card rounded-xl shadow-lg border border-border/30 overflow-hidden z-10"
                      >
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => { setCategory(cat); setShowCategoryDropdown(false); }}
                            className={`w-full text-left px-3 py-2 text-[12px] transition-colors ${
                              category === cat
                                ? "bg-surface-active text-foreground"
                                : "text-muted-foreground hover:bg-surface hover:text-foreground"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                        <button
                          onClick={() => { setCategory("NOUVEAU"); setShowCategoryDropdown(false); }}
                          className="w-full text-left px-3 py-2 text-[12px] text-accent hover:bg-surface transition-colors border-t border-border/30"
                        >
                          + Nouvelle catégorie
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Private toggle */}
              <button
                onClick={() => setIsPrivate(!isPrivate)}
                className="w-full flex items-center justify-between bg-surface/50 hover:bg-surface rounded-xl px-3 py-2.5 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Lock size={14} className="text-muted-foreground" />
                  <div className="text-left">
                    <span className="text-[13px] text-foreground">Salon privé</span>
                    <p className="text-[10px] text-muted-foreground">Seuls les membres sélectionnés pourront voir ce salon</p>
                  </div>
                </div>
                <div className={`w-9 h-5 rounded-full transition-colors relative ${isPrivate ? "bg-accent" : "bg-muted"}`}>
                  <motion.div
                    animate={{ x: isPrivate ? 16 : 2 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-foreground"
                  />
                </div>
              </button>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 rounded-xl text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!name.trim()}
                  className="flex-1 py-2 rounded-xl text-[13px] font-medium bg-accent text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  Créer le salon
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
