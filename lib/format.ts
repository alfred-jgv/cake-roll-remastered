export function formatPHP(centavos: number): string {
    const pesos = centavos / 100;

    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(pesos);
}
