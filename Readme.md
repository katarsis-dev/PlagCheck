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

# Model Decision Note (16/07/2026)

## Current State
IndoBERT (`indobenchmark/indobert`) → cosine similarity score buruk.

## Model Pengganti
`intfloat/multilingual-e5-base`

**Masalah:** distribusi skor sempit di range **0.7–1.0**, output mentah tidak intuitif dari sisi user.

## Opsi yang Dipertimbangkan

| # | Opsi | Status |
|---|------|--------|
| 1 | Ganti model lain yang lebih sesuai use case | Open |
| 2 | Fine-tune | ~~Dicoret~~ – tidak sejalan dengan roadmap backend/DevOps |
| 3 | **Score framing** – rescale distribusi 0.7–1.0 ke range yang lebih readable sebelum di-serve | ✅ Dipilih |

## Keputusan: Score Framing

Skor mentah 0.7 pada dua teks yang secara semantik tidak mirip akan membingungkan user jika ditampilkan apa adanya → perlu normalisasi persepsi sebelum serving.

> **Next step:** tentukan metode framing
> - **Linear rescale** – min-max normalization dari range 0.7–1.0 ke 0.0–1.0
> - **Threshold-based bucketing** – misal `< 0.82` = "tidak mirip", dst.
>
> Keduanya punya trade-off berbeda, perlu kalibrasi.