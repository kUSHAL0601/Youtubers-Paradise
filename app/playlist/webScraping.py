from bs4 import BeautifulSoup
import requests
import sys
import iso8601

def find_title(soup):
    title = soup.find('title')
    return title

def get_date(soup):
    date = soup.find("strong", {"class" : "watch-time-text"})
    return date

def get_description(soup):
    div_info =  soup.find('div', id='watch-description-text')
    return div_info

def get_profileimg(soup):
    div_img =  soup.find('div', id='watch7-user-header')
    imgspan = div_img.find("span", {"class" : "yt-thumb-clip"})
    imglink = imgspan.find('img')['data-thumb']
    return imglink

def get_profile(soup):
    div_profile =  soup.find('div', {"class" : "yt-user-info"})
    profilelink = div_profile.find("a", {"class" : "yt-uix-sessionlink spf-link "})
    link = "https://www.youtube.com" + str(profilelink['href'])
    print ("link:",link)
    return link

def get_name(soup):
    div_profile =  soup.find('div', {"class" : "yt-user-info"})
    profilename = div_profile.find("a", {"class" : "yt-uix-sessionlink spf-link "})
    name = profilename.text
    print ("name",name)
    return name

def crt(url):
    r = requests.get(url)
    data = r.text
    soup = BeautifulSoup(data, "html.parser")
    div =  soup.find('div', id='watch-headline-title')
    dic = {}
    dic['title'] = str(find_title(soup))
    dic['date'] = str(get_date(soup))
    dic['desc'] = str(get_description(soup))
    dic['profile_img'] = str(get_profileimg(soup))
    dic['profile'] = str(get_profile(soup))
    dic['name'] = str(get_name(soup))
    return dic
