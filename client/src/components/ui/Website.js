const regex = /(^\w+:|^)\/\//;

const Website = ({ website, cssClass }) => {
  return (
    <a
      style={{ fontWeight: 700 }}
      href={website}
      target="_blank"
      rel="noreferrer"
      className={cssClass}
    >
      {website.replace(regex, "")}
    </a>
  );
};

export default Website;
