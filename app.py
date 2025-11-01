# Gerekli kütüphaneleri içe aktarıyoruz
from flask import Flask, jsonify, request, send_file  # Flask API için gerekli
from flask_cors import CORS                          # CORS politikası için
import json                                           # JSON dosyalarıyla çalışma
import os                                             # Dosya işlemleri için
import uuid                                           # Benzersiz dosya isimleri üretmek için
from gtts import gTTS                                 # Google Text-to-Speech için

# Flask uygulamasını oluşturuyoruz
app = Flask(__name__)

# CORS'u aktif hale getiriyoruz (frontend ile haberleşebilmesi için)
CORS(app)

# JSON dosyasındaki tüm metinleri belleğe yüklüyoruz
with open("data/texts.json", "r", encoding="utf-8") as f:
    all_texts = json.load(f)

# ----------------------------- METİN GETİRME ---------------------------------
# Seçilen seviye ve tür filtrelerine göre metinleri döner
@app.route("/get_texts", methods=["GET"])
def get_texts():
    level = request.args.get("level")         # URL'den seviye (A1, A2, ...) bilgisi al
    text_type = request.args.get("type")      # URL'den tür (story, dialogue, ...) bilgisi al

    # Gelen verileri temizliyoruz (boşluklardan arındır ve büyük-küçük duyarlılığı azalt)
    level = level.strip().upper() if level else None
    text_type = text_type.strip().lower() if text_type else None

    # Metinleri filtrele: sadece seçilen seviye ve türde olanları al
    filtered = [
        t for t in all_texts
        if (not level or t["level"].upper() == level) and (not text_type or t["type"].lower() == text_type)
    ]

    # Filtrelenen metinleri JSON olarak döndür
    return jsonify(filtered)

# --------------------------- CLOZE (BOŞLUK DOLDURMA) --------------------------
# Seviyeye ve türe göre uygun boşluk doldurma sorusunu verir
@app.route("/get_cloze", methods=["GET"])
def get_cloze():
    level = request.args.get("level")
    text_type = request.args.get("type")

    # Ön tanımlı cloze test örnekleri (geliştikçe diğer seviyeler eklenebilir)
    cloze_samples = {
        "A1": {
            "story": {
                "title": "Tom’s Busy Sunday - Cloze Test",
                "cloze_text": "Tom wakes up at _____ a.m. on Sunday. He eats _____ with his family and then goes to the supermarket.",
                "answers": ["8", "breakfast"]
            },
            "dialogue": {
                "title": "Simple Dialogue Cloze",
                "cloze_text": "A: How are you? B: I'm _____. Thank you!",
                "answers": ["fine"]
            },
            "conversation": {
                "title": "Simple Conversation Cloze",
                "cloze_text": "Person 1: What's your name? Person 2: My name is _____.",
                "answers": ["Tom"]
            },
            "news": {
                "title": "News Cloze Example",
                "cloze_text": "The weather is _____ today with a high of 25 degrees.",
                "answers": ["sunny"]
            }
        }
        # Diğer seviyeler eklenebilir
    }

    level = level.strip().upper() if level else None
    text_type = text_type.strip().lower() if text_type else None

    # İlgili seviye ve türe göre cloze testi döndür
    if level in cloze_samples and text_type in cloze_samples[level]:
        return jsonify(cloze_samples[level][text_type])
    else:
        # Uygun test bulunamazsa hata döndür
        return jsonify({"error": "Cloze test not found for this level and type"}), 404

# --------------------------- SES ÜRETİMİ (TTS) -------------------------------
# Kullanıcıdan gelen metni sese çevirerek frontend'e gönderir
@app.route("/tts", methods=["POST"])
def generate_tts():
    data = request.get_json()                # JSON formatında veri al
    text = data.get("text")                  # Metni al

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # gTTS ile metni sese dönüştür
    tts = gTTS(text=text, lang="en")

    # Her ses dosyasına benzersiz bir isim veriyoruz
    filename = f"tts_{uuid.uuid4().hex}.mp3"
    filepath = os.path.join("data", filename)

    # Ses dosyasını kaydet
    tts.save(filepath)

    # Dosyayı frontend'e gönder (audio/mpeg türünde)
    return send_file(filepath, mimetype="audio/mpeg", as_attachment=False)

# --------------------------- SUNUCUYU BAŞLATMA -------------------------------
if __name__ == "__main__":
    app.run(debug=True)  # Debug modda Flask sunucusunu başlat
