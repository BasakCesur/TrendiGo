import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/clientAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(loginUser(data.email, data.password, data.rememberMe));
      toast.success("Başarıyla giriş yaptınız!");
      navigate(-1); // Önceki sayfaya yönlendir
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold">Giriş Yap</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-4 border rounded-md"
      >
        <input
          {...register("email", {
            required: "E-posta gerekli!",
            pattern: /^\S+@\S+$/i,
          })}
          placeholder="E-posta"
          className="border p-2 w-full mb-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password", { required: "Şifre gerekli!" })}
          placeholder="Şifre"
          className="border p-2 w-full mb-2"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <div className="flex items-center mb-2">
          <input type="checkbox" {...register("rememberMe")} className="mr-2" />
          <label>Beni Hatırla</label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full mt-2"
          disabled={loading}
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
};

export default Login;
