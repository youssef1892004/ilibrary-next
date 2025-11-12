# استخدم نسخة رسمية من Node
FROM node:22-alpine

# تحديد مجلد العمل داخل الكونتينر
WORKDIR /app

# نسخ ملفات تعريف التبعيات أولاً للاستفادة من التخزين المؤقت لـ Docker
COPY package.json package-lock.json ./

# تثبيت التبعيات
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# بناء المشروع
RUN npm run build

# تعيين المتغير الخاص ببيئة الإنتاج
ENV NODE_ENV production

# تعيين البورت
EXPOSE 3000

# الأمر الذي يبدأ السيرفر
CMD ["npm", "start"]
