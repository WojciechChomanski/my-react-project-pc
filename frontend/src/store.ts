import { create } from "zustand";

interface ConfiguratorState {
  shape: string;
  material: string;
  stitching: string;
  color: string;
  setShape: (shape: string) => void;
  setMaterial: (material: string) => void;
  setStitching: (stitching: string) => void;
  setColor: (color: string) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  shape: "chair",
  material: "wood",
  stitching: "none",
  color: "#000000",
  setShape: (shape) => set({ shape }),
  setMaterial: (material) => set({ material }),
  setStitching: (stitching) => set({ stitching }),
  setColor: (color) => set({ color }),
}));