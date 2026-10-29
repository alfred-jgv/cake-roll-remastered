export type SeedCategory = {
    slug: string;
    name: string;
    description: string;
    imagePath: string;
    sortOrder: number;
};

export type SeedVariant = {
    label: string;
    price: number;
    sortOrder: number;
};

export type SeedImage = {
    path: string;
    alt: string;
    sortOrder: number;
};

export type SeedProduct = {
    slug: string;
    name: string;
    description: string;
    basePrice: number;
    leadTimeDays: number;
    isFeatured: boolean;
    isAvailable: boolean;
    categorySlug: string;
    variants: SeedVariant[];
    images: SeedImage[];
};

export const seedCategories: SeedCategory[] = [
    {
        slug: "roll-cakes",
        name: "Roll cakes",
        description: "Soft sponge rolls with Filipino-inspired fillings.",
        imagePath: "categories/roll-cakes.webp",
        sortOrder: 1,
    },
    {
        slug: "celebration-cakes",
        name: "Celebration cakes",
        description: "Layered cakes for birthdays and gatherings.",
        imagePath: "categories/celebration-cakes.webp",
        sortOrder: 2,
    },
    {
        slug: "slices-and-bites",
        name: "Slices and bites",
        description: "Smaller treats when you want just a taste.",
        imagePath: "categories/slices-and-bites.webp",
        sortOrder: 3,
    },
];

export const seedProducts: SeedProduct[] = [
    {
        slug: "ube-roll",
        name: "Ube roll",
        description:
            "A soft vanilla sponge rolled around whipped ube cream. Best enjoyed chilled.",
        basePrice: 45000,
        leadTimeDays: 1,
        isFeatured: true,
        isAvailable: true,
        categorySlug: "roll-cakes",
        variants: [
            { label: "Whole roll", price: 45000, sortOrder: 1 },
            { label: "Half roll", price: 25000, sortOrder: 2 },
            { label: "Slice", price: 8500, sortOrder: 3 },
        ],
        images: [
            {
                path: "products/ube-roll/01-whole.webp",
                alt: "Whole ube roll cake",
                sortOrder: 1,
            },
        ],
    },
    {
        slug: "chocolate-ganache-roll",
        name: "Chocolate ganache roll",
        description:
            "Cocoa sponge with dark chocolate ganache and a light whipped filling.",
        basePrice: 48000,
        leadTimeDays: 1,
        isFeatured: true,
        isAvailable: true,
        categorySlug: "roll-cakes",
        variants: [
            { label: "Whole roll", price: 48000, sortOrder: 1 },
            { label: "Slice", price: 9000, sortOrder: 2 },
        ],
        images: [
            {
                path: "products/chocolate-ganache-roll/01-whole.webp",
                alt: "Chocolate ganache roll cake",
                sortOrder: 1,
            },
        ],
    },
    {
        slug: "mango-cream-roll",
        name: "Mango cream roll",
        description:
            "Vanilla sponge with whipped cream and sweet Philippine mango.",
        basePrice: 52000,
        leadTimeDays: 2,
        isFeatured: false,
        isAvailable: true,
        categorySlug: "roll-cakes",
        variants: [
            { label: "Whole roll", price: 52000, sortOrder: 1 },
            { label: "Slice", price: 9500, sortOrder: 2 },
        ],
        images: [
            {
                path: "products/mango-cream-roll/01-whole.webp",
                alt: "Mango cream roll cake",
                sortOrder: 1,
            },
        ],
    },
    {
        slug: "caramel-sans-rival",
        name: "Caramel sans rival",
        description:
            "Cashew meringue layers with buttercream and caramel. Currently unavailable.",
        basePrice: 78000,
        leadTimeDays: 3,
        isFeatured: false,
        isAvailable: false,
        categorySlug: "celebration-cakes",
        variants: [
            { label: "8-inch", price: 78000, sortOrder: 1 },
            { label: "Slice", price: 14500, sortOrder: 2 },
        ],
        images: [
            {
                path: "products/caramel-sans-rival/01-whole.webp",
                alt: "Caramel sans rival cake",
                sortOrder: 1,
            },
        ],
    },
    {
        slug: "strawberry-shortcake",
        name: "Strawberry shortcake",
        description:
            "Light chiffon layers, whipped cream, and fresh strawberries.",
        basePrice: 65000,
        leadTimeDays: 2,
        isFeatured: true,
        isAvailable: true,
        categorySlug: "celebration-cakes",
        variants: [
            { label: "6-inch", price: 65000, sortOrder: 1 },
            { label: "8-inch", price: 85000, sortOrder: 2 },
            { label: "10-inch", price: 110000, sortOrder: 3 },
        ],
        images: [
            {
                path: "products/strawberry-shortcake/01-whole.webp",
                alt: "Strawberry shortcake",
                sortOrder: 1,
            },
        ],
    },
    {
        slug: "mocha-chiffon",
        name: "Mocha chiffon",
        description:
            "Coffee chiffon with mocha buttercream. A classic merienda cake.",
        basePrice: 58000,
        leadTimeDays: 1,
        isFeatured: false,
        isAvailable: true,
        categorySlug: "celebration-cakes",
        variants: [
            { label: "Whole cake", price: 58000, sortOrder: 1 },
            { label: "Slice", price: 10500, sortOrder: 2 },
        ],
        images: [
            {
                path: "products/mocha-chiffon/01-whole.webp",
                alt: "Mocha chiffon cake",
                sortOrder: 1,
            },
        ],
    },
    {
        slug: "yema-cake",
        name: "Yema cake",
        description:
            "Soft yellow cake finished with a cooked yema topping.",
        basePrice: 42000,
        leadTimeDays: 1,
        isFeatured: false,
        isAvailable: true,
        categorySlug: "slices-and-bites",
        variants: [
            { label: "6-inch", price: 42000, sortOrder: 1 },
            { label: "8-inch", price: 56000, sortOrder: 2 },
        ],
        images: [
            {
                path: "products/yema-cake/01-whole.webp",
                alt: "Yema cake",
                sortOrder: 1,
            },
        ],
    },
    {
        slug: "chocolate-crinkles-box",
        name: "Chocolate crinkles box",
        description:
            "A dozen chewy chocolate crinkles dusted with powdered sugar.",
        basePrice: 28000,
        leadTimeDays: 1,
        isFeatured: false,
        isAvailable: true,
        categorySlug: "slices-and-bites",
        variants: [{ label: "Box of 12", price: 28000, sortOrder: 1 }],
        images: [
            {
                path: "products/chocolate-crinkles-box/01-box.webp",
                alt: "Box of chocolate crinkles",
                sortOrder: 1,
            },
        ],
    },
];
