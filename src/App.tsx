import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  specs: string;
  price: number;
  monthlyPrice: number;
  image: string;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);

  const products = [
    {
      id: 1,
      name: "Samsung Galaxy A54",
      specs: "8/256 GB",
      price: 4999000,
      monthlyPrice: 500000,
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-202210?wid=940&hei=1112&fmt=png-alpha&.v=1664412888586",
    },
    {
      id: 2,
      name: "iPhone 15",
      specs: "128 GB",
      price: 13999000,
      monthlyPrice: 1200000,
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-202210?wid=940&hei=1112&fmt=png-alpha&.v=1664412888586",
    },
    {
      id: 3,
      name: "MacBook Air M2",
      specs: "8/256 GB",
      price: 15999000,
      monthlyPrice: 1500000,
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-202210?wid=940&hei=1112&fmt=png-alpha&.v=1664412888586",
    },
    {
      id: 4,
      name: "Samsung Neo QLED TV",
      specs: '65"',
      price: 19999000,
      monthlyPrice: 1800000,
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-202210?wid=940&hei=1112&fmt=png-alpha&.v=1664412888586",
    },
    {
      id: 5,
      name: "iPad Pro",
      specs: '11" 256GB',
      price: 11999000,
      monthlyPrice: 1000000,
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-202210?wid=940&hei=1112&fmt=png-alpha&.v=1664412888586",
    },
  ];

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-[#F4F5F5] py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <span>Toshkent</span>
            <span>Topshirish punktlari</span>
          </div>
          <div className="flex gap-4">
            <span>Alifshopda soting</span>
            <span>Yetkazib berish va to'lash</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#00C48C] font-bold text-2xl">
              <Menu className="w-8 h-8" />
              <span>alifshop</span>
            </div>

            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Mahsulotlarni qidirish"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00C48C]"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <button className="flex flex-col items-center text-gray-600">
                <Heart className="w-6 h-6" />
                <span className="text-xs">Sevimlilar</span>
              </button>
              <button
                className="flex flex-col items-center text-gray-600 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="text-xs">Savatcha</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#00C48C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button className="flex flex-col items-center text-gray-600">
                <User className="w-6 h-6" />
                <span className="text-xs">Kirish</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <nav className="mt-4">
            <ul className="flex gap-6">
              <li className="flex items-center gap-1 text-gray-700 hover:text-[#00C48C] cursor-pointer">
                Smartfonlar <ChevronDown className="w-4 h-4" />
              </li>
              <li className="flex items-center gap-1 text-gray-700 hover:text-[#00C48C] cursor-pointer">
                Noutbuklar <ChevronDown className="w-4 h-4" />
              </li>
              <li className="flex items-center gap-1 text-gray-700 hover:text-[#00C48C] cursor-pointer">
                Televizorlar <ChevronDown className="w-4 h-4" />
              </li>
              <li className="text-gray-700 hover:text-[#00C48C] cursor-pointer">
                Maishiy texnika
              </li>
              <li className="text-gray-700 hover:text-[#00C48C] cursor-pointer">
                Mebel
              </li>
              <li className="text-[#00C48C] cursor-pointer">
                Barcha kategoriyalar
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[400px] bg-white shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Savatcha ({totalItems})</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 flex flex-col h-[calc(100%-180px)] overflow-auto">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  Savatcha bo'sh
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.specs}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            className="w-6 h-6 rounded-full border flex items-center justify-center"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="w-6 h-6 rounded-full border flex items-center justify-center"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-sm"
                        >
                          O'chirish
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatPrice(item.monthlyPrice * item.quantity)}/oy
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Jami:</span>
                <span className="font-bold text-xl">
                  {formatPrice(totalAmount)}
                </span>
              </div>
              <button
                className="w-full bg-[#00C48C] text-white py-3 rounded-lg font-medium hover:bg-[#00B37F] transition-colors"
                disabled={cart.length === 0}
              >
                Buyurtma berish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=400"
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
            <div className="text-white ml-12">
              <h1 className="text-4xl font-bold mb-4">Eng yaxshi takliflar</h1>
              <p className="text-xl mb-6">
                Mashhur mahsulotlarga 50% gacha chegirma
              </p>
              <button className="bg-[#00C48C] text-white px-6 py-3 rounded-lg flex items-center gap-2">
                Barchasini ko'rish <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          {[
            {
              name: "Smartfonlar",
              image: "https://cdn1.ozone.ru/s3/multimedia-2/6633075058.jpg",
            },
            {
              name: "Noutbuklar",
              image:
                "https://images.unsplash.com/photo-1585435465941-b5172f1b3600",
            },
            {
              name: "Televizorlar",
              image:
                "https://images.samsung.com/is/image/samsung/p6pim/uk/qa65qn90aauxxu/gallery/uk-neo-qled-tv-qn90a-qa65qn90aauxxu-431873988?$650_519_PNG$",
            },
            {
              name: "Muzlatgichlar",
              image:
                "https://images.samsung.com/is/image/samsung/p6pim/uk/rt38k5530s8-eu/gallery/uk-top-mount-freezer-rt38k5530s8-eu-531940709?$650_519_PNG$",
            },
            {
              name: "Mebellar",
              image:
                "https://www.ikea.com/images/e7/b0/e7b05dfb1c98c79e607d9c9c86ff9a22.jpg",
            },
            {
              name: "Kiyimlar",
              image:
                "https://static.zara.net/photos///2023/I/0/1/p/2011/110/800/2/w/750/2011110800_2_1_1.jpg?ts=1696933573738",
            },
          ].map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div
                className="aspect-square bg-gray-100 rounded-lg mb-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>
              <h3 className="text-center text-gray-700">{category.name}</h3>
            </div>
          ))}
        </div>

        {/* Popular Products */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Mashhur mahsulotlar</h2>
          <div className="grid grid-cols-5 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-lg mb-4"
                  />
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="text-sm text-gray-500">{product.specs}</div>
                  <div className="text-lg font-bold">
                    {formatPrice(product.price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    oyiga {formatPrice(product.monthlyPrice)} dan
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-[#00C48C] text-white py-2 rounded-lg font-medium hover:bg-[#00B37F] transition-colors"
                  >
                    Savatga qo'shish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Kompaniya haqida</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Biz haqimizda</li>
                <li>Vakansiyalar</li>
                <li>Yangiliklar</li>
                <li>Kontaktlar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Xaridorlar uchun</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Buyurtma berish</li>
                <li>To'lov usullari</li>
                <li>Yetkazib berish</li>
                <li>Qaytarish</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hamkorlar uchun</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Alifshopda soting</li>
                <li>Yetkazib beruvchilarga</li>
                <li>Hamkorlik dasturi</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kontaktlar</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>+998 71 200 00 00</li>
                <li>support@alifshop.uz</li>
                <li>100000, Toshkent</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
