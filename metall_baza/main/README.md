# Metal Baza — Frontend (Django + Tailwind)

## O'rnatish
1) Ushbu `templates/` va `static/` papkalarni `main/` aplikatsiyangiz ichiga nusxa ko'chiring:
   - `main/templates/...`
   - `main/static/js/app.js`, `main/static/js/calc.js`

2) URLlar (`main/urls.py`):
```py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('<slug:page>/', views.page, name='page'),
]
```

3) Viewlar (`main/views.py`) namunasi:
```py
from django.shortcuts import render
from django.http import Http404

CATEGORIES = [
  {"slug":"pipe","name":"Truba","desc":"Dumaloq va profil trubalar","icon":"<svg></svg>"},
  {"slug":"sheet","name":"List","desc":"List/Plastina","icon":"<svg></svg>"},
  {"slug":"angle","name":"Burchak","desc":"Burchak prokat","icon":"<svg></svg>"},
]

PRODUCTS = [
  {"slug":"pipe-60x3","title":"Quvur 60x3x6m","subtitle":"St3, qora","category":"Truba","price_per_kg":"12 000","icon":"<svg></svg>"},
  {"slug":"sheet-2-1000x2000","title":"List 2mm 1000x2000","subtitle":"Qora","category":"List","price_per_kg":"12 000","icon":"<svg></svg>"},
]

def home(request):
    return render(request, 'home.html', { 'categories': CATEGORIES })

def page(request, page):
    if page=='products':
        q = request.GET.get('q','').lower()
        cat = request.GET.get('category','')
        data = [p for p in PRODUCTS if (q in (p['title']+p['subtitle']).lower()) and (cat=='' or p['category'].lower()==cat.lower())]
        return render(request, 'products.html', { 'products': data, 'categories': CATEGORIES })
    if page=='calc':
        return render(request, 'calc.html')
    if page in ('about','production','logistics','contact'):
        return render(request, f'{page}.html')
    raise Http404()
```

4) `settings.py` da `APP_DIRS=True` va `STATIC_URL='static/'` ekanini tekshiring.

> Eslatma: HTML fayllarni **to'g'ridan‑to'g'ri** brauzerga ochmang (`file://`). Ular Django templating orqali render bo'lishi kerak.
