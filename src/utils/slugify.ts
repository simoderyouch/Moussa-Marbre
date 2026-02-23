/**
 * Converts a string into a URL-friendly slug.
 * Example: "Blanc perle" -> "blanc-perle"
 * Example: "Marbre Noir Absolu" -> "marbre-noir-absolu"
 */
export const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
