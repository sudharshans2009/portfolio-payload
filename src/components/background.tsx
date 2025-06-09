export function HeroBackground() {
  return (
    <>
      <div className="absolute top-1/3 left-1/4 w-10 h-10 md:w-96 md:h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-10 h-10 md:w-80 md:h-80 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full filter blur-3xl animate-pulse delay-700" />
    </>
  );
}

export function BackgroundLow() {
  return (
    <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
  );
}

export function BackgroundHigh() {
  return (
    <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
  );
}

export function BackgroundAll() {
  return (
    <>
      <HeroBackground />
      <BackgroundLow />
      <BackgroundHigh />
      <BackgroundLow />
    </>
  );
}
