# دليل نشر التطبيق على GitHub

## الخطوات:

### 1. إنشاء Repository جديد على GitHub

1. اذهب إلى [GitHub](https://github.com)
2. اضغط على زر **"New"** أو **"+"** في الأعلى
3. اختر **"New repository"**
4. املأ المعلومات:
   - **Repository name**: `antigone-app` (أو أي اسم تريده)
   - **Description**: تطبيق تعليمي لدراسة مسرحية أنتيجون
   - اختر **Public** أو **Private** حسب رغبتك
   - **لا** تضع علامة على "Initialize this repository with a README"
5. اضغط **"Create repository"**

### 2. ربط المشروع المحلي بـ GitHub

بعد إنشاء الـ repository، ستظهر لك تعليمات. قم بتنفيذ الأوامر التالية:

```bash
# إضافة remote repository
git remote add origin https://github.com/YOUR_USERNAME/antigone-app.git

# تغيير اسم الفرع إلى main (إذا كان GitHub يستخدم main)
git branch -M main

# رفع الملفات
git push -u origin main
```

**ملاحظة**: استبدل `YOUR_USERNAME` باسم المستخدم الخاص بك على GitHub

### 3. إذا كان لديك بالفعل repository على GitHub

إذا كان لديك repository موجود بالفعل:

```bash
# إضافة remote
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# رفع الملفات
git push -u origin master
```

### 4. للمستقبل - رفع التحديثات

عندما تقوم بتعديلات جديدة:

```bash
# إضافة التغييرات
git add .

# عمل commit
git commit -m "وصف التغييرات"

# رفع التحديثات
git push
```

## نصائح مهمة:

1. **لا ترفع ملفات حساسة**: تأكد من أن `.env` وملفات البيانات الحساسة في `.gitignore`
2. **استخدم commit messages واضحة**: اكتب وصفاً واضحاً للتغييرات
3. **راجع الملفات قبل الرفع**: استخدم `git status` لرؤية الملفات التي ستُرفع

## إذا واجهت مشاكل:

- **خطأ في المصادقة**: قد تحتاج إلى إعداد SSH keys أو استخدام Personal Access Token
- **رفض الرفع**: تأكد من أن لديك صلاحيات الكتابة على الـ repository

