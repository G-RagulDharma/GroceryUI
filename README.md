GroceriesUI
Sample Images:

![Image](https://github.com/user-attachments/assets/dc7f4155-a951-4e71-a82e-8a5922e9c692)
![Image](https://github.com/user-attachments/assets/96d333bd-bf46-434f-bbca-85958a9ccb3b)
![Image](https://github.com/user-attachments/assets/dcef8b0e-5baa-47a5-b031-182c30b57c73)
![Image](https://github.com/user-attachments/assets/eb1962fb-9887-4c7f-86af-1020a9692711)


Description:
A React-based grocery shopping UI featuring a responsive navbar, category sidebar, product listing with pagination, and a cart system with add/remove functionality and checkout.

Overview:
GroceriesUI is a front-end web application built with React, designed to simulate an online grocery shopping experience. It fetches product data from the dummyjson.com API and provides a user-friendly interface with features like a responsive navbar, category sidebar, product listing, and a cart system. The app is styled using Tailwind CSS for a modern and responsive design.

Features:
- Responsive Navbar: Includes a mobile-friendly hamburger menu, cart toggle, and navigation links.
- Category Sidebar: Displays categories (e.g., Fruits & Vegetables, Meat & Fish) with a toggle for mobile screens.
- Product Listing: Fetches grocery products with pagination (infinite scroll) from the dummyjson.com API.
- Cart System: Add, remove, and update quantities of products in the cart, with a sidebar to view cart details.
- Floating Cart Button: Quick access to the cart with a summary of items and total cost (visible on larger screens).
- Checkout Option: A checkout button in the cart sidebar (functionality can be extended).

Tech Stack:
- React: JavaScript library for building the user interface.
- Tailwind CSS: Utility-first CSS framework for styling.
- Lucide React: Icon library for UI elements (e.g., ShoppingBag, ChevronDown).
- DummyJSON API: External API for fetching grocery product data (https://dummyjson.com/products/category/groceries).

Prerequisites:
Before running the project, ensure you have the following installed:
- Node.js (v14 or higher) and npm (v6 or higher) or yarn.
- A code editor like VS Code.
- Git (to clone the repository).

Setup Instructions:
Follow these steps to set up and run the project locally:

1. Clone the Repository:
   git clone https://github.com/G-RagulDharma/GroceryUI.git
   

2. Navigate to the Project Folder:
   cd FoodUI

3. Install Dependencies:
   Using npm:
   npm install
   Or using yarn:
   yarn install

4. Run the Development Server:
   Using npm:
   npm start
   Or using yarn:
   yarn start
   The app will open in your browser at http://localhost:3000.

Usage:
- Browse Products: Scroll through the product list to view groceries. The app fetches more products as you scroll (pagination).
- Add to Cart: Click "Add to Cart" on any product to add it to your cart. You can add multiple quantities of the same product.
- View Cart:
  On mobile: Use the cart icon in the navbar to toggle the cart sidebar.
  On larger screens: Click the floating cart button on the right to open the cart sidebar.
- Manage Cart: In the cart sidebar, increase/decrease quantities or remove items.
- Checkout: Click the "Checkout" button in the cart sidebar (extendable for actual checkout functionality).

Project Structure:
GroceriesUI/
  public/
    index.html        Main HTML file
    ...
  src/
    components/
      Home.jsx        Main component with navbar, sidebar, product list, and cart
    App.jsx           Root component
    index.js          Entry point
    ...
  package.json        Project dependencies and scripts
  tailwind.config.js  Tailwind CSS configuration
  README.txt          Project documentation

