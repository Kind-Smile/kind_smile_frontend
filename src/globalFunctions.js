export function hexToRgba(hex, opacity = 1) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
}

export function updateBenefactorProperty(property, newVal) {
  this.$store.commit("updateBenefactor", { property, newVal });
}

export function updateCharityProperty(property, newVal) {
  this.$store.commit("updateCharity", { property, newVal });
}

export function updateAgentProperty(property, newVal) {
  this.$store.commit("updateAgent", { property, newVal });
}

export const BASE_URL = "http://127.0.0.1:8000/";
