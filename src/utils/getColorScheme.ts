export function getColorScheme(forcePass: string) {
    if (forcePass === "Forte") {
        return "emerald"; 
      } else if (forcePass === "Boa") {
        return "yellow";
      } else if (forcePass === "Média") {
        return "warning";
      } else {
        return "red";
      }
}