'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import type { CatalogItem } from './catalog-types';
import { track } from './analytics';
import { ui } from '@/data/ui';

const STORAGE_KEY = 'mevae.cart.v1';
const MAX_QTY = 99;

export interface CartEntry {
  id: string;
  qty: number;
}

type Action =
  | { type: 'hydrate'; items: CartEntry[] }
  | { type: 'add'; id: string; qty?: number }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

function itemsReducer(state: CartEntry[], action: Action): CartEntry[] {
  switch (action.type) {
    case 'hydrate':
      return action.items;
    case 'add': {
      const add = action.qty ?? 1;
      const existing = state.find((e) => e.id === action.id);
      if (existing) return state.map((e) => (e.id === action.id ? { ...e, qty: Math.min(MAX_QTY, e.qty + add) } : e));
      return [...state, { id: action.id, qty: Math.min(MAX_QTY, add) }];
    }
    case 'setQty':
      if (action.qty <= 0) return state.filter((e) => e.id !== action.id);
      return state.map((e) => (e.id === action.id ? { ...e, qty: Math.min(MAX_QTY, Math.floor(action.qty)) } : e));
    case 'remove':
      return state.filter((e) => e.id !== action.id);
    case 'clear':
      return [];
  }
}

interface CartState {
  hydrated: boolean;
  items: CartEntry[];
}

const reducer = (state: CartState, action: Action): CartState => ({
  hydrated: state.hydrated || action.type === 'hydrate',
  items: itemsReducer(state.items, action),
});

export interface CartLine extends CartEntry {
  product: CatalogItem & { unitPrice: number };
  lineTotal: number;
}

interface CartContextValue {
  hydrated: boolean;
  lines: CartLine[];
  count: number;
  subtotal: number;
  catalog: CatalogItem[];
  isOpen: boolean;
  announcement: string;
  open: () => void;
  close: () => void;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Only products that are visible AND available can live in the cart. */
const purchasable = (p: CatalogItem | undefined): p is CatalogItem & { unitPrice: number } =>
  !!p && p.availability === 'available' && typeof p.unitPrice === 'number';

export function CartProvider({ catalog, children }: { catalog: CatalogItem[]; children: ReactNode }) {
  const [{ items: entries, hydrated }, dispatch] = useReducer(reducer, { hydrated: false, items: [] });
  const [isOpen, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const byId = useMemo(() => new Map(catalog.map((p) => [p.id, p])), [catalog]);

  // Hydrate from localStorage after mount — server and first client render both see an empty cart.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      const stored = Array.isArray(parsed)
        ? parsed
            .filter((e): e is CartEntry => !!e && typeof e.id === 'string' && Number.isFinite(e.qty) && e.qty > 0)
            .filter((e) => purchasable(byId.get(e.id)))
            .map((e) => ({ id: e.id, qty: Math.min(MAX_QTY, Math.floor(e.qty)) }))
        : [];
      dispatch({ type: 'hydrate', items: stored });
    } catch {
      /* storage unavailable — start empty */
      dispatch({ type: 'hydrate', items: [] });
    }
  }, [byId]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      /* ignore quota / private mode */
    }
  }, [entries, hydrated]);

  // Keep tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        const items = JSON.parse(e.newValue ?? '[]') as CartEntry[];
        dispatch({ type: 'hydrate', items: items.filter((i) => purchasable(byId.get(i.id))) });
      } catch {
        /* ignore */
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [byId]);

  const lines = useMemo<CartLine[]>(
    () =>
      entries
        .map((e) => {
          const product = byId.get(e.id);
          return purchasable(product) ? { ...e, product, lineTotal: product.unitPrice * e.qty } : null;
        })
        .filter((l): l is CartLine => l !== null),
    [entries, byId],
  );

  const add = useCallback(
    (id: string, qty = 1) => {
      const product = byId.get(id);
      if (!purchasable(product)) return;
      dispatch({ type: 'add', id, qty });
      setAnnouncement(ui.cart.addedAnnouncement(product.name));
      track('add_to_cart', { id, qty });
      setOpen(true);
    },
    [byId],
  );

  const value: CartContextValue = {
    hydrated,
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
    catalog,
    isOpen,
    announcement,
    open: useCallback(() => setOpen(true), []),
    close: useCallback(() => setOpen(false), []),
    add,
    setQty: useCallback((id: string, qty: number) => dispatch({ type: 'setQty', id, qty }), []),
    remove: useCallback((id: string) => {
      dispatch({ type: 'remove', id });
      track('remove_from_cart', { id });
    }, []),
    clear: useCallback(() => dispatch({ type: 'clear' }), []),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
