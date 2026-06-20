import { create } from "zustand";
import { BUNDLE_OFFERS, PRODUCTS } from "@/content/products";
import { getPayableBundlePriceSar } from "@/lib/pricing";

export type CartItemSource = "product_page" | "cart_cross_sell" | "checkout_upsell";

export type CartItem = {
  lineId: string;
  productId: string;
  slug: string;
  nameAr: string;
  quantity: number;
  bundlePriceSar: number;
  imageTheme: string;
  source: CartItemSource;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;

  addBundle: (
    productId: string,
    slug: string,
    nameAr: string,
    quantity: number,
    imageTheme: string,
    source?: CartItemSource
  ) => void;
  removeLine: (lineId: string) => void;
  updateBundle: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;

  getTotal: () => number;
  getItemCount: () => number;
};

function getBundlePrice(quantity: number, productId?: string): number {
  const product = productId ? PRODUCTS.find((p) => p.id === productId) : undefined;
  return getPayableBundlePriceSar(quantity, product?.bundleOffers ?? BUNDLE_OFFERS);
}

const SOURCE_PRIORITY: Record<CartItemSource, number> = {
  product_page: 3,
  cart_cross_sell: 2,
  checkout_upsell: 1,
};

function pickSource(current: CartItemSource, next: CartItemSource): CartItemSource {
  return SOURCE_PRIORITY[next] >= SOURCE_PRIORITY[current] ? next : current;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  isCheckoutOpen: false,

  addBundle: (productId, slug, nameAr, quantity, imageTheme, source = "product_page") => {
    const existing = get().items.find(
      (item) => item.productId === productId && item.source !== "checkout_upsell"
    );
    if (existing) {
      set((state) => ({
        items: state.items.map((item) =>
          item.lineId === existing.lineId
            ? {
                ...item,
                slug,
                nameAr,
                imageTheme,
                quantity,
                bundlePriceSar: getBundlePrice(quantity, productId),
                source: pickSource(item.source, source),
              }
            : item
        ),
      }));
    } else {
      const lineId = `${productId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      set((state) => ({
        items: [
          ...state.items,
          {
            lineId,
            productId,
            slug,
            nameAr,
            quantity,
            bundlePriceSar: getBundlePrice(quantity, productId),
            imageTheme,
            source,
          },
        ],
      }));
    }
  },

  removeLine: (lineId) => {
    set((state) => ({ items: state.items.filter((item) => item.lineId !== lineId) }));
  },

  updateBundle: (lineId, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity, bundlePriceSar: getBundlePrice(quantity, item.productId) }
          : item
      ),
    }));
  },

  clearCart: () => set({ items: [], isOpen: false, isCheckoutOpen: false }),

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),

  getTotal: () => {
    return get().items.reduce(
      (sum, item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        const offers = product?.bundleOffers ?? BUNDLE_OFFERS;
        return sum + getPayableBundlePriceSar(item.quantity, offers);
      },
      0
    );
  },

  getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
