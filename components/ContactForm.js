"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.target;
    const formData = new FormData(form);

    // Make sure to add your Web3Forms access key or Web3Forms/Formspree action URL here.
    // Example for Web3Forms: formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
    
    // For Formspree, change the URL to: "https://formspree.io/f/YOUR_FORM_ID"
    // For Web3Forms, use: "https://api.web3forms.com/submit" (requires access_key in form or formData)
    
    // We are setting up a Formspree example below.
    const ACTION_URL = "https://formspree.io/f/YOUR_FORM_ID"; 

    try {
      const response = await fetch(ACTION_URL, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-accent)] text-center shadow-[0_10px_40px_rgba(109,92,255,0.15)] w-full max-w-xl mx-auto">
        <div className="w-16 h-16 mx-auto bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[var(--color-heading)] mb-2">Message Sent!</h3>
        <p className="text-[var(--color-text-muted)]">
          Thank you for reaching out. We will get back to you shortly.
        </p>
        <button 
          onClick={() => setStatus("idle")} 
          className="mt-6 text-[var(--color-accent)] font-medium hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-xl relative overflow-hidden group">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Your Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          placeholder="John Doe"
          className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-border-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-soft)] focus:border-[var(--color-accent)] transition-all"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Your Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          placeholder="john@example.com"
          className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-border-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-soft)] focus:border-[var(--color-accent)] transition-all"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Message</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows="4"
          placeholder="How can we help you?"
          className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-border-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-soft)] focus:border-[var(--color-accent)] transition-all resize-none"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="w-full btn btn--primary py-4 rounded-xl font-semibold text-lg hover:shadow-[0_0_20px_var(--color-accent-soft)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      {status === "error" && (
        <p className="mt-4 text-center text-red-400 text-sm">
          Something went wrong. Please check your form endpoint setup.
        </p>
      )}
    </form>
  );
}
