import bs58 from "bs58";

export const encodeSelection = (selected: number[]): string => {
  return bs58.encode(selected);
};

export const decodeSelection = (code: any): number[] | undefined => {
  if (typeof code === "string") {
    try {
      return Array.from(bs58.decode(code));
    } catch {
      return undefined;
    }
  }
  return undefined;
};

export const isSelectionValid = (selected: number[]): boolean => {
  return selected.length === 11 && selected.every((i) => i >= 0 && i < 96);
}

export const isSelectionComplete = (selected: number[]): boolean => {
  return isSelectionValid(selected) && selected.every((i) => i < 255);
}

export const parseHumanNumber = (s: string) => {
  let magnitude = 4;
  for (const suffix of ["T", "B", "M", "K"]) {
    const _s = s.trim().toUpperCase()
    if (_s.endsWith(suffix)) {
      return parseFloat(_s.slice(0, -1)) * Math.pow(1000, magnitude);
    }
    magnitude--;
  };
  return parseFloat(s);
};
