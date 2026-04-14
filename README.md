# Portfolio Güncelleme Rehberi

## 📝 Portfolyonu Nasıl Güncellersin?

### 1. Yeni Proje Eklemek

**Dosya:** `index.html`

Projeler bölümünde (`<section id="projects">`) yeni bir proje kartı ekle:

```html
<div class="project-card featured">
    <div class="project-banner">
        <div class="project-icon-large">🎮</div> <!-- İkonunu değiştir -->
        <div class="project-status-badge">
            <span class="status-dot"></span>
            Aktif
        </div>
    </div>
    <div class="project-header">
        <h3>Proje Adı</h3> <!-- Proje adını yaz -->
        <span class="badge">✨ Canlı Proje</span>
    </div>
    <p class="project-description">
        Proje açıklaması buraya gelecek... <!-- Açıklamayı yaz -->
    </p>
    
    <div class="project-features">
        <h4>Özellikler:</h4>
        <ul>
            <li>✓ Özellik 1</li>
            <li>✓ Özellik 2</li>
            <li>✓ Özellik 3</li>
        </ul>
    </div>
    
    <div class="project-tech">
        <span class="tech-tag">🌐 Web App</span>
        <span class="tech-tag">⚡ Full Stack</span>
    </div>
    
    <div class="project-links">
        <a href="https://proje-linkin.com" target="_blank" class="project-link primary-link">
            <span>Siteyi Ziyaret Et</span>
            <span class="arrow">→</span>
        </a>
    </div>
</div>
```

### 2. Profil Fotoğrafını Değiştirmek

1. Yeni fotoğrafını `Portfolio` klasörüne koy
2. Adını `profile.jpg` yap (veya `index.html`'de `<img src="profile.jpg">` kısmını değiştir)

### 3. İletişim Bilgilerini Güncellemek

**Dosya:** `index.html`

İletişim bölümünde (`<section id="contact">`) email ve GitHub linkini değiştir:

```html
<a href="mailto:yeni-email@gmail.com" class="contact-link">
    <span class="icon">✉</span>
    yeni-email@gmail.com
</a>
```

### 4. Hakkımda Bölümünü Güncellemek

**Dosya:** `index.html`

Hakkımda bölümünde (`<section id="about">`) metinleri değiştir:

```html
<p class="intro">
    Buraya yeni tanıtım yazısını yaz...
</p>
```

### 5. Teknolojileri Güncellemek

**Dosya:** `index.html`

Teknolojiler bölümünde yeni teknolojiler ekle:

```html
<div class="skill-tags">
    <span class="tag">Python</span>
    <span class="tag">Yeni Teknoloji</span> <!-- Yeni ekle -->
</div>
```

### 6. Timeline'ı Güncellemek

**Dosya:** `index.html`

Timeline bölümünde yeni bir yıl ekle:

```html
<div class="timeline-item active">
    <div class="timeline-year">2027</div>
    <div class="timeline-content">
        <h4>Başlık</h4>
        <p>Açıklama</p>
    </div>
</div>
```

### 7. Renkleri Değiştirmek

**Dosya:** `style.css`

En üstteki `:root` bölümünde renkleri değiştir:

```css
:root {
    --primary: #3b82f6;  /* Ana renk */
    --primary-dark: #2563eb;  /* Koyu ton */
    --secondary: #60a5fa;  /* İkincil renk */
}
```

## 🚀 Siteyi Yayınlamak (GitHub Pages)

1. GitHub'da yeni bir repo oluştur (örn: `portfolio`)
2. Tüm dosyaları repo'ya yükle
3. GitHub repo ayarlarından **Pages** bölümüne git
4. **Source** olarak `main` branch'i seç
5. Sitenin linki: `https://kullaniciadin.github.io/portfolio`

## 💡 İpuçları

- Her değişiklikten sonra tarayıcıda **F5** ile yenile
- Değişiklikleri test et
- Düzenli olarak GitHub'a yükle (backup için)
- Mobil görünümü de kontrol et

## 📞 Yardım

Bir sorun olursa, Claude Code'a sor: "Portfolio'mda X'i nasıl değiştiririm?"
