"use client";

import * as React from "react";

// Shares the active gallery image between the gallery and the finish selector,
// which live in different columns of the product layout. Selecting a finish
// switches the gallery to the matching image so the chosen colour is "viewed".
const ProductMediaContext = React.createContext(null);

export function ProductMediaProvider({ imageCount = 1, children }) {
  const [active, setActive] = React.useState(0);
  // A finish can point at its own photo that may not live in the gallery array;
  // when set, the gallery shows this instead of images[active].
  const [overrideSrc, setOverrideSrc] = React.useState(null);
  const value = React.useMemo(
    () => ({ active, setActive, imageCount, overrideSrc, setOverrideSrc }),
    [active, imageCount, overrideSrc]
  );
  return (
    <ProductMediaContext.Provider value={value}>
      {children}
    </ProductMediaContext.Provider>);

}

// Falls back to standalone local state when used outside a provider so the
// gallery still works on its own.
export function useProductMedia() {
  const ctx = React.useContext(ProductMediaContext);
  const [localActive, setLocalActive] = React.useState(0);
  const [localOverride, setLocalOverride] = React.useState(null);
  if (ctx) return ctx;
  return {
    active: localActive, setActive: setLocalActive, imageCount: 1,
    overrideSrc: localOverride, setOverrideSrc: setLocalOverride
  };
}
