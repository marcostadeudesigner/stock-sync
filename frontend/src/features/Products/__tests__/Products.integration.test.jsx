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

  test("fetches and shows products on initial load", async () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    // Verify API was called
    await waitFor(() => expect(apiModule.api.get).toHaveBeenCalledWith("/products/"));

    // Verify the component structure is rendered
    // Use partial text matching for dynamic content
    expect(await screen.findByText(/Novo Produto/)).toBeInTheDocument();
    expect(await screen.findByText(/Lista de Produtos/)).toBeInTheDocument();
    
    // Verify that the Redux store was updated correctly
    await waitFor(() => {
      const state = store.getState();
      expect(state.products.items).toHaveLength(2);
    });
  });

  test("can create a new product", async () => {
    const user = userEvent.setup();
    
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    // Wait for initial load
    await waitFor(() => expect(apiModule.api.get).toHaveBeenCalledWith("/products/"));

    // Fill out the new product form - use more specific selectors
    const productNameInput = await screen.findByLabelText(/nome do produto/i);
    const priceInput = await screen.findByLabelText(/preço/i);
    
    // Type into the inputs
    await user.type(productNameInput, "New Product");
    await user.type(priceInput, "15.99");

    // Find the submit button and wait for it to be enabled
    const submitButton = await screen.findByRole("button", { name: /criar produto/i });
    
    // Wait for button to become enabled (form validation passes)
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    }, { timeout: 3000 });

    await user.click(submitButton);

    // Verify the API was called to create the product
    await waitFor(() => expect(apiModule.api.post).toHaveBeenCalledWith(
      "/products/",
      expect.objectContaining({
        product: "New Product",
        price: "15.99"
      })
    ));
  });

  // Add a simpler test to verify basic functionality
  test("renders the main sections correctly", async () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    // Check for main section headings
    expect(await screen.findByText(/Novo Produto/)).toBeInTheDocument();
    expect(await screen.findByText(/Lista de Produtos/)).toBeInTheDocument();
    
    // Check for form elements
    expect(await screen.findByLabelText(/nome do produto/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/preço/i)).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: /criar produto/i })).toBeInTheDocument();
  });
});