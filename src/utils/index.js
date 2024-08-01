export const parseDMY = s => {
    let [d, m, y] = s.split(/\D/);
    return new Date(y, m - 1, d);
};