document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", img: "1.jpg", price: 20000 },
      { id: 2, name: "Arabica Blend", img: "2.jpg", price: 30000 },
      { id: 3, name: "Primo Passo", img: "1.jpg", price: 35000 },
      { id: 4, name: "Aceh Gayo", img: "2.jpg", price: 20000 },
      { id: 5, name: "Sumatra Mandheling ", img: "1.jpg", price: 30000 }
    ]
  }));
});

// konversi rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
};
