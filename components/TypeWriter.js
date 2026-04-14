"use client";

import { useState, useEffect, useCallback } from "react";

export default function TypeWriter({ words = [], className = "" }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const word = words[currentWord];
    if (!word) return;

    if (isDeleting) {
      setCurrentText(word.substring(0, currentText.length - 1));
    } else {
      setCurrentText(word.substring(0, currentText.length + 1));
    }

    if (!isDeleting && currentText === word) {
      setTimeout(() => setIsDeleting(true), 1800);
      return;
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWord((prev) => (prev + 1) % words.length);
      return;
    }
  }, [currentText, isDeleting, currentWord, words]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 70;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className={className}>
      {currentText}
      <span className="typewriter-cursor" aria-hidden="true">|</span>
    </span>
  );
}
