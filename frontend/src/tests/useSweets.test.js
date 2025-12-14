import { renderHook, act } from "@testing-library/react";
import useSweets from "../hooks/useSweets";

const mockSweets = Array.from({ length: 25 }).map((_, i) => ({
  name: `Sweet ${i + 1}`,
  price: 100,
  quantity: 10,
  image: "img.jpg"
}));

test("returns first 10 sweets on page 1", () => {
  const { result } = renderHook(() => useSweets(mockSweets));

  expect(result.current.currentSweets.length).toBe(10);
  expect(result.current.currentSweets[0].name).toBe("Sweet 1");
});

test("moves to next page", () => {
  const { result } = renderHook(() => useSweets(mockSweets));

  act(() => {
    result.current.nextPage();
  });

  expect(result.current.page).toBe(2);
  expect(result.current.currentSweets[0].name).toBe("Sweet 11");
});

test("moves to previous page", () => {
  const { result } = renderHook(() => useSweets(mockSweets));

  act(() => {
    result.current.nextPage();
    result.current.prevPage();
  });

  expect(result.current.page).toBe(1);
  expect(result.current.currentSweets[0].name).toBe("Sweet 1");
});

test("cannot go below page 1", () => {
  const { result } = renderHook(() => useSweets(mockSweets));

  act(() => {
    result.current.prevPage();
  });

  expect(result.current.page).toBe(1);
});
