import { useEffect, useState } from "react";

const useGists = ({ since, page }) => {
  const [gists, setGists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGists = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/gists/public?per_page=30&page=${page}&since=${since}`
        );
        const data = await response.json();
        setGists((prevGists) => [...prevGists, ...data]);
      } catch (error) {
        console.error("Failed to fetch gists", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGists();
  }, [since, page]);

  return { gists, isLoading };
};

export default useGists;
