import { useEffect, useState } from "react";
import useGists from "../hooks/useGists";
import "./GistList.css";

const GistList = () => {
  const [since, setSince] = useState(
    new Date("30 July 1900 15:05 UTC").toISOString()
  );
  const [page, setPage] = useState(1);
  const { gists, isLoading } = useGists({ since, page });

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 <
      document.documentElement.offsetHeight
    ) {
      console.log("window.innerHeight", window.innerHeight);
      console.log(
        "document.documentElement.scrollTop",
        document.documentElement.scrollTop
      );
      console.log(
        "document.documentElement.offsetHeight",
        document.documentElement.offsetHeight
      );
      return;
    }
    console.log("window.innerHeight!!!", window.innerHeight);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (avatarUrl) => {
    const img = document.createElement("img");
    img.src = avatarUrl;
    img.className = "fade-in-out";
    document.body.appendChild(img);
    setTimeout(() => {
      img.remove();
    }, 1000);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gist-list">
      {gists.map((gist) => (
        <div
          key={gist.id}
          className="gist-item"
          onClick={() => handleClick(gist.owner.avatar_url)}
        >
          <img
            src={gist.owner.avatar_url}
            alt={gist.owner.name}
            className="avatar"
          />
          <div>{Object.entries(gist.files)[0][0]}</div>
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};
export default GistList;
