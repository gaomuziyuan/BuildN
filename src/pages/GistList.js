import { useEffect, useRef, useState } from "react";
import useGists from "../hooks/useGists";
import "./GistList.css";

const GistList = () => {
  const [since, setSince] = useState(
    new Date("30 July 1900 15:05 UTC").toISOString()
  );
  const [page, setPage] = useState(1);
  const { gists, isLoading } = useGists({ since, page });
  const observerRef = useRef();
  const [isFetching, setIsFetching] = useState(false);

  const handleClick = (avatarUrl) => {
    const img = document.createElement("img");
    img.src = avatarUrl;
    img.className = "fade-in-out";
    document.body.appendChild(img);
    setTimeout(() => {
      img.remove();
    }, 1000);
  };

  useEffect(() => {
    const currentObserverRef = observerRef.current;

    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting && !isFetching) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [isFetching]);

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
      <div ref={observerRef}></div>
    </div>
  );
};
export default GistList;
