"use client";

import { useState, useEffect } from "react";
import { X, Plus, Save, Heart, Play, ImageIcon, Eye, EyeOff } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

const GRADIENT_PRESETS = [
  { label: "Rose / Pink",     value: "from-rose-900 to-pink-800"      },
  { label: "Amber / Orange",  value: "from-amber-900 to-orange-800"   },
  { label: "Purple / Violet", value: "from-purple-900 to-violet-800"  },
  { label: "Slate / Zinc",    value: "from-slate-900 to-zinc-800"     },
  { label: "Teal / Cyan",     value: "from-teal-900 to-cyan-800"      },
  { label: "Red / Rose",      value: "from-red-900 to-rose-800"       },
  { label: "Blue / Indigo",   value: "from-blue-900 to-indigo-800"    },
  { label: "Green / Emerald", value: "from-green-900 to-emerald-800"  },
];

export interface SocialPost {
  id: string;
  type: "image" | "video";
  imageUrl: string;
  gradient: string;
  caption: string;
  tag: string;
  likes: string;
  visible: boolean;
}

interface SocialPostSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: SocialPost;
  onSave: (post: Omit<SocialPost, "id" | "likes">) => void;
}

export function SocialPostSheet({ open, onOpenChange, post, onSave }: SocialPostSheetProps) {
  const isEditing = !!post;

  const [form, setForm] = useState({
    type: "image" as "image" | "video",
    imageUrl: "",
    gradient: GRADIENT_PRESETS[0].value,
    caption: "",
    tag: "",
    visible: true,
  });
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (post) {
      setForm({
        type: post.type,
        imageUrl: post.imageUrl ?? "",
        gradient: post.gradient,
        caption: post.caption,
        tag: post.tag.replace(/^#/, ""),
        visible: post.visible,
      });
    } else {
      setForm({ type: "image", imageUrl: "", gradient: GRADIENT_PRESETS[0].value, caption: "", tag: "", visible: true });
    }
    setImgError(false);
  }, [post, open]);

  const hasImage = form.imageUrl.trim().length > 0 && !imgError;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      type: form.type,
      imageUrl: form.imageUrl.trim(),
      gradient: form.gradient,
      caption: form.caption.trim(),
      tag: form.tag.trim() ? `#${form.tag.trim().replace(/^#/, "")}` : "",
      visible: form.visible,
    });
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-[500px] bg-[#0D0B0E] border-l border-[#1C1828] flex flex-col gap-0 p-0 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-[#1C1828] gap-1">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-[15px] font-semibold text-[#E8E0F0] tracking-[-0.01em]">
              {isEditing ? "Edit Post" : "Add Social Post"}
            </SheetTitle>
            <SheetClose className="w-7 h-7 border border-[#1C1828] rounded-sm flex items-center justify-center text-[#4D4560] hover:text-[#9B93A8] hover:border-[#2C2438] transition-all">
              <X size={13} />
            </SheetClose>
          </div>
          <SheetDescription className="text-[12px] text-[#4D4560]">
            {isEditing ? "Update this post in the landing page social feed." : "This post will appear in the @pokaliz.laire feed on the homepage."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div className="flex-1 px-6 py-6 space-y-6">

            {/* Live preview */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">
                Preview
              </label>
              <div className="relative aspect-square w-full max-w-[220px] mx-auto overflow-hidden rounded-sm group">
                {/* Background: image or gradient */}
                {hasImage ? (
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${form.gradient}`} />
                )}

                {/* Video overlay */}
                {form.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <Play size={14} className="text-white" fill="white" />
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0D0B0E]/0 group-hover:bg-[#0D0B0E]/65 transition-all duration-300 z-20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 p-4">
                  <Heart size={18} className="text-white mb-1.5" />
                  <span className="text-white text-xs font-medium">{isEditing ? post!.likes : "—"}</span>
                  {form.tag && (
                    <span className="text-white/60 text-[10px] mt-1">#{form.tag.replace(/^#/, "")}</span>
                  )}
                </div>

                {/* Visibility badge */}
                {!form.visible && (
                  <div className="absolute top-2 left-2 z-40 bg-[#0D0B0E]/80 border border-[#2C2438] rounded-sm px-2 py-0.5 flex items-center gap-1">
                    <EyeOff size={9} className="text-[#4D4560]" />
                    <span className="text-[9px] text-[#4D4560] font-medium">Hidden</span>
                  </div>
                )}
              </div>

              {!hasImage && form.imageUrl && (
                <p className="text-[11px] text-rose-400 mt-2 text-center">Could not load image — check the URL.</p>
              )}
            </div>

            <div className="border-t border-[#1C1828]" />

            {/* Type toggle */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Post Type
              </label>
              <div className="flex gap-2">
                {(["image", "video"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, type: t }))}
                    className={`flex items-center gap-2 px-4 py-2 text-[12px] font-medium border rounded-sm capitalize transition-all ${
                      form.type === t
                        ? "border-[#C9A55A]/40 text-[#C9A55A] bg-[#C9A55A]/8"
                        : "border-[#1C1828] text-[#4D4560] hover:border-[#2C2438] hover:text-[#6B6378]"
                    }`}
                  >
                    {t === "video" ? <Play size={11} /> : <ImageIcon size={11} />}
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Image URL {form.type === "video" && <span className="text-[#3D3550] normal-case tracking-normal font-normal">(thumbnail)</span>}
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={(e) => { setForm((f) => ({ ...f, imageUrl: e.target.value })); setImgError(false); }}
                className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
              />
              <p className="text-[11px] text-[#3D3550] mt-1.5">Leave blank to use a colour block instead.</p>
            </div>

            {/* Fallback gradient — only shown when no image URL */}
            {!form.imageUrl && (
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                  Colour Block <span className="text-[#3D3550] normal-case tracking-normal font-normal">(shown if no image)</span>
                </label>
                <div className="grid grid-cols-8 gap-1.5">
                  {GRADIENT_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, gradient: preset.value }))}
                      title={preset.label}
                      className={`w-8 h-8 bg-gradient-to-br ${preset.value} rounded-sm border-2 transition-all ${
                        form.gradient === preset.value
                          ? "border-[#C9A55A] scale-110"
                          : "border-transparent hover:border-[#2C2438]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Caption */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Caption <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={60}
                placeholder="e.g. Bridal glow transformation"
                value={form.caption}
                onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
                className="w-full bg-[#110E16] border border-[#1C1828] px-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
              />
              <p className="text-[11px] text-[#3D3550] mt-1.5 text-right">{form.caption.length}/60</p>
            </div>

            {/* Hashtag */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Hashtag
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#4D4560] font-medium">#</span>
                <input
                  type="text"
                  placeholder="BridalGlow"
                  value={form.tag.replace(/^#/, "")}
                  onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value.replace(/^#/, "").replace(/\s/g, "") }))}
                  className="w-full bg-[#110E16] border border-[#1C1828] pl-7 pr-3 py-2.5 text-[13px] text-[#C0B8CC] placeholder:text-[#3D3550] focus:border-[#C9A55A]/50 focus:outline-none transition-colors rounded-sm"
                />
              </div>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">
                Visibility
              </label>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, visible: !f.visible }))}
                className={`flex items-center gap-3 w-full px-4 py-3 border rounded-sm transition-all ${
                  form.visible
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-[#1C1828] bg-[#110E16]"
                }`}
              >
                <div className={`w-8 h-4 rounded-full relative transition-colors ${form.visible ? "bg-emerald-500/40" : "bg-[#2C2438]"}`}>
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${form.visible ? "left-4 bg-emerald-400" : "left-0.5 bg-[#4D4560]"}`} />
                </div>
                <span className={`text-[13px] font-medium ${form.visible ? "text-emerald-400" : "text-[#4D4560]"}`}>
                  {form.visible ? "Visible on landing page" : "Hidden from landing page"}
                </span>
                {form.visible ? <Eye size={13} className="ml-auto text-emerald-400/60" /> : <EyeOff size={13} className="ml-auto text-[#3D3550]" />}
              </button>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="px-6 py-4 border-t border-[#1C1828] flex-row gap-3">
            <SheetClose asChild>
              <button type="button" className="flex-1 py-2.5 text-[12px] font-semibold text-[#6B6378] border border-[#1C1828] rounded-sm hover:border-[#2C2438] hover:text-[#9B93A8] transition-all">
                Cancel
              </button>
            </SheetClose>
            <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-semibold bg-[#C9A55A] text-[#0D0B0E] rounded-sm hover:bg-[#E8C99A] transition-colors">
              {isEditing ? <><Save size={13} /> Save Changes</> : <><Plus size={13} /> Add Post</>}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
