import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Mail,
  Phone,
  Search,
  ShoppingCart,
  Heart,
  ChevronDown,
  Menu,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import md5 from "md5"; // Gravatar için email hashleme
import { logoutUser } from "../actions/clientAction";
import { Button } from "@/components/ui/button";
import { fetchCategories } from "../actions/productsAction"; // Import fetchCategories action

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // Açılır menü durumu (kullanılmıyor şu an ama dropdown için kullanılabilir)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobil menü durumu
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false); // Mağaza dropdown durumu
  const dispatch = useDispatch();

  // Redux'tan kullanıcı ve kategori bilgilerini al
  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);
  const fetchState = useSelector((state) => state.product.fetchState);

  // Kategorileri cinsiyete göre filtrele
  const kadinKategoriler = categories
    ? categories.filter((category) => category.gender === "k")
    : [];
  const erkekKategoriler = categories
    ? categories.filter((category) => category.gender === "e")
    : [];

  // Kullanıcı giriş yapmış mı kontrol et
  const isAuthenticated = user && user.email; // Eğer user objesi ve email varsa giriş yapmış sayılır

  // Kullanıcı gravatar URL'sini oluştur
  const gravatarUrl = isAuthenticated
    ? `https://www.gravatar.com/avatar/${md5(user.email)}?d=mp`
    : null;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleShopDropdown = () => {
    setIsShopDropdownOpen(!isShopDropdownOpen);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Boş string kontrolü
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    if (fetchState === "NOT_FETCHED" || categories.length === 0) {
      // Fetch categories if not already fetched or categories are empty
      dispatch(fetchCategories());
    }
  }, [dispatch, fetchState, categories.length]); // Depend on dispatch and fetchState and categories.length

  //Bileşenin UI tanımlayan jsx kodları buradan sonra başlar
  return (
    <header>
      {/* Üst Bilgi barı */}
      <div className="hidden md:flex bg-[#252B42] text-white justify-around items-center h-[58px]">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <span className="m-2">
              <Phone size={16} />
            </span>
            <span className="font-bold text-[14px]">(232) 535-3535</span>
          </div>
          <div className="flex items-center">
            <span className="m-2">
              <Mail size={16} />
            </span>
            <span className="font-bold text-[14px]">trendigo@gmail.com</span>
          </div>
        </div>
        <div className="font-bold text-[14px] text-center">
          <h6>Bizi takip edin ve %80 indirim kazanma şansını yakalayın</h6>
        </div>
        <div className="flex items-center gap-3">
          <h6 className="font-bold text-[14px]">Takip Et :</h6>
          <Link to="/" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faInstagram} className="text-[16px]" />
          </Link>
          <Link to="/" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faYoutube} className="text-[16px]" />
          </Link>
          <Link to="/" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faFacebook} className="text-[16px]" />
          </Link>
          <Link to="/" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faTwitter} className="text-[16px]" />
          </Link>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="bg-white hidden md:flex flex-row justify-around items-center h-[78px]">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-black transition">
            TrendiGo
          </Link>
        </div>
        <nav className="text-[#737373] flex space-x-6 font-semibold items-center">
          <Link to="/" className="hover:text-black transition">
            Ana Sayfa
          </Link>
          {/* Mağaza Dropdown */}
          <div className="relative group">
            <button
              className="hover:text-black transition flex items-center"
              onClick={toggleShopDropdown}
            >
              Mağaza <ChevronDown size={16} className="ml-1" />
            </button>
            {/* Dropdown İçeriği */}
            <div
              className={`absolute hidden group-hover:block mt-2 w-96 bg-white border border-gray-200 rounded shadow-md z-10 ${
                isShopDropdownOpen ? "block" : "hidden"
              }`}
            >
              {fetchState === "FETCHING" ? (
                <div className="px-4 py-2 text-gray-800">
                  Kategoriler yükleniyor...
                </div>
              ) : fetchState === "FAILED" ? (
                <div className="px-4 py-2 text-red-500">
                  Kategorileri yüklenirken hata oluştu.
                </div>
              ) : (
                <div className="flex">
                  {" "}
                  {/* Flex Container */}
                  {/* Kadın Kategoriler Bölümü */}
                  {kadinKategoriler.length > 0 && (
                    <div className="w-1/2 p-4">
                      <div className="font-bold text-gray-800 mb-2">Kadın</div>
                      {kadinKategoriler.map((category) => (
                        <Link
                          key={category.id}
                          to={`/shop/kadin/${category.title.toLowerCase()}/${
                            category.id
                          }`}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2" // Flexbox ve boşluk EKLENDİ
                        >
                          <img
                            src={category.img}
                            alt={category.title}
                            className="w-6 h-6 rounded object-cover" // Resim boyutları ve stil EKLENDİ
                          />
                          <span>{capitalizeFirstLetter(category.title)}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {/* Erkek Kategoriler Bölümü */}
                  {erkekKategoriler.length > 0 && (
                    <div className="w-1/2 p-4 border-l border-gray-200">
                      <div className="font-bold text-gray-800 mb-2">Erkek</div>
                      {erkekKategoriler.map((category) => (
                        <Link
                          key={category.id}
                          to={`/shop/erkek/${category.title.toLowerCase()}/${
                            category.id
                          }`}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2" // Flexbox ve boşluk EKLENDİ
                        >
                          <img
                            src={category.img}
                            alt={category.title}
                            className="w-6 h-6 rounded object-cover" // Resim boyutları ve stil EKLENDİ
                          />
                          <span>{capitalizeFirstLetter(category.title)}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <Link to="/about" className="hover:text-black transition">
            Hakkımızda
          </Link>
          <Link to="/blog" className="hover:text-black transition">
            Blog
          </Link>
          <Link to="/contact" className="hover:text-black transition">
            İletişim
          </Link>
          <Link to="/pages" className="hover:text-black transition">
            Sayfalar
          </Link>
        </nav>

        {/* Kullanıcı Girişi Alanı */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <img
                src={gravatarUrl}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-[#23A6F0] font-bold text-[14px]">
                {user.name || "Misafir"}
              </span>
              <button
                onClick={() => dispatch(logoutUser())}
                className="text-red-500 font-bold text-[14px] ml-2 hover:text-red-700"
              >
                Çıkış Yap
              </button>
              <Button variant="secondary">Deneme Butonu</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-[#23A6F0]">
              <FontAwesomeIcon icon={faUser} className="text-[12px]" />
              <Link to="/login" className="font-bold text-[14px]">
                Giriş Yap
              </Link>
              <span className="font-bold text-[14px]">/</span>
              <Link to="/signup" className="font-bold text-[14px]">
                Kayıt Ol
              </Link>
            </div>
          )}
          <div className="flex items-center space-x-3 text-[#23A6F0]">
            <Search size={16} className="cursor-pointer" />
            <ShoppingCart size={16} className="cursor-pointer" />
            <Heart size={16} className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Mobil Navbar */}
      <div className="bg-white md:hidden flex justify-between items-center h-[78px] px-4">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-black transition">
            TrendiGo
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <img
              src={gravatarUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <Link to="/login">
              <User />
            </Link>
          )}
          <Search size={20} className="cursor-pointer" />
          <ShoppingCart size={20} className="cursor-pointer" />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} className="text-[#737373] cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Mobil Menü (Açılıp kapanıyor) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-lg flex flex-col items-center text-center p-4 space-y-4">
          <Link to="/" className="hover:text-black transition">
            Ana Sayfa
          </Link>
          <Link to="/shop" className="hover:text-black transition">
            Mağaza
          </Link>
          <Link to="/about" className="hover:text-black transition">
            Hakkımızda
          </Link>
          <Link to="/blog" className="hover:text-black transition">
            Blog
          </Link>
          <Link to="/contact" className="hover:text-black transition">
            İletişim
          </Link>
          <Link to="/pages" className="hover:text-black transition">
            Sayfalar
          </Link>
        </div>
      )}
    </header>
  );
}
