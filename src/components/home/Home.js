import React from "react";
import MapDisplay from "../map/MapDisplay";

export default function Home({ userAuth, placement, setplacement }) {
  const { authenticated, data } = userAuth;

  return (
    <div>
      <h1> Hello {authenticated ? data.displayName : "guest"}</h1>
      <MapDisplay placement={placement} setplacement={setplacement} />
    </div>
  );
}
