import React, { useEffect, useState } from "react";
import { Apple, ChevronDown, Ham, Coffee, Cat, SprayCan, Candy, CookingPot, Soup, Wine, MessageCircleX, ShoppingCart, ShoppingBag, X, Menu } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [savedOffers, setSavedOffers] = useState({
        express: false,
        cash: false,
        gift: false,
    });
    const [openDropdowns, setOpenDropdowns] = useState({
        fruits: false,
        meat: false,
        snacks: false,
        pet: false,
        home: false,
        dairy: false,
        cooking: false,
        breakfast: false,
        beverage: false,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();
    const [skip, setSkip] = useState(0);
    const limit = 4;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url;
                if (searchTerm) {
                    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}&skip=${skip}`;
                } else if (selectedCategory) {
                    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(selectedCategory)}&limit=${limit}&skip=${skip}`;
                } else {
                    url = `https://dummyjson.com/products/category/groceries?limit=${limit}&skip=${skip}`;
                }

                const response = await fetch(url);
                const data = await response.json();

                const filteredData = (searchTerm || selectedCategory)
                    ? (data.products || []).filter(product => product.category === "groceries")
                    : data.products || [];

                if (skip === 0) {
                    setProducts(filteredData);
                } else {
                    setProducts((prevProducts) => [...prevProducts, ...filteredData]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [skip, searchTerm, selectedCategory]);

    const filteredProducts = products;

    const handleLoadMore = () => {
        setSkip((prevSkip) => prevSkip + limit);
    };

    const cartSummary = Object.values(cart).reduce(
        (acc, { product, quantity }) => {
            const discountedPrice = product.price * (1 - product.discountPercentage / 100);
            acc.items += quantity;
            acc.total += discountedPrice * quantity;
            return acc;
        },
        { items: 0, total: 0 }
    );

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart[product.id] || { product, quantity: 0 };
            return {
                ...prevCart,
                [product.id]: {
                    product,
                    quantity: existingItem.quantity + 1,
                },
            };
        });
    };

    const handleRemoveFromCart = (productId) => {
        setCart((prevCart) => {
            const existingItem = prevCart[productId];
            if (!existingItem) return prevCart;
            const newQuantity = existingItem.quantity - 1;
            if (newQuantity <= 0) {
                const { [productId]: _, ...rest } = prevCart;
                return rest;
            }
            return {
                ...prevCart,
                [productId]: {
                    ...existingItem,
                    quantity: newQuantity,
                },
            };
        });
    };

    const handleCheckout = () => {
        navigate('/checkout', { state: { cart, cartSummary } });
    };

    const handleSaveOffer = (offerType) => {
        setSavedOffers((prev) => ({
            ...prev,
            [offerType]: true,
        }));

        const offerName = offerType === 'express' ? 'Express Delivery' : offerType === 'cash' ? 'Cash On Delivery' : 'Gift Voucher';

        Swal.fire({
            title: 'Success!',
            text: `${offerName} offer saved!`,
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    const toggleDropdown = (category) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setSelectedCategory("");
        setSkip(0);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSkip(0);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSearchTerm("");
        setSkip(0);
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen w-full overflow-y-auto">
            {/* Navbar */}
            <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
                    <div className="flex items-center space-x-3">
                        <button
                            className="sm:hidden text-gray-700"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="flex items-center">
                            <img
                                src="https://images.scalebranding.com/elegant-letter-p-nature-leaf-logo-e67a98d5-5111-44c2-8f53-ca18223c7510.jpg"
                                className="w-8 h-8"
                                alt="logo"
                            />
                            <h3 className="text-xl sm:text-2xl font-bold ml-2">PickBazar</h3>
                        </div>
                        <div className="hidden sm:flex items-center rounded-lg shadow-sm px-3 py-1 text-[#057A55] cursor-pointer hover:bg-gray-100">
                            <Apple /><span className="text-base p-1">Grocery</span>
                            <ChevronDown />
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center space-x-4">
                        <a href="#" className="text-gray-700 hover:text-[#057A55] text-sm sm:text-base">
                            Shops
                        </a>
                        <a href="#" className="text-gray-700 hover:text-[#057A55] text-sm sm:text-base">
                            Offers
                        </a>
                        <a href="#" className="text-gray-700 hover:text-[#057A55] text-sm sm:text-base">
                            Contact
                        </a>
                        <div className="flex items-center space-x-1 cursor-pointer">
                            <span className="text-gray-700 hover:text-[#057A55] text-sm sm:text-base">
                                Pages
                            </span>
                            <svg
                                className="w-4 h-4 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                        <button className="bg-[#057A55] text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 text-xs sm:text-sm font-medium">
                            Join
                        </button>
                        <button className="bg-[#057A55] text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 text-xs sm:text-sm font-medium">
                            Become a Seller
                        </button>
                    </div>
                    <button
                        className="sm:hidden text-gray-700"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                        <ShoppingBag size={24} />
                        {cartSummary.items > 0 && (
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartSummary.items}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Cart Display (Floating Button) */}
            <div
                className="hidden sm:block fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center bg-[#057A55] text-white px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                onClick={() => setIsCartOpen(!isCartOpen)}
            >
                <div className="flex items-center space-x-2">
                    <ShoppingBag size={20} />
                    <span className="text-sm font-medium">{cartSummary.items} Item{cartSummary.items !== 1 ? "s" : ""}</span>
                </div>
                <div className="bg-white text-green-400 rounded-lg p-2 mt-2">
                    <span className="text-sm font-semibold">${cartSummary.total.toFixed(2)}</span>
                </div>
            </div>

            {/* Cart Sidebar */}
            {isCartOpen && (
                <div className="fixed right-0 top-0 h-full w-full sm:w-80 bg-white shadow-lg z-50 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <ShoppingBag className="text-[#057A55]" size={20} />
                            <p className="text-sm font-medium text-gray-700">{cartSummary.items} Item{cartSummary.items !== 1 ? "s" : ""}</p>
                        </div>
                        <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                            <X size={20} />
                        </button>
                    </div>
                    {Object.values(cart).length > 0 ? (
                        Object.values(cart).map(({ product, quantity }) => (
                            <div key={product.id} className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="flex flex-col items-center bg-gray-100 rounded-lg p-1 px-2">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            +
                                        </button>
                                        <span className="text-sm font-medium">{quantity}</span>
                                        <button
                                            onClick={() => handleRemoveFromCart(product.id)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            -
                                        </button>
                                    </div>
                                    <img src={product.thumbnail} alt={product.title} className="w-10 h-10 object-cover rounded" />
                                    <div className="py-4 px-2">
                                        <p className="text-sm font-medium py-1">{product.title}</p>
                                        <p className="text-sm text-green-400">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</p>
                                        <p className="text-xs text-gray-500 py-1">{quantity} x {product.weight + 'W' || '1lb'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p className="text-sm font-semibold">${quantity * (product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</p>
                                    <button
                                        onClick={() => handleRemoveFromCart(product.id)}
                                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">Your cart is empty</p>
                    )}
                    <div className="absolute bottom-4 left-0 right-0 px-4">
                        <button
                            className="w-full bg-[#057A55] text-white py-2 rounded-full flex justify-between items-center px-4 cursor-pointer"
                            onClick={handleCheckout}
                            disabled={Object.values(cart).length === 0}
                        >
                            <span className="text-sm font-semibold">Checkout</span>
                            <span className="text-sm font-semibold bg-white text-green-400 rounded-full px-2 py-1">${cartSummary.total.toFixed(2)}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`relative ${isCartOpen ? "opacity-50 bg-gray-800" : "opacity-100"} transition-opacity pt-16`}>
                {/* Banner */}
                <div className="relative">
                    <img src="/grocery.png" className="h-48 sm:h-64 md:h-96 w-full object-cover" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center max-w-lg w-full px-4 text-center">
                        <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Groceries Delivered in 90 Minutes</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-4">Get your healthy foods & snacks delivered at your doorsteps all day every day</p>
                        <form className="flex items-center w-full" onSubmit={handleSearchSubmit}>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="voice-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 sm:ps-10 p-2 sm:p-2.5"
                                    placeholder="Search your products from here"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    required
                                />
                                {/* Clear Search Button */}
                                {searchTerm && (
                                    <button
                                        className="absolute right-24 top-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                                        onClick={() => setSearchTerm("")}
                                    >
                                        <span className="text-red-400 flex"><MessageCircleX /></span>
                                    </button>
                                )}
                                <button type="submit" className="absolute inset-y-0 end-0 flex items-center">
                                    <div className="inline-flex items-center py-2 px-2 sm:py-2.5 sm:px-3 text-xs sm:text-sm font-medium text-white bg-green-700 rounded-r-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                                        <svg
                                            className="w-4 h-4 me-1 sm:me-2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                        Search
                                    </div>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

                <div className="flex flex-col sm:flex-row w-full gap-4 p-4">
                    {/* Express Delivery */}
                    <div className="relative h-32 sm:h-40 w-full sm:w-1/3">
                        <img
                            src={savedOffers.express ? '/ExpressSaved.png' : '/Express.jpg'}
                            className="h-full w-full object-cover"
                            alt="Express Delivery"
                            onClick={() => !savedOffers.express && handleSaveOffer('express')}
                            style={{ cursor: savedOffers.express ? 'default' : 'pointer' }}
                        />
                    </div>

                    {/* Cash On Delivery */}
                    <div className="relative h-32 sm:h-40 w-full sm:w-1/3">
                        <img
                            src={savedOffers.cash ? '/CashSaved.png' : '/Cash.jpg'}
                            className="h-full w-full object-cover"
                            alt="Cash On Delivery"
                            onClick={() => !savedOffers.cash && handleSaveOffer('cash')}
                            style={{ cursor: savedOffers.cash ? 'default' : 'pointer' }}
                        />
                    </div>

                    {/* Gift Voucher */}
                    <div className="relative h-32 sm:h-40 w-full sm:w-1/3">
                        <img
                            src={savedOffers.gift ? '/GiftSaved.png' : '/Gift.jpg'}
                            className="h-full w-full object-cover"
                            alt="Gift Voucher"
                            onClick={() => !savedOffers.gift && handleSaveOffer('gift')}
                            style={{ cursor: savedOffers.gift ? 'default' : 'pointer' }}
                        />
                    </div>
                </div>

                {/* Sidebar and Products */}
                <div className="flex flex-1 pt-4 bg-gray-100">
                    {/* Sidebar */}
                    <aside className={`fixed sm:static top-0 left-0 z-40 w-64 h-full sm:h-fit bg-white shadow-lg transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
                        <div className="h-full px-3 py-4 overflow-y-auto">
                            <div className="flex justify-between items-center mb-4 sm:hidden">
                                <h3 className="text-lg font-bold">Categories</h3>
                                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                            <ul className="space-y-2 font-medium">
                                {selectedCategory && (
                                    <li>
                                        <button
                                            onClick={() => setSelectedCategory("")}
                                            className="inline-block p-2 text-red-400 rounded-lg text-right"
                                        >
                                            <span className="flex items-center justify-end cursor-pointer">
                                                <MessageCircleX className="w-5 h-5 mr-1" /> Clear
                                            </span>
                                        </button>
                                    </li>
                                )}
                                <li>
                                    <div className="flex items-center">
                                        <Apple className="w-5 h-5 flex-shrink-0" />
                                        <button onClick={() => toggleDropdown('fruits')} className="flex items-center p-2 text-gray-900 rounded-lg flex-1">
                                            <span className="ml-3 flex-1 text-left">Fruits & Vegetables</span>
                                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform ${openDropdowns.fruits ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    {openDropdowns.fruits && (
                                        <ul className="pl-8 space-y-1 mt-1">
                                            <li><button onClick={() => handleCategorySelect("Apple")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Apple</button></li>
                                            <li><button onClick={() => handleCategorySelect("Mango")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Mango</button></li>
                                            <li><button onClick={() => handleCategorySelect("Banana")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Banana</button></li>
                                            <li><button onClick={() => handleCategorySelect("Carrot")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Carrot</button></li>
                                            <li><button onClick={() => handleCategorySelect("Broccoli")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Broccoli</button></li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Ham className="w-5 h-5 flex-shrink-0" />
                                        <button onClick={() => toggleDropdown('meat')} className="flex items-center p-2 text-gray-900 rounded-lg flex-1">
                                            <span className="ml-3 flex-1 text-left">Meat & Fish</span>
                                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform ${openDropdowns.meat ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    {openDropdowns.meat && (
                                        <ul className="pl-8 space-y-1 mt-1">
                                            <li><button onClick={() => handleCategorySelect("Chicken")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Chicken</button></li>
                                            <li><button onClick={() => handleCategorySelect("Beef")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Beef</button></li>
                                            <li><button onClick={() => handleCategorySelect("Salmon")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Salmon</button></li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Coffee className="w-5 h-5 flex-shrink-0" />
                                        <button onClick={() => toggleDropdown('snacks')} className="flex items-center p-2 text-gray-900 rounded-lg flex-1">
                                            <span className="ml-3 flex-1 text-left">Snacks</span>
                                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform ${openDropdowns.snacks ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    {openDropdowns.snacks && (
                                        <ul className="pl-8 space-y-1 mt-1">
                                            <li><button onClick={() => handleCategorySelect("Chips")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Chips</button></li>
                                            <li><button onClick={() => handleCategorySelect("Cookies")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Cookies</button></li>
                                            <li><button onClick={() => handleCategorySelect("Nuts")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Nuts</button></li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Cat className="w-5 h-5 flex-shrink-0" />
                                        <button onClick={() => toggleDropdown('pet')} className="flex items-center p-2 text-gray-900 rounded-lg flex-1">
                                            <span className="ml-3 flex-1 text-left">Pet Care</span>
                                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform ${openDropdowns.pet ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    {openDropdowns.pet && (
                                        <ul className="pl-8 space-y-1 mt-1">
                                            <li><button onClick={() => handleCategorySelect("Dog Food")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Dog Food</button></li>
                                            <li><button onClick={() => handleCategorySelect("Cat Litter")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Cat Litter</button></li>
                                            <li><button onClick={() => handleCategorySelect("Pet Toys")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Pet Toys</button></li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <SprayCan className="w-5 h-5 flex-shrink-0" />
                                        <button onClick={() => toggleDropdown('home')} className="flex items-center p-2 text-gray-900 rounded-lg flex-1">
                                            <span className="ml-3 flex-1 text-left">Home & Cleaning</span>
                                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform ${openDropdowns.home ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    {openDropdowns.home && (
                                        <ul className="pl-8 space-y-1 mt-1">
                                            <li><button onClick={() => handleCategorySelect("Detergent")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Detergent</button></li>
                                            <li><button onClick={() => handleCategorySelect("Dish Soap")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Dish Soap</button></li>
                                            <li><button onClick={() => handleCategorySelect("Trash Bags")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Trash Bags</button></li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Candy className="w-5 h-5 flex-shrink-0 " />
                                        <button onClick={() => toggleDropdown('dairy')} className="flex items-center p-2 text-gray-900 rounded-lg flex-1">
                                            <span className="ml-3 flex-1 text-left">Dairy</span>
                                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform ${openDropdowns.dairy ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    {openDropdowns.dairy && (
                                        <ul className="pl-8 space-y-1 mt-1">
                                            <li><button onClick={() => handleCategorySelect("Milk")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Milk</button></li>
                                            <li><button onClick={() => handleCategorySelect("Cheese")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Cheese</button></li>
                                            <li><button onClick={() => handleCategorySelect("Yogurt")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Yogurt</button></li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <CookingPot className="w-5 h-5 flex-shrink-0" />
                                        <button onClick={() => toggleDropdown('cooking')} className="flex items-center p-2 text-gray-900 rounded-lg flex-1">
                                            <span className="ml-3 flex-1 text-left">Cooking</span>
                                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform ${openDropdowns.cooking ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    {openDropdowns.cooking && (
                                        <ul className="pl-8 space-y-1 mt-1">
                                            <li><button onClick={() => handleCategorySelect("Olive Oil")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Olive Oil</button></li>
                                            <li><button onClick={() => handleCategorySelect("Spices")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Spices</button></li>
                                            <li><button onClick={() => handleCategorySelect("Pasta")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Pasta</button></li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Soup className="w-5 h-5 flex-shrink-0" />
                                        <button onClick={() => toggleDropdown('breakfast')} className="flex items-center p-2 text-gray-900 rounded-lg flex-1">
                                            <span className="ml-3 flex-1 text-left">Breakfast</span>
                                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform ${openDropdowns.breakfast ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    {openDropdowns.breakfast && (
                                        <ul className="pl-8 space-y-1 mt-1">
                                            <li><button onClick={() => handleCategorySelect("Cereal")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Cereal</button></li>
                                            <li><button onClick={() => handleCategorySelect("Bread")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Bread</button></li>
                                            <li><button onClick={() => handleCategorySelect("Jam")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Jam</button></li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Wine className="w-5 h-5 flex-shrink-0" />
                                        <button onClick={() => toggleDropdown('beverage')} className="flex items-center p-2 text-gray-900 rounded-lg flex-1">
                                            <span className="ml-3 flex-1 text-left">Beverage</span>
                                            <ChevronDown className="ml-2 transition-transform ${openDropdowns.beverage ? 'rotate-180' : ''} w-5 h-5 flex-shrink-0 ml-2" />
                                        </button>
                                    </div>
                                    {openDropdowns.beverage && (
                                        <ul className="pl-8 space-y-1 mt-1">
                                            <li><button onClick={() => handleCategorySelect("Coffee")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Coffee</button></li>
                                            <li><button onClick={() => handleCategorySelect("Tea")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Tea</button></li>
                                            <li><button onClick={() => handleCategorySelect("Juice")} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">Juice</button></li>
                                        </ul>
                                    )}
                                </li>
                            </ul>


                        </div>
                    </aside>

                    {/* Main Product Grid */}
                    <main className="flex-1 pt-4 px-4 sm:ml-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => {
                                    const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
                                    const quantityInCart = cart[product.id]?.quantity || 0;
                                    const isHovered = hoveredProductId === product.id;

                                    return (
                                        <div
                                            key={product.id}
                                            className="relative flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
                                        >
                                            {product.discountPercentage > 0 && (
                                                <span className="absolute top-2 right-2 text-xs font-semibold text-white bg-yellow-500 px-2 py-1 rounded-full">
                                                    {product.discountPercentage}%
                                                </span>
                                            )}
                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                className="h-24 sm:h-32 w-full object-cover rounded-lg mb-2"
                                            />
                                            <div className="flex w-full items-center justify-between p-2 sm:p-3 relative group">
                                                <div className="flex flex-col space-y-1 sm:space-y-2">
                                                    <span className="text-xs sm:text-sm font-medium text-gray-700">{product.title}</span>
                                                    {product.discountPercentage > 0 && (
                                                        <span className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
                                                    )}
                                                    <span className="text-xs sm:text-sm font-semibold text-green-600">${discountedPrice}</span>
                                                </div>
                                                <div
                                                    className="relative"
                                                    onMouseEnter={() => setHoveredProductId(product.id)}
                                                    onMouseLeave={() => setHoveredProductId(null)}
                                                >
                                                    {isHovered && quantityInCart > 0 ? (
                                                        <div className="flex items-center space-x-2 bg-green-400 text-white rounded-full">
                                                            <button
                                                                onClick={() => handleRemoveFromCart(product.id)}
                                                                className="px-2 py-1 rounded text-xs sm:text-sm font-medium cursor-pointer"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="text-xs sm:text-sm font-medium">{quantityInCart}</span>
                                                            <button
                                                                onClick={() => handleAddToCart(product)}
                                                                className="px-2 py-1 rounded text-xs sm:text-sm font-medium cursor-pointer"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleAddToCart(product)}
                                                            className="text-[#057A55] shadow-lg px-2 py-1 rounded-full hover:bg-green-300 text-xs sm:text-sm font-medium cursor-pointer"
                                                        >
                                                            <span className="flex space-x-1 sm:space-x-2 px-1 sm:px-2">
                                                                <ShoppingCart size={16} />
                                                                <span>Cart</span>
                                                            </span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-center col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                                    {products.length === 0 ? "Failed to load products" : "No products match your search or category"}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center m-2">
                            {filteredProducts.length > 0 && (
                                <button
                                    onClick={handleLoadMore}
                                    className="mt-4 px-4 py-2 bg-[#057A55] text-white rounded hover:bg-green-600 cursor-pointer text-sm sm:text-base"
                                >
                                    Load More
                                </button>
                            )}
                        </div>
                    </main>
                </div>
            </div >
        </div >
    );
};

export default Home;