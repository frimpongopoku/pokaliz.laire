"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SocialPostSheet, type SocialPost } from "@/components/admin/SocialPostSheet";
import { socialPosts as initialData } from "@/lib/data";
import { Plus, Heart, Play, Eye, EyeOff, Edit, Trash2, ExternalLink, Instagram } from "lucide-react";

// Augment the static data with the new fields
const seed: SocialPost[] = initialData.map((p) => ({
  ...p,
  imageUrl: "",
  visible: true,
}));

let nextId = seed.length + 1;

export default function SocialFeedPage() {
  const [posts, setPosts] = useState<SocialPost[]>(seed);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<SocialPost | undefined>(undefined);

  function openAdd() {
    setEditingPost(undefined);
    setSheetOpen(true);
  }

  function openEdit(p: SocialPost) {
    setEditingPost(p);
    setSheetOpen(true);
  }

  function handleSave(data: Omit<SocialPost, "id" | "likes">) {
    if (editingPost) {
      setPosts((prev) => prev.map((p) => p.id === editingPost.id ? { ...p, ...data } : p));
    } else {
      setPosts((prev) => [...prev, { id: `sp${nextId++}`, likes: "0", ...data }]);
    }
  }

  function toggleVisible(id: string) {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, visible: !p.visible } : p));
  }

  function deletePost(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  const visibleCount = posts.filter((p) => p.visible).length;

  return (
    <>
      <AdminHeader title="Social Feed" subtitle="@pokaliz.laire" />

      <SocialPostSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        post={editingPost}
        onSave={handleSave}
      />

      <div className="p-6 space-y-5">

        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Posts",   value: posts.length,    sub: "In feed library"          },
            { label: "Live on Site",  value: visibleCount,    sub: "Shown on homepage"        },
            { label: "Hidden",        value: posts.length - visibleCount, sub: "Not shown"    },
          ].map((item) => (
            <div key={item.label} className="bg-[#110E16] border border-[#1C1828] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-2">{item.label}</p>
              <p className="text-[26px] font-bold text-[#E8E0F0] leading-none">{item.value}</p>
              <p className="text-[11px] text-[#4D4560] mt-1.5">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#4D4560]">
            <Instagram size={14} />
            <span className="text-[12px] font-medium">Landing page feed · {visibleCount} posts visible</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium text-[#6B6378] border border-[#1C1828] rounded-sm hover:border-[#2C2438] hover:text-[#9B93A8] transition-all"
            >
              <ExternalLink size={12} /> Preview Site
            </a>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-[#C9A55A] text-[#0D0B0E] px-4 py-2.5 text-[12px] font-semibold hover:bg-[#E8C99A] transition-colors rounded-sm"
            >
              <Plus size={13} /> Add Post
            </button>
          </div>
        </div>

        {/* Feed grid — mirrors the landing page layout */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">
            Feed Preview
          </p>

          {posts.length === 0 ? (
            <div className="bg-[#110E16] border border-dashed border-[#2C2438] rounded-sm py-20 flex flex-col items-center justify-center gap-3">
              <Instagram size={24} className="text-[#2C2438]" />
              <p className="text-[13px] font-medium text-[#4D4560]">No posts yet</p>
              <button onClick={openAdd} className="text-[12px] font-medium text-[#C9A55A] hover:text-[#E8C99A] transition-colors">
                + Add your first post
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={i === 0 ? "col-span-2" : i === 3 ? "col-span-2" : "col-span-1"}
                >
                  <div className={`group relative overflow-hidden aspect-square rounded-sm ${!post.visible ? "opacity-40" : ""}`}>
                    {/* Background */}
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.caption} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
                    )}

                    {/* Video play */}
                    {post.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <Play size={11} className="text-white" fill="white" />
                        </div>
                      </div>
                    )}

                    {/* Hidden badge */}
                    {!post.visible && (
                      <div className="absolute top-1.5 left-1.5 z-30 bg-[#0D0B0E]/80 border border-[#2C2438] rounded-sm px-1.5 py-0.5 flex items-center gap-1">
                        <EyeOff size={8} className="text-[#4D4560]" />
                        <span className="text-[8px] text-[#4D4560] font-medium">Hidden</span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#0D0B0E]/0 group-hover:bg-[#0D0B0E]/75 transition-all duration-300 z-20" />

                    {/* Hover actions */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 gap-2">
                      <div className="flex items-center gap-1.5">
                        <Heart size={13} className="text-white" />
                        <span className="text-white text-[11px] font-medium">{post.likes}</span>
                      </div>
                      <p className="text-white/70 text-[9px] text-center px-2 leading-tight">{post.caption}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          onClick={() => openEdit(post)}
                          className="w-6 h-6 bg-[#1C1828]/80 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#9B93A8] transition-all"
                        >
                          <Edit size={9} />
                        </button>
                        <button
                          onClick={() => toggleVisible(post.id)}
                          className="w-6 h-6 bg-[#1C1828]/80 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-amber-400 hover:text-amber-400 text-[#9B93A8] transition-all"
                        >
                          {post.visible ? <EyeOff size={9} /> : <Eye size={9} />}
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="w-6 h-6 bg-[#1C1828]/80 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-rose-500 hover:text-rose-400 text-[#9B93A8] transition-all"
                        >
                          <Trash2 size={9} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add new slot */}
              <div className="col-span-1">
                <button
                  onClick={openAdd}
                  className="w-full aspect-square border border-dashed border-[#2C2438] rounded-sm flex flex-col items-center justify-center gap-1.5 text-[#3D3550] hover:border-[#C9A55A]/40 hover:text-[#C9A55A]/60 transition-all"
                >
                  <Plus size={16} />
                  <span className="text-[9px] font-semibold uppercase tracking-wider">Add</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* List table for management */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6378] mb-3">All Posts</p>
          <div className="bg-[#110E16] border border-[#1C1828] rounded-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1C1828]">
                  {["Post", "Type", "Caption", "Hashtag", "Likes", "Status", ""].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4D4560]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-b border-[#0D0B0E] hover:bg-[#1C1828]/40 transition-colors group">
                    <td className="px-5 py-3">
                      <div className={`w-9 h-9 rounded-sm overflow-hidden flex-shrink-0 relative bg-gradient-to-br ${p.gradient}`}>
                        {p.imageUrl && (
                          <img src={p.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
                        )}
                        {p.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play size={8} className="text-white" fill="white" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[11px] font-medium text-[#6B6378] capitalize">{p.type}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[13px] font-medium text-[#C0B8CC]">{p.caption}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[12px] text-[#C9A55A]">{p.tag}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[12px] text-[#6B6378]">{p.likes}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-1 rounded-sm ${p.visible ? "text-emerald-400 bg-emerald-400/10" : "text-[#4D4560] bg-[#1C1828]"}`}>
                        {p.visible ? "Visible" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(p)} className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-[#C9A55A] hover:text-[#C9A55A] text-[#4D4560] transition-all"><Edit size={10} /></button>
                        <button onClick={() => toggleVisible(p.id)} className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-amber-400 hover:text-amber-400 text-[#4D4560] transition-all">
                          {p.visible ? <EyeOff size={10} /> : <Eye size={10} />}
                        </button>
                        <button onClick={() => deletePost(p.id)} className="w-6 h-6 border border-[#2C2438] rounded-sm flex items-center justify-center hover:border-rose-500 hover:text-rose-400 text-[#4D4560] transition-all"><Trash2 size={10} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
