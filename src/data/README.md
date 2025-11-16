# ملف بيانات التلاميذ

هذا الملف يحتوي على قائمة التلاميذ المسموح لهم بالدخول إلى التطبيق.

## كيفية إضافة تلاميذ جدد

قم بتحرير ملف `students.json` وأضف بيانات التلميذ الجديد بالشكل التالي:

```json
{
  "id": 4,
  "name": "اسم التلميذ بالعربية",
  "nameFr": "Nom de l'élève en français",
  "username": "nom_utilisateur",
  "password": "mot_de_passe"
}
```

## مثال

```json
[
  {
    "id": 1,
    "name": "أحمد محمد",
    "nameFr": "Ahmed Mohamed",
    "username": "ahmed123",
    "password": "pass123"
  },
  {
    "id": 2,
    "name": "فاطمة علي",
    "nameFr": "Fatima Ali",
    "username": "fatima456",
    "password": "pass456"
  }
]
```

## ملاحظات مهمة

- يجب أن يكون `id` فريداً لكل تلميذ
- `username` يجب أن يكون فريداً أيضاً
- `password` يمكن أن يكون أي نص (يُنصح باستخدام كلمات مرور قوية)
- بعد تعديل الملف، قد تحتاج إلى مسح localStorage في المتصفح لإعادة تحميل البيانات

## تحديث البيانات من خلال localStorage

يمكن أيضاً تحديث قائمة التلاميذ مباشرة من خلال localStorage في المتصفح باستخدام المفتاح `antigone_students`.

