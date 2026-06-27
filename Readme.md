# 🤖 PlagCheck ML Service – IndoBERT Lite

> Branch: `dev/bert_model`  
> Status: **🚧 Masih dalam tahap progress (eksperimen & pengembangan)**

---

## 📌 Tentang Branch Ini

Branch ini berisi **API service** yang berperan sebagai **inference engine** untuk kebutuhan pengecekan kemiripan teks (plagiasi / similaritas) pada aplikasi utama **PlagCheck**.

Service ini menggunakan model **pre-trained** dari Hugging Face:  
👉 [`indobenchmark/indobert-lite-base-p1`](https://huggingface.co/indobenchmark/indobert-lite-base-p1)

Model tersebut adalah versi **ringan** dari IndoBERT, tetap menghasilkan embedding 768 dimensi dengan komputasi yang lebih hemat – cocok untuk eksplorasi di perangkat terbatas.

---

## 🧠 Kenapa Pakai Pre-trained Model?

Karena tujuan saya saat ini **bukan membuat model dari nol**, melainkan:

- ✅ Memahami alur **serving model ML** dalam arsitektur backend (Express ↔ FastAPI)
- ✅ Menyediakan use case riil untuk implementasi **caching, rate limiting, & message broker**
- ✅ Belajar cara **memanggil model dari service lain** dan mengolah embedding menjadi similarity score

> 🔁 Membuat model dari awal membutuhkan waktu + resource yang tidak worth untuk konteks eksplorasi saya sekarang.  
> Nanti kalau sudah deep di MLOps, baru akan revisit ke fine-tuning atau training custom.

---

## 📦 Endpoint yang Disediakan (Progress)

Saat ini service ini memiliki **satu endpoint utama** yang masih dalam proses penyempurnaan:

### 🔹 `POST /compare`

> **Rencana:**  
> Menerima **dua teks** dalam body request, lalu mengembalikan skor kemiripan (0–1) berdasarkan cosine similarity dari embedding kedua teks.

**Contoh request (nanti):**
```json
{
  "text1": "Saya belajar backend dengan FastAPI",
  "text2": "FastAPI digunakan untuk belajar backend"
}