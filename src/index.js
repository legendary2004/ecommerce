import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './contexts/AuthContext';
import CategoryContextProvider from './contexts/Category';
import ProductContextProvider from './contexts/ConfirmProduct';
import GetProductProvider from './contexts/GetProduct';
import ShopContextProvider from './contexts/ShopContext';
import ShoppingContextProvider from './contexts/CategoryToShop';
import ProductOverviewContextProvider from './contexts/ProductToShop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <ShoppingContextProvider>
      <CategoryContextProvider>
        <GetProductProvider>
          <ProductContextProvider>
            <ShopContextProvider>
              <ProductOverviewContextProvider>
                <App />
              </ProductOverviewContextProvider>
            </ShopContextProvider>
          </ProductContextProvider>
        </GetProductProvider>
      </CategoryContextProvider>
    </ShoppingContextProvider>
  </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
