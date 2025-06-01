"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { siteNavLinks, socialLinks } from "@/constants";
import { ChevronsUpDown, Moon, SearchX, Sun, UserRoundCog } from "lucide-react";
import { useNavbar } from "@/hooks/use-navbar";
import Motion from "./motion";
import { usePathname } from "next/navigation";
import { useHydrate } from "@/hooks/use-hydrate";
import { cn } from "@/lib/utils";
import { User } from "payload";

function NavItem({
  link,
  menu,
  index,
}: {
  link: (
    | typeof siteNavLinks
    | (typeof siteNavLinks)[number]["pageNavLinks"]
  )[number];
  menu: { get: boolean; set: React.Dispatch<React.SetStateAction<boolean>> };
  index: number;
}) {
  async function handleClick() {
    menu.set(false);
  }

  return (
    <Motion
      element="div"
      key={link.name}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="overflow-hidden no-scrollbar"
    >
      <Link
        href={link.href}
        className="group relative flex items-center p-4 text-gray-800 dark:text-gray-200 rounded-xl transition-all duration-300 hover:bg-purple-500/5 dark:hover:bg-purple-900/10 no-scrollbar"
        onClick={handleClick}
      >
        <span className="absolute left-0 w-1 h-8 rounded-r-full bg-purple-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-left" />
        <div className="flex items-center gap-4 ml-2">
          <link.icon className="w-4 h-4 group-hover:scale-120 transition-transform text-purple-600 dark:text-purple-400" />
          <span className="text-lg font-medium group-hover:translate-x-1 transition-transform no-scrollbar">
            {link.name}
          </span>
        </div>
      </Link>
    </Motion>
  );
}

export default function Navbar({
  user,
}: {
  user:
    | (User & {
        collection: "users";
      })
    | null;
}) {
  const { menu, props, theme, nav } = useNavbar();
  const pathname = useHydrate<string>(usePathname, ["/"], ({ fn }) => [fn]);

  return (
    <>
      <Motion
        element="nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          props.scrolled
            ? "py-6 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="relative group">
              <Motion
                element="span"
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                SS.me
              </Motion>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 group-hover:w-full transition-all duration-300" />
            </Link>
            <div className="flex items-center gap-4">
              <Motion
                element={Link}
                href="/account"
                className="p-2 flex gap-2 rounded-full bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 dark:hover:bg-purple-500/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <p>
                  {user?.email
                    ? `${user?.firstName} ${user?.lastName}`
                    : "Login"}
                </p>
                <UserRoundCog />
              </Motion>
              <Motion
                element="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  theme.set(theme.get === "dark" ? "light" : "dark")
                }
                className="p-2 rounded-full bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 dark:hover:bg-purple-500/30 transition-colors"
              >
                {theme.get === "dark" ? (
                  <Motion
                    element="div"
                    initial={{ rotate: -30 }}
                    animate={{ rotate: 0 }}
                    className="w-6 h-6"
                  >
                    <Sun />
                  </Motion>
                ) : (
                  <Motion
                    element="div"
                    initial={{ rotate: 30 }}
                    animate={{ rotate: 0 }}
                    className="w-6 h-6"
                  >
                    <Moon />
                  </Motion>
                )}
              </Motion>
              <Motion
                element="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => menu.set((prev) => !prev)}
                className="p-2 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                  <span
                    className={`block w-6 h-0.5 bg-black dark:bg-gray-300 transition-all duration-300 ${
                      menu.get ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`block w-6 h-0.5 bg-black dark:bg-gray-300 transition-all duration-300 ${
                      menu.get ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block w-6 h-0.5 bg-black dark:bg-gray-300 transition-all duration-300 ${
                      menu.get ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </Motion>
            </div>
          </div>
        </div>
      </Motion>
      <AnimatePresence>
        {menu.get && (
          <>
            <Motion
              element="div"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
              style={{
                zIndex: 49,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              onClick={() => menu.set(false)}
            />

            <Motion
              element="div"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-full sm:w-80 bg-white dark:bg-black shadow-2xl border-l border-gray-400/5"
              style={{
                zIndex: 51,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-h-screen flex flex-col">
                <div className="p-6 border-b border-purple-500/10 dark:border-purple-500/5">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-4 text-lg font-semibold dark:text-purple-600 text-purple-500">
                      <span
                        className="relative overflow-y-hidden flex justify-end items-center gap-2 cursor-pointer capitalize px-2 py-0.5 w-20 h-7 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md"
                        onClick={() =>
                          nav.set((prev) => (prev === "site" ? "page" : "site"))
                        }
                      >
                        <div
                          className={cn(
                            "absolute left-2 transition-all duration-300",
                            nav.get === "site" ? "top-0" : "-top-full"
                          )}
                        >
                          <p>Site</p>
                          <p>Page</p>
                        </div>
                        <ChevronsUpDown className="w-4 h-4" />
                      </span>
                      Navigation
                    </h2>
                    <Motion
                      element="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => menu.set(false)}
                      className="p-2 rounded-full hover:bg-purple-500/10 transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-gray-600 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </Motion>
                  </div>
                </div>
                <nav className="flex-1 overflow-y-hidden py-6 px-4 no-scrollbar">
                  <div className="grid gap-2 overflow-y-hidden no-scrollbar">
                    {(nav.get === "site"
                      ? siteNavLinks
                      : (siteNavLinks.find((link) => link.href === pathname)
                          ?.pageNavLinks ?? [])
                    ).length > 0 ? (
                      (nav.get === "site"
                        ? siteNavLinks
                        : (siteNavLinks.find((link) => link.href === pathname)
                            ?.pageNavLinks ?? [])
                      ).map((link, index) => (
                        <NavItem
                          key={link.name}
                          menu={menu}
                          link={link}
                          index={index}
                        />
                      ))
                    ) : (
                      <p className="flex flex-col justify-center items-center rounded-2xl gap-4 p-8 border-gray-200/50 dark:border-gray-700/50 shadow-xl dark:shadow-gray-900/10 hover:border-purple-500/50 dark:hover:border-purple-500/50 text-gray-500 border dark:text-gray-400 transition-all duration-300">
                        <SearchX className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        No page links found
                      </p>
                    )}
                  </div>
                </nav>
                <div className="flex flex-col gap-6 p-6 border-t border-purple-500/10 dark:border-purple-500/5">
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <Motion
                        element="a"
                        key={social.name}
                        href={social.url}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-purple-800/10 text-purple-500 hover:bg-purple-500/20 dark:hover:bg-purple-500/30 transition-colors"
                      >
                        {social.icon}
                      </Motion>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      © {new Date().getFullYear()} Sudharshan S. All rights
                      reserved.
                    </span>
                  </div>
                </div>
              </div>
            </Motion>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
