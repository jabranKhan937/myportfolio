export function SplitTitle({ text }: { text: string }) {
  return (
    <h1 className="hero__title" id="hero-title" aria-label={text}>
      <span aria-hidden="true">
        {Array.from(text).map((character, index) => (
          <span
            key={`${character}-${index}`}
            className="char"
            style={{ animationDelay: `${0.035 * index + 0.12}s` }}
          >
            {character === " " ? "\u00a0" : character}
          </span>
        ))}
      </span>
    </h1>
  );
}
