import LoginPage from "@/pages/login";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

// describe : function untuk mengelompokan test case yang berhubungan dengan suatu komponen
describe("Login Page", () => {
  // it (): fungsi buat nulis/mendefinisikan suatu test case
  it("render halaman login sesuai sfesifikasi", () => {
    // render() : fungsi buat ngerender komponen ke dom virtual
    const page = render(<LoginPage />);
    // expect() : fungsi buat bkin assertion (bandingin jasil yang diharapkan dengan hasil yang sebenarnya/dieksekusi)
    // toMatchSnapshot() : fungsi buat ngerender komponen ke dom virtual
    expect(page).toMatchSnapshot();
  });
});
