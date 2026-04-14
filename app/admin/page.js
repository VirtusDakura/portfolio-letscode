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

  // Check for an active session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
    <main className="min-h-screen pt-28 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-[var(--color-heading)] mb-2">Team Overview</h1>
          <p className="text-[var(--color-text-muted)]">Securely authenticated as: <span className="text-[var(--color-accent)]">{session.user.email}</span></p>
        </div>
        <button onClick={handleLogout} className="px-6 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all">
          Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ADD MEMBER FORM */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] h-fit">
          <h2 className="text-xl font-bold text-[var(--color-heading)] mb-6 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add New Developer
          </h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Full Name</label>
              <input type="text" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:border-[var(--color-accent)] outline-none" placeholder="e.g. John Doe" />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Role</label>
              <input type="text" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:border-[var(--color-accent)] outline-none" placeholder="e.g. Backend Engineer" />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">LinkedIn URL</label>
              <input type="url" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:border-[var(--color-accent)] outline-none" placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Bio</label>
              <textarea className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:border-[var(--color-accent)] outline-none resize-none" rows="3" placeholder="Brief introduction..."></textarea>
            </div>
            <button type="button" onClick={() => alert("Database connection pending!")} className="w-full btn btn--primary py-2 mt-4 text-sm rounded-lg">
              Save Profile
            </button>
          </form>
        </div>

        {/* CURRENT TEAM TABLE (MOCK) */}
        <div className="lg:col-span-2 overflow-x-auto rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
           <table className="w-full text-left text-[var(--color-text)]">
             <thead className="bg-[#1a1b26] border-b border-[var(--color-border)]">
               <tr>
                 <th className="px-6 py-4 font-semibold text-sm">Developer Name</th>
                 <th className="px-6 py-4 font-semibold text-sm">Role</th>
                 <th className="px-6 py-4 font-semibold text-sm">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-[var(--color-border)]">
               {/* Note: This is an empty state until we link the Supabase table! */}
               <tr>
                 <td colSpan="3" className="px-6 py-12 text-center text-[var(--color-text-muted)]">
                   Connect the database to see mapped team members here.
                 </td>
               </tr>
             </tbody>
           </table>
        </div>
      </div>
    </main>
  );
}
