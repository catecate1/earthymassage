import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import DiscountWheel from "@/components/DiscountWheel";

const STORAGE_KEY = "ew_discount_wheel";

if (!("IntersectionObserver" in window)) {
  (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

/** Park a finished spin one hour in the past, so the 12-hour wait is still running. */
function seed(index: number) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ at: Date.now() - 60 * 60 * 1000, index }),
  );
}

afterEach(() => {
  cleanup();
  window.localStorage.removeItem(STORAGE_KEY);
});

describe("wheel wording", () => {
  it("invites a first-time visitor to spin for 10% off 60 or 75 minutes", () => {
    render(<DiscountWheel />);

    expect(
      screen.getByText(/win 10% off 60 minutes or 10% off 75 minutes/i),
    ).toBeInTheDocument();
  });

  it("keeps the spin-again wording away from a winner", () => {
    seed(6); // 10% off 75 minutes

    render(<DiscountWheel />);

    expect(screen.getByText(/Use promo code/i)).toBeInTheDocument();
    expect(screen.queryByText(/spin again/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/you can spin again in/i)).not.toBeInTheDocument();
  });

  it("tells someone who drew a blank when they can spin again", () => {
    seed(1); // blank section

    render(<DiscountWheel />);

    expect(screen.getByText(/No luck this time/i)).toBeInTheDocument();
    expect(screen.getByText(/you can spin again in/i)).toBeInTheDocument();
  });
});
