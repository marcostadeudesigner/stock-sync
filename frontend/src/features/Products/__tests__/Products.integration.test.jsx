import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../productsSlice";
import * as apiModule from "@shared/api";
import { Products } from "../Products";

jest.mock("@shared/api", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedProducts = [
  { id: 1, product: "X", price: "1.00" },
  { id: 2, product: "Y", price: "2.00" },
];

describe("Products (integration)", () => {
  let store;

  beforeEach(() => {
    // create an isolated test store for each test
    store = configureStore({
      reducer: { products: productsReducer },
    });

    apiModule.api.get.mockResolvedValue({ data: mockedProducts });
    apiModule.api.post.mockResolvedValue({ status: 201, data: mockedProducts[0] });
    apiModule.api.put.mockResolvedValue({ status: 200, data: mockedProducts[0] });
    apiModule.api.delete.mockResolvedValue({ status: 204 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and shows products, opens edit dialog", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    // wait for products to be fetched
    await waitFor(() => expect(apiModule.api.get).toHaveBeenCalledWith("/products/"));
    expect(await screen.findByText(/X/)).toBeInTheDocument();
    expect(await screen.findByText(/Y/)).toBeInTheDocument();

    // open edit dialog for first product
    const editButtons = screen.getAllByRole("button", { name: /Editar/i });
    await user.click(editButtons[0]);

    // dialog should open with Save button
    expect(await screen.findByRole("button", { name: /Salvar/i })).toBeInTheDocument();
  });
});