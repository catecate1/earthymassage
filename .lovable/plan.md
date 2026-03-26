## Update Booking Page

**What changes:** Replace the broken Bookeo widget and temporary notice in `src/pages/Book.tsx` with a clean page that has:

1. A prominent "Book Now" button linking to `https://bookeo.com/earthymassage/customer` (opens in new tab)
2. Secondary contact options (call/text 413-327-8496) for clients who prefer that
3. Remove the `useEffect` script injection and `bookeo-container` div entirely
4. Remove the `useEffect` import since it's no longer needed

**File:** `src/pages/Book.tsx`
