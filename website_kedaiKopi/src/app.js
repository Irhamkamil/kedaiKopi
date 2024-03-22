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

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah item sudah ada di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada item di cart
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
        console.log(this.total);
      } else {
        // jika sudah ada item di cart, cek apakah barang beda atau sama dengan yang di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sama, tambahkan quantity dan total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang ingin di remove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // cari 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika item hanya 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    }
  });
});

// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", (e) => {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data ketika tombol checkout di klik
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  // const message = formatMessage(objData);
  // window.open("http://wa.me/6282126544124?text=" + encodeURIComponent(message));

  // minta token menggunakan fetch/ajax
  try {
    const response = await fetch("php/placeOrder.php", {
      method: "POST",
      body: data
    });
    const token = await response.text();
    console.log(token);
    window.snap.pay(token);
  } catch (err) {
    console.log(err.message);
  }
});

// format pesan whatsapp
// const formatMessage = (obj) => {
//   return `Data Costumer
// Nama: ${obj.name}
// Email: ${obj.email}
// No.Hp: ${obj.phone}

// Data Pesanan:
// ${JSON.parse(obj.items).map(
//   (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
// )}
// Total: ${rupiah(obj.total)}
// Terima Kasih.`;
// };

// konversi rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
};
