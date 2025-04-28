export function checkLike(a: number): string {
    if (a >= 1000000) {
        return (a / 1000000).toFixed(1) + "m";
    } else if (a >= 10000) {
        return (a / 1000).toFixed(0) + "k";
    } else if (a == 0) {
        return "";
    } else {
      return `${a}`;
    }
  }
  