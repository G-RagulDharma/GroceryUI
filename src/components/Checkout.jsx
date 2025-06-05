import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, Apple, ChevronDown, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || {};
  const cartSummary = state?.cartSummary || { items: 0, total: 0 };
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState([""]);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [availabilityStatus, setAvailabilityStatus] = useState({});
  const [isChecking, setIsChecking] = useState(false);

  const handleClose = () => {
    navigate("/");
  };

  const checkAvailability = async () => {
    setIsChecking(true);
    try {
      const availability = {};
      for (const { product } of Object.values(cart)) {
        const response = await fetch(`https://dummyjson.com/products/${product.id}`);
        const data = await response.json();
        availability[product.id] = data.availabilityStatus;
      }
      setAvailabilityStatus(availability);

      const unavailableProducts = Object.entries(availability)
        .filter(([_, status]) => status === "Out of Stock")
        .map(([id]) => Object.values(cart).find((item) => item.product.id === parseInt(id)).product.title);

      if (unavailableProducts.length > 0) {
        Swal.fire({
          title: "Availability Issue",
          text: `The following products are out of stock: ${unavailableProducts.join(", ")}. Please remove them from your cart.`,
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "All Products Available",
          text: "All items in your cart are available for purchase.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to check product availability. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleConfirmOrder = () => {
    const isAnyOutOfStock = Object.values(availabilityStatus).some((status) => status === "Out of Stock");
    const isContactValid = contacts.every((contact) => contact.length === 10);
    const isBillingValid = billingAddresses.length > 0 && billingAddresses.every((addr) => addr.street && addr.city && addr.state && addr.zip);
    const isShippingValid = shippingAddresses.length > 0 && shippingAddresses.every((addr) => addr.street && addr.city && addr.state && addr.zip);

    if (!name) {
      Swal.fire({
        title: "Missing Information",
        text: "Please enter your name.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!isContactValid) {
      Swal.fire({
        title: "Invalid Contact",
        text: "Please provide at least one valid 10-digit phone number.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!isBillingValid) {
      Swal.fire({
        title: "Missing Billing Address",
        text: "Please provide at least one complete billing address.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!isShippingValid) {
      Swal.fire({
        title: "Missing Shipping Address",
        text: "Please provide at least one complete shipping address.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (isAnyOutOfStock) {
      Swal.fire({
        title: "Availability Issue",
        text: "Some products are out of stock. Please check availability and remove unavailable items.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    navigate("/thank-you", { state: { orderTotal: cartSummary.total } });
  };

  const addContact = () => {
    setContacts([...contacts, ""]);
  };

  const updateContact = (index, value) => {
    const newContacts = [...contacts];
    newContacts[index] = value;
    setContacts(newContacts);
  };

  const removeContact = (index) => {
    if (contacts.length === 1) {
      Swal.fire({
        title: "Cannot Delete",
        text: "At least one contact number is required.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const addAddress = (type) => {
    if (type === "billing") {
      setBillingAddresses([...billingAddresses, { street: "", city: "", state: "", zip: "" }]);
    } else {
      setShippingAddresses([...shippingAddresses, { street: "", city: "", state: "", zip: "" }]);
    }
  };

  const updateAddress = (type, index, field, value) => {
    if (type === "billing") {
      const newAddresses = [...billingAddresses];
      newAddresses[index][field] = value;
      setBillingAddresses(newAddresses);
    } else {
      const newAddresses = [...shippingAddresses];
      newAddresses[index][field] = value;
      setShippingAddresses(newAddresses);
    }
  };

  const removeAddress = (type, index) => {
    if (type === "billing") {
      if (billingAddresses.length === 1) {
        Swal.fire({
          title: "Cannot Delete",
          text: "At least one billing address is required.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
      setBillingAddresses(billingAddresses.filter((_, i) => i !== index));
    } else {
      if (shippingAddresses.length === 1) {
        Swal.fire({
          title: "Cannot Delete",
          text: "At least one shipping address is required.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
      setShippingAddresses(shippingAddresses.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <img
                src="https://images.scalebranding.com/elegant-letter-p-nature-leaf-logo-e67a98d5-5111-44c2-8f53-ca18223c7510.jpg"
                className="w-8 h-8"
                alt="logo"
              />
              <h3 className="text-xl sm:text-2xl font-bold ml-2">PickBazar</h3>
            </div>
            <div className="hidden sm:flex items-center rounded-lg shadow-sm px-3 py-1 text-[#057A55] cursor-pointer hover:bg-gray-100">
              <Apple />
              <span className="text-base p-1">Grocery</span>
              <ChevronDown />
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <a href="/" className="text-gray-700 hover:text-[#057A55] text-sm sm:text-base">
              Shops
            </a>
            <a href="#" className="text-gray-700 hover:text-[#057A55] text-sm sm:text-base">
              Offers
            </a>
            <a href="#" className="text-gray-700 hover:text-[#057A55] text-sm sm:text-base">
              Contact
            </a>
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="text-gray-700 hover:text-[#057A55] text-sm sm:text-base">Pages</span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <button className="bg-[#057A55] text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 text-xs sm:text-sm font-medium">
              Join
            </button>
            <button className="bg-[#057A55] text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 text-xs sm:text-sm font-medium">
              Become a Seller
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pt-20 flex flex-col lg:flex-row lg:space-x-6">
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
              Contact Number
              <button onClick={addContact} className="ml-auto text-[#057A55] text-sm">
                + Add
              </button>
            </h2>
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center border rounded-lg p-2 mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                  alt="Flag"
                  className="h-5 mr-2"
                />
                <span>+91</span>
                <input
                  type="number"
                  placeholder="Enter phone number"
                  value={contact}
                  pattern="[0-9]{10}"
                  onChange={(e) => updateContact(index, e.target.value)}
                  onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 10);
                  }}
                  title="Phone number must be exactly 10 digits"
                  className="ml-2 w-full outline-none"
                />
                <button
                  onClick={() => removeContact(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  title="Delete contact"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
              Name
            </h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2 outline-none"
            />
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
              Billing Address
              <button onClick={() => addAddress("billing")} className="ml-auto text-[#057A55] text-sm">
                + Add
              </button>
            </h2>
            {billingAddresses.length === 0 ? (
              <p className="text-gray-500">No Address Found</p>
            ) : (
              billingAddresses.map((address, index) => (
                <div key={index} className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Street"
                    value={address.street}
                    onChange={(e) => updateAddress("billing", index, "street", e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => updateAddress("billing", index, "city", e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => updateAddress("billing", index, "state", e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={address.zip}
                    onChange={(e) => updateAddress("billing", index, "zip", e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                  <button
                    onClick={() => removeAddress("billing", index)}
                    className="absolute bottom-2 -right-5 text-red-500 hover:text-red-700 cursor-pointer"
                    title="Delete billing address"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
              Shipping Address
              <button onClick={() => addAddress("shipping")} className="ml-auto text-[#057A55] text-sm">
                + Add
              </button>
            </h2>
            {shippingAddresses.length === 0 ? (
              <p className="text-gray-500">No Address Found</p>
            ) : (
              shippingAddresses.map((address, index) => (
                <div key={index} className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Street"
                    value={address.street}
                    onChange={(e) => updateAddress("shipping", index, "street", e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => updateAddress("shipping", index, "city", e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => updateAddress("shipping", index, "state", e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={address.zip}
                    onChange={(e) => updateAddress("shipping", index, "zip", e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                  <button
                    onClick={() => removeAddress("shipping", index)}
                    className="absolute bottom-2 -right-5 text-red-500 hover:text-red-700 cursor-pointer"
                    title="Delete shipping address"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">5</span>
              Delivery Schedule
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <span className="bg-[#057A55] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">6</span>
              Order Note
            </h2>
            <textarea
              className="w-full border rounded-lg p-2 outline-none"
              rows="4"
              placeholder="Add any special instructions"
            ></textarea>
          </div>
        </div>

        <div className="w-full lg:w-1/3 h-fit bg-white p-4 sm:p-8 rounded-lg shadow mt-6 lg:mt-0">
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
                      <p className="text-xs text-gray-500">{quantity} x {product.weight || "1lb"}</p>
                      {availabilityStatus[product.id] && (
                        <p className={`text-xs ${availabilityStatus[product.id] === "Out of Stock" ? "text-red-500" : "text-green-500"}`}>
                          {availabilityStatus[product.id]}
                        </p>
                      )}
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
              <button
                className="w-full bg-[#057A55] text-white py-2 rounded-full mb-4 cursor-pointer disabled:opacity-50"
                onClick={checkAvailability}
                disabled={isChecking}
              >
                {isChecking ? "Checking..." : "Check Availability"}
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No items in cart</p>
          )}
          <button
            className="w-full bg-[#057A55] text-white py-2 rounded-full cursor-pointer disabled:opacity-50"
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