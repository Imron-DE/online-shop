import { login } from "@/service/auth";
import axios from "axios";

jest.mock("axios");
describe("Login", () => {
  it("login dengan payload yang sesuai", async () => {
    const payload = { username: "johnd", password: "m38rmF$" };
    await login(payload);

    expect(axios.post).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API}/auth/login`, payload);
  });
  it("login gagal dengan payload yang tidak sesuai", async () => {
    // data dummy
    const payload = { username: "johnd", password: "m38rmF$" };
    // simulasi error
    const error = new Error("Login gagal");
    // mockRejectValue : fungsi buat mereturn error
    axios.post.mockRejectedValue(error);
    // memanggil login
    const res = await login(payload);

    // toEqual : fungsi buat memastikan hasil yang diharapkan sama dengan hasil yang sebenarnya
    expect(res).toEqual({ status: false, error });
  });

  it("cek token jika login berhasil", async () => {
    // data dummy
    const payload = { username: "johnd", password: "m38rmF$" };
    const token = "token";
    // mockResolvedValue : fungsi buat mereturn data
    axios.post.mockResolvedValue({ data: { token } });
    const res = await login(payload);

    expect(res).toEqual({ status: true, token });
  });
});
