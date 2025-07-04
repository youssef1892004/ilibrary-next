# استخدم نسخة رسمية من Node
FROM node:22-alpine

# تحديد مجلد العمل داخل الكونتينر
WORKDIR /app

# نسخ ملفات المشروع (باستثناء ما في .dockerignore)
COPY . .

# تثبيت التبعيات
RUN npm install

# بناء المشروع
RUN npm run build

# تعيين المتغير الخاص ببيئة الإنتاج
ENV NODE_ENV production

# تعيين البورت
EXPOSE 3000

# الأمر الذي يبدأ السيرفر
CMD ["npm", "start"]
