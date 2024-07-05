import React, { useEffect, useState, useMemo } from "react";
import stall from "../utils/stall.js";
import "./Page.css";

let cache = {};

const Page = ({ heading, subheading }) => {
  const [displayHeading, setDisplayHeading] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const simulateLazyLoading = async () => {
      if (cache[heading]) {
        setDisplayHeading(cache[heading]);
        return;
      }

      setIsLoading(true);
      await stall(500);
      setDisplayHeading(heading);
      cache[heading] = heading;
      setIsLoading(false);
    };

    if (heading) {
      simulateLazyLoading();
    } else {
      setDisplayHeading("");
    }
  }, [heading]);

  return (
    <article>
      <header>
        {isLoading ? <h1>...</h1> : <h1>{displayHeading}</h1>}
        {subheading && <h2>{subheading}</h2>}
      </header>
    </article>
  );
};

export default Page;
