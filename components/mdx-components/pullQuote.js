export const PullQuote = (props) => {
  return (
    <>
      <blockquote>
        <p className="text-2xl mb-1">
          {props.text}
        </p>
      </blockquote>
      <a className="italic text-sm" href={props.authorLink}>
        {props.author}
      </a>
    </>
  );
};
