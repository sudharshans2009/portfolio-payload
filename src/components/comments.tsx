"use client";
import { useHydrate } from "@/hooks/use-hydrate";
import { useTheme, UseThemeProps } from "next-themes";
import { useEffect } from "react";

interface CommentsProps {
  repo: string;
  issueTerm?: string;
  label?: string;
}

export default function Comments({
  repo,
  issueTerm = "pathname",
  label = "Blog Comment",
}: CommentsProps) {
  const { theme } = useHydrate<UseThemeProps>(
    useTheme,
    ["dark"],
    ({ fn }) => [fn]
  );
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("label", label);
    script.setAttribute(
      "theme",
      `github-${
        theme === "system" ? "preferred-color-scheme" : theme === "dark" ? "dark" : "light"
      }`
    );
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

  return <div id="comments" className="w-full" />;
}
