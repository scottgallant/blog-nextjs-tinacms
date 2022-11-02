export const CaptionedImage = (props) => {
  return (
    <figure>
      <img style={{ maxWidth: "100%" }} src={props.imgUrl} alt={props.alt} />

      <figcaption>{props.caption}</figcaption>
    </figure>
  );
};
