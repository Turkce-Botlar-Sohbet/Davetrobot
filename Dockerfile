#Projede hangi kütüphane kullanıldı.
FROM node:12-slim

#env ortamına bir referans.
ENV NODE_ENV=production

#Projenin kaynak dosyalarını nereye kopyalacak.
WORKDIR /app

#Gerekli dosyaların kopyalanması.
COPY package*.json ./

#package.json daki gerekli kütüphanelerin yüklenmesi için gerekli.
RUN npm install --production

#"." bütün kaynak kodları -> "." workdir de belirttiğim klasöre kopyala.
COPY . .

#docker run çalıştırmak için.
CMD ["bash","start.sh"]
