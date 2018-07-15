from bs4 import BeautifulSoup
import requests
import iso8601
from webScraping import crt

def get_videos(url):
    list_videos_prop = []
    r = requests.get(url)
    data = r.text
    soup = BeautifulSoup(data, "html.parser")
    # print(soup)
    div = soup.find_all('a'," yt-uix-sessionlink spf-link ")
    # print(div)
    links=[]
    for i in div:
    	link=i['href']
    	if("watch" in link):
    		links.append("https://www.youtube.com"+link)
    # print(links)
    # for i in links:
    for i in links:
        list_videos_prop.append(crt[i])
    # print(crt(links[0]))
# get_videos("https://www.youtube.com/results?search_query=thug+life")
