"use client";
import { useEffect } from "react";

interface CommentsProps {
  repo: string;
  issueTerm?: string;
  label?: string;
  theme?: string;
}

export default function Comments({
  repo,
  issueTerm = "pathname",
  label = "Blog Comment",
  theme = "github-light",
}: CommentsProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("label", label);
    script.setAttribute("theme", theme);
    script.setAttribute("crossorigin", "anonymous");

    const commentsDiv = document.getElementById("comments");
    if (commentsDiv) {
      commentsDiv.appendChild(script);
    }
    return () => {
      if (commentsDiv) {
        commentsDiv.innerHTML = "";
      }
    };
  }, [repo, issueTerm, label, theme]);

  return <div id="comments" className="mt-12" />;
}
