"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Database States
  const [teamList, setTeamList] = useState([]);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newLinkedin, setNewLinkedin] = useState("");
  const [newGithub, setNewGithub] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newExpertise, setNewExpertise] = useState(""); 
  const [newStack, setNewStack] = useState("");
  const [newProjects, setNewProjects] = useState([{ title: "", description: "" }]);

  // UI States
  const [activeTab, setActiveTab] = useState("directory"); // directory, new, settings
  const [editingId, setEditingId] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }

  const [toast, setToast] = useState({ message: "", type: "success", visible: false });

  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3500);
  };

  // Check for an active session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) fetchTeam();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
      if (session) fetchTeam();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTeam = async () => {
    const { data, error } = await supabase.from('team_members').select('*');
    if (!error && data) setTeamList(data);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImageToSupabase = async () => {
    if (!imageFile) return existingImage || "/Logo.jpeg";
    
    // Assumes user created a public bucket called 'profiles'
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from('profiles').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const resetForm = () => {
    setNewName(""); setNewRole(""); setNewLinkedin(""); setNewGithub(""); 
    setImageFile(null); setExistingImage(""); setEditingId(null);
    setImagePreviewUrl("");
    setNewBio(""); setNewExpertise(""); setNewStack(""); 
    setNewProjects([{ title: "", description: "" }]);
  };

  const handleEditClick = (member) => {
    setEditingId(member.id);
    setNewName(member.name);
    setNewRole(member.role);
    setNewLinkedin(member.linkedin);
    setNewGithub(member.github);
    setExistingImage(member.image);
    setImagePreviewUrl("");
    setNewBio(member.bio);
    setNewExpertise(member.expertise ? member.expertise.join(", ") : "");
    setNewStack(member.stack ? member.stack.join(", ") : "");
    setNewProjects(member.projects && member.projects.length > 0 ? member.projects : [{ title: "", description: "" }]);
    setActiveTab("new");
  };

  const requestDelete = (id, name) => {
    setDeleteTarget({ id, name });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from('team_members').delete().eq('id', deleteTarget.id);
    if (!error) {
      fetchTeam();
      showToast(`${deleteTarget.name}'s profile was successfully deleted.`, "success");
    } else {
      showToast("Error deleting member: " + error.message, "error");
    }
    setDeleteTarget(null);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newName || !newRole) return;

    setUploadingImage(true);
    let finalImageUrl = existingImage;
    if (imageFile) {
      try {
        finalImageUrl = await uploadImageToSupabase();
      } catch (err) {
        setUploadingImage(false);
        showToast(`Photo upload failed: ${err.message}`, "error");
        return;
      }
    }
    
    const slug = newName.toLowerCase().replace(/\s+/g, '-');
    const expertiseArray = newExpertise.split(',').map(s => s.trim()).filter(Boolean);
    const stackArray = newStack.split(',').map(s => s.trim()).filter(Boolean);
    const filteredProjects = newProjects.filter(p => p.title.trim() !== "");

    const payload = { 
      name: newName, 
      role: newRole, 
      linkedin: newLinkedin, 
      github: newGithub,
      image: finalImageUrl,
      bio: newBio, 
      expertise: expertiseArray,
      stack: stackArray,
      projects: filteredProjects,
      slug 
    };

    let apiError = null;
    if (editingId) {
      const { error } = await supabase.from('team_members').update(payload).eq('id', editingId);
      apiError = error;
    } else {
      const { error } = await supabase.from('team_members').insert([payload]);
      apiError = error;
    }

    setUploadingImage(false);

    if (!apiError) {
      showToast(editingId ? "Profile updated successfully!" : "Developer profile correctly published!");
      resetForm();
      fetchTeam(); // Refresh the table
      setActiveTab("directory"); // go back to directory view
    } else {
      showToast("Error saving member: " + apiError.message, "error");
    }
  };

  const updateProject = (index, field, value) => {
    const updated = [...newProjects];
    updated[index][field] = value;
    setNewProjects(updated);
  };

  const addProjectField = () => {
    setNewProjects([...newProjects, { title: "", description: "" }]);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="animate-spin h-8 w-8 text-[var(--color-accent)]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        </div>
      </div>
    );
  }

  // ==== NOT LOGGED IN UI (LOGIN SCREEN) ====
  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center py-20 px-6 bg-[url('/noise.png')]">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-accent)]" />
          
          <h1 className="text-3xl font-bold text-[var(--color-heading)] mb-2">Admin Panel</h1>
          <p className="text-[var(--color-text-muted)] mb-8">Sign in to manage team portfolios.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                placeholder="admin@letscode.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                placeholder="••••••••"
              />
            </div>
            
            {authError && <p className="text-red-400 text-sm">{authError}</p>}
            <button type="submit" className="w-full btn btn--primary py-3 rounded-xl disabled:opacity-50">
              Sign In
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ==== SECURE DASHBOARD UI ====
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col md:flex-row">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[var(--color-bg-card)] border-r border-[var(--color-border)] p-6 flex flex-col md:min-h-screen">
        <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-8 tracking-tight">Letscode <span className="text-[var(--color-accent)]">Admin</span></h2>
        
        <nav className="flex-1 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar">
          <button onClick={() => setActiveTab('directory')} className={`text-left px-5 py-3 rounded-xl text-sm font-medium transition-all shrink-0 md:w-full ${activeTab === 'directory' ? 'bg-[var(--color-accent)] text-white shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-heading)] hover:bg-[var(--color-bg-raised)]'}`}>
            Profiles Directory
          </button>
          <button onClick={() => { setActiveTab('new'); resetForm(); }} className={`text-left px-5 py-3 rounded-xl text-sm font-medium transition-all shrink-0 md:w-full ${activeTab === 'new' && !editingId ? 'bg-[var(--color-accent)] text-white shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-heading)] hover:bg-[var(--color-bg-raised)]'}`}>
            Add Developer
          </button>
          <button onClick={() => setActiveTab('settings')} className={`text-left px-5 py-3 rounded-xl text-sm font-medium transition-all shrink-0 md:w-full ${activeTab === 'settings' ? 'bg-[var(--color-accent)] text-white shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-heading)] hover:bg-[var(--color-bg-raised)]'}`}>
            Settings
          </button>
        </nav>

        <div className="mt-auto hidden md:block pt-8 border-t border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)] mb-4 truncate">{session.user.email}</p>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors">
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        
        {/* TAB: DIRECTORY */}
        {activeTab === 'directory' && (
          <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-[var(--color-heading)] mb-8">Team Directory</h1>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-[var(--color-text)]">
                <thead className="bg-[#1a1b26] border-b border-[var(--color-border)]">
                  <tr>
                    <th className="px-6 py-5 font-semibold text-sm">Developer</th>
                    <th className="px-6 py-5 font-semibold text-sm">Role</th>
                    <th className="px-6 py-5 font-semibold text-sm text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {teamList.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-16 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] mb-4">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                        </div>
                        <h3 className="text-lg font-medium text-[var(--color-heading)] mb-2">No profiles found</h3>
                        <p className="text-[var(--color-text-muted)] max-w-sm mx-auto">Get started by navigating to the 'Add Developer' tab to create your first portfolio.</p>
                      </td>
                    </tr>
                  ) : (
                    teamList.map((member) => (
                      <tr key={member.id} className="hover:bg-[var(--color-bg-raised)] transition-colors">
                        <td className="px-6 py-5 font-medium flex items-center gap-4">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-[var(--color-border)]" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)]">?</div>
                          )}
                          {member.name}
                        </td>
                        <td className="px-6 py-5 text-[var(--color-text-muted)]">{member.role}</td>
                        <td className="px-6 py-5 text-right space-x-4">
                          <button onClick={() => handleEditClick(member)} className="text-[var(--color-accent)] hover:underline text-sm font-medium">Edit</button>
                          <button onClick={() => requestDelete(member.id, member.name)} className="text-red-400 hover:text-red-300 hover:underline text-sm font-medium">Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: NEW DEVELOPER */}
        {activeTab === 'new' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[var(--color-heading)] mb-2">{editingId ? "Edit Profile" : "Create Profile"}</h1>
                <p className="text-[var(--color-text-muted)]">{editingId ? "Update existing developer details." : "Add a new developer to exactly match the Letscode portfolio system."}</p>
              </div>
              {editingId && (
                <button onClick={() => { resetForm(); setActiveTab('directory'); }} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-heading)] border border-[var(--color-border)] px-4 py-2 rounded-lg transition-colors">
                  Cancel Edit
                </button>
              )}
            </div>
            
            <form onSubmit={handleAddMember} className="space-y-8 bg-[var(--color-bg-card)] border border-[var(--color-border)] p-8 md:p-10 rounded-2xl shadow-sm">
              
              {/* IMAGE UPLOADER */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-heading)] mb-3">Profile Photo</label>
                <div className="border-2 border-dashed border-[var(--color-border-hover)] bg-[var(--color-bg)] rounded-xl py-8 px-4 text-center hover:border-[var(--color-accent)] transition-colors cursor-pointer relative group flex flex-col items-center justify-center min-h-[160px] overflow-hidden">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  
                  {imagePreviewUrl || existingImage ? (
                    <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-black">
                       <img src={imagePreviewUrl || existingImage} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-md">Click to change photo</span>
                       </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 relative z-0">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                      </div>
                      <span className="text-[var(--color-text-muted)] font-medium mt-2">Click to upload developer photo</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CORE INFO */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Full Name</label>
                  <input type="text" value={newName} onChange={e => setNewName(e.target.value)} required className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Primary Role</label>
                  <input type="text" value={newRole} onChange={e => setNewRole(e.target.value)} required className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none transition-colors" placeholder="Senior Backend Engineer" />
                </div>
              </div>

              {/* LINKS */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">LinkedIn URL</label>
                  <input type="url" value={newLinkedin} onChange={e => setNewLinkedin(e.target.value)} className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none transition-colors" placeholder="https://linkedin.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">GitHub URL</label>
                  <input type="url" value={newGithub} onChange={e => setNewGithub(e.target.value)} className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none transition-colors" placeholder="https://github.com/..." />
                </div>
              </div>

              {/* BIO */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Biography</label>
                <textarea value={newBio} onChange={e => setNewBio(e.target.value)} required className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none resize-none transition-colors" rows="4" placeholder="Craft a compelling professional story..."></textarea>
              </div>

              {/* SKILLS */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Core Expertise</label>
                  <input type="text" value={newExpertise} onChange={e => setNewExpertise(e.target.value)} className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none transition-colors" placeholder="System Design, API Dev... (comma separated)" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Tech Stack</label>
                  <input type="text" value={newStack} onChange={e => setNewStack(e.target.value)} className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none transition-colors" placeholder="React, Node, Python... (comma separated)" />
                </div>
              </div>

              {/* PROJECTS */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-[var(--color-heading)]">Featured Projects</label>
                  <button type="button" onClick={addProjectField} className="text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1 font-medium">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                     Add Another Project
                  </button>
                </div>
                
                <div className="space-y-4">
                  {newProjects.map((project, index) => (
                    <div key={index} className="bg-[var(--color-bg)] rounded-xl p-5 border border-[var(--color-border)] relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent)] rounded-l-xl"></div>
                      <input type="text" value={project.title} onChange={e => updateProject(index, 'title', e.target.value)} className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 mb-3 text-[var(--color-heading)] focus:border-[var(--color-accent)] outline-none transition-colors font-semibold" placeholder="Project Title" />
                      <textarea value={project.description} onChange={e => updateProject(index, 'description', e.target.value)} className="w-full bg-transparent text-[var(--color-text)] outline-none resize-none placeholder-[var(--color-text-muted)]" rows="2" placeholder="Briefly describe what this project accomplished..."></textarea>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--color-border)]">
                <button type="submit" disabled={uploadingImage} className="w-full md:w-auto md:px-12 btn btn--primary py-4 text-base rounded-xl font-bold disabled:opacity-70 disabled:cursor-wait">
                  {uploadingImage ? "Saving..." : editingId ? "Update Profile" : "Publish Developer Profile"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto animate-in fade-in py-10">
            <h1 className="text-3xl font-bold text-[var(--color-heading)] mb-8">Admin Settings</h1>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8">
              <p className="text-[var(--color-text)] mb-6">Database configuration and advanced administration controls will appear here.</p>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                  <div>
                    <h4 className="font-semibold text-[var(--color-heading)]">Storage Bucket</h4>
                    <span className="text-sm text-[var(--color-text-muted)]">Connected to 'profiles' bucket</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-[var(--color-heading)] mb-2">Delete Profile?</h3>
            <p className="text-[var(--color-text-muted)] mb-8 text-sm leading-relaxed">Are you sure you want to permanently remove <span className="font-semibold text-[var(--color-text-emphasis)]">{deleteTarget.name}</span> from the portfolio? This action cannot be undone.</p>
            <div className="flex justify-end gap-3 hover:cursor-pointer">
              <button type="button" onClick={() => setDeleteTarget(null)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-raised)] transition-colors border border-[var(--color-border)]">Cancel</button>
              <button type="button" onClick={confirmDelete} className="px-5 py-2.5 rounded-xl text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20 hover:border-red-500">Delete Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST SYSTEM */}
      <div 
        className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 ease-out flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border ${
          toast.visible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8 pointer-events-none"
        } ${
          toast.type === "success" 
            ? "bg-[var(--color-bg-card)] border-[var(--color-accent)]/30 text-[var(--color-heading)]"
            : "bg-red-500 text-white border-red-600"
        }`}
      >
        {toast.type === "success" ? (
          <div className="w-7 h-7 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        ) : (
           <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
        )}
        <span className="font-medium text-sm max-w-[300px] leading-snug">{toast.message}</span>
      </div>

    </div>
  );
}
