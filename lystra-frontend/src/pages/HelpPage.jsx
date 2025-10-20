import { useSelector } from "react-redux";
import AuthNavbar from "@/layouts/shared/AuthNavbar";
import Navbar from "@/layouts/shared/Navbar";

const HelpPage = () => {
  const role = useSelector((state) => state.auth.role);

  const generalHelp = (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome to Lystra Help Center
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Whether you are a buyer or a seller, here how to get started on our platform.
      </p>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">🔐 Do I need an account?</h2>
        <p className="text-gray-600">
          Yes, to buy, sell, or contact other users, you all need to create a free account and log in.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">🧭 What can I do here?</h2>
        <p className="text-gray-600">
          You can post ads to sell items, browse listings, and contact sellers or buyers directly.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">📞 Need help?</h2>
        <p className="text-gray-600">
          Contact us at <a href="mailto:lystra@gmail.com" className="text-blue-600 underline">lystra@gmail.com</a> or call us at <span className="font-medium">+91-90000-00000</span>.
        </p>
      </div>
    </>
  );

  const sellerHelp = (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Help & Support for Sellers
      </h1>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">💬 How can I post an ad?</h2>
        <p className="text-gray-600">
          To post an ad, go to your dashboard and click on &quot;Create New Ad&quot;. Fill in the required details and submit the form.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">💸 How does boosting an ad work?</h2>
        <p className="text-gray-600">
          Boosting your ad increases visibility by placing it at the top of the list. You can choose from different durations and pay accordingly.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">⚙️ How can I edit or delete an ad?</h2>
        <p className="text-gray-600">
          Go to your posted ads section, click the menu (⋮) on the ad card, and choose &quot;Edit&quot; or &quot;Delete&quot;.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">📞 Need further help?</h2>
        <p className="text-gray-600">
          Contact us at <a href="mailto:lystra@gmail.com" className="text-blue-600 underline">lystra@gmail.com</a> or call us at <span className="font-medium">+91-90000-00000</span>.
        </p>
      </div>
    </>
  );

  const buyerHelp = (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Buyer Help Center
      </h1>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">🛍️ How do I buy a product or service?</h2>
        <p className="text-gray-600">
          Browse listings from the homepage or search using keywords. Click on an ad to view details and contact the seller via chat or phone.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">💬 How can I contact a seller?</h2>
        <p className="text-gray-600">
          On each ad, you&#39;ll find options to either send a message via chat or call the seller directly. Make sure you&#39;re logged in to initiate contact.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">🔐 Is it safe to make payments on this platform?</h2>
        <p className="text-gray-600">
          For your security, always use the built-in payment system if available. Avoid sending money outside the platform unless you trust the seller.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">🚩 How do I report a suspicious listing?</h2>
        <p className="text-gray-600">
          Every ad has a &quot;Report&quot; option. Click on it and select the appropriate reason. Our team will review and take necessary actions.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">📦 What if I don&#39;t receive the item?</h2>
        <p className="text-gray-600">
          If you used our secure payment system, contact support immediately. If the payment was external, we recommend resolving it with the seller or reporting the incident.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4 p-6">
        <h2 className="text-xl font-semibold mb-2">📞 Still need help?</h2>
        <p className="text-gray-600">
          Email us at <a href="mailto:lystra@gmail.com" className="text-blue-600 underline">lystra@gmail.com</a> or call <span className="font-medium">+91-90000-00000</span>.
        </p>
      </div>
    </>
  );

  return (
    <>
      {!role?<Navbar/>:<AuthNavbar/>}
      <div className="max-w-4xl mx-auto py-10 px-4">
        {!role ? generalHelp : role === "seller" ? sellerHelp : buyerHelp}
      </div>
    </>
  );
};

export default HelpPage;
