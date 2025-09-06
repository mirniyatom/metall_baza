from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound
from django.urls import reverse

main_dict = {
    'main' : 'Bosh sahifa',
    'products': 'Mahsulotlar',
    'calc': 'Online kolkulyator',
    'about': 'Kompaniya haqida',
    'production': 'Ishlab chiqaradigan narsalari haqida',
    'logistics': 'Dostavka haqida',
    'contact': 'nomer pocha ijtimoiy tarmoq adress'
}

def get_main(request, main):
    desc = main_dict.get(main)
    if desc:
        return HttpResponse(desc)
    else:
        return HttpResponseNotFound(f'{main} not found')