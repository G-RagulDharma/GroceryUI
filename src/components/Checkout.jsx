import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X,Apple,ChevronDown } from "lucide-react";

const Checkout = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const cart = state?.cart || {};
    const cartSummary = state?.cartSummary || { items: 0, total: 0 };
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    const handleClose = () => {
        navigate('/');
    };

    const handleConfirmOrder = () => {
        navigate('/thank-you', { state: { orderTotal: cartSummary.total } });
    };

    return (
        <div className="bg-gray-200 w-full">
            <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
                    <div className="flex">
                        <img src="https://images.scalebranding.com/elegant-letter-p-nature-leaf-logo-e67a98d5-5111-44c2-8f53-ca18223c7510.jpg" className="w-8 h-8" alt="logo" />
                        <h3 className="text-2xl font-bold">PickBazar</h3>
                    </div>
                    <div className="flex mr-100">
                        <div className="flex items-center rounded-lg shadow-sm px-3 py-1 text-[#057A55] cursor-pointer hover:bg-gray-100">
                            <Apple/><span className="text-base p-1">Grocery</span>
                            <ChevronDown/>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <a href="/" className="text-gray-700 hover:text-[#057A55] text-base">Shops</a>
                        <a href="#" className="text-gray-700 hover:text-[#057A55] text-base">Offers</a>
                        <a href="#" className="text-gray-700 hover:text-[#057A55] text-base">Contact</a>
                        <div className="flex items-center space-x-1 cursor-pointer">
                            <span className="text-gray-700 hover:text-[#057A55] text-base">Pages</span>
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <button className="bg-[#057A55] text-white px-4 py-2 rounded hover:bg-green-600 text-sm font-medium">Join</button>
                        <button className="bg-[#057A55] text-white px-4 py-2 rounded hover:bg-green-600 text-sm font-medium">Become a Seller</button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto my-15 py-6 px-6 flex space-x-6">
                <div className="w-2/3 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                            Contact Number
                            <button className="ml-auto text-[#057A55]">+ Add</button>
                        </h2>
                        <div className="flex items-center border rounded-lg p-2">
                            <img src="data:image/jpeg;base64,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" alt="Flag" className="h-5 mr-2" />
                            <span>+91</span>
                            <input
                                type="text"
                                placeholder=""
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="ml-2 w-full outline-none"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                            Name
                        </h2>
                        <input
                            type="text"
                            placeholder=""
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg p-2 outline-none"
                        />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                            Billing Address
                            <button className="ml-auto text-[#057A55]">+ Add</button>
                        </h2>
                        <p className="text-gray-500">No Address Found</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
                            Shipping Address
                            <button className="ml-auto text-[#057A55]">+ Add</button>
                        </h2>
                        <p className="text-gray-500">No Address Found</p>
                    </div>

                    {/* Delivery Schedule */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">5</span>
                            Delivery Schedule
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="border rounded-lg p-4 text-left hover:bg-gray-100">
                                <p className="font-semibold">Express Delivery</p>
                                <p className="text-sm text-gray-500">90 min express delivery</p>
                            </button>
                            <button className="border rounded-lg p-4 text-left hover:bg-gray-100">
                                <p className="font-semibold">Morning</p>
                                <p className="text-sm text-gray-500">8:00 AM - 11:00 AM</p>
                            </button>
                            <button className="border rounded-lg p-4 text-left hover:bg-gray-100">
                                <p className="font-semibold">Noon</p>
                                <p className="text-sm text-gray-500">11:00 AM - 2:00 PM</p>
                            </button>
                            <button className="border rounded-lg p-4 text-left hover:bg-gray-100">
                                <p className="font-semibold">Afternoon</p>
                                <p className="text-sm text-gray-500">2:00 PM - 5:00 PM</p>
                            </button>
                            <button className="border rounded-lg p-4 text-left hover:bg-gray-100">
                                <p className="font-semibold">Evening</p>
                                <p className="text-sm text-gray-500">5:00 PM - 8:00 PM</p>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">6</span>
                            Order Note
                        </h2>
                        <textarea
                            className="w-full border rounded-lg p-2 outline-none"
                            rows="4"
                        ></textarea>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-1/3 h-fit bg-white p-8 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Your Order</h3>
                        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                            <X size={20} />
                        </button>
                    </div>
                    {Object.values(cart).length > 0 ? (
                        <div>
                            {Object.values(cart).map(({ product, quantity }) => (
                                <div key={product.id} className="flex justify-between items-center mb-2">
                                    <div className="flex items-center space-x-2">
                                        <img src={product.thumbnail} alt={product.title} className="w-8 h-8 object-cover rounded" />
                                        <div>
                                            <p className="text-sm font-medium">{product.title}</p>
                                            <p className="text-xs text-gray-500">{quantity} x {product.weight || '1lb'}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold">
                                        ${(product.price * (1 - product.discountPercentage / 100) * quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-semibold">Sub Total:</p>
                                    <p className="text-sm font-semibold">${cartSummary.total.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2">
                                <p>Tax</p>
                                <p>Calculated at checkout</p>
                            </div>
                            <div className="flex justify-between mb-4">
                                <p>Estimated Shipping</p>
                                <p>Calculated at checkout</p>
                            </div>
                            <button className="w-full bg-[#057A55] text-white py-2 rounded-full mt-4 cursor-pointer">
                                Check Availability
                            </button>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No items in cart</p>
                    )}
                    <button
                        className="w-full bg-[#057A55] text-white py-2 rounded-full mt-4 cursor-pointer"
                        onClick={handleConfirmOrder}
                        disabled={Object.values(cart).length === 0}
                    >
                        Confirm Order
                    </button>
                </div>

            </main>
        </div>
    );
};

export default Checkout;