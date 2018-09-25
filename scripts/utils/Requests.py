import hashlib
import os
import requests
from os.path import basename, join

def baseurl(url):
    from urllib.parse import urlparse
    o = urlparse(url)
    return o.scheme + '://' + o.netloc

class Requests():
    def __init__(self, cache_path='cache', verbose=False):
        self.cache_path = cache_path
        self.verbose = verbose
        self.prev_url = None
        if not os.path.exists(cache_path):
            os.makedirs(cache_path)
    def get(self, url, params={}, force=False, encoding='utf-8'):
        url = self.extend(url)
        self.prev_url = url
        if not force and self.check_cache(url):
            if self.verbose:
                print('cache', url)
            return self.from_cache(url)
        if self.verbose:
            print('download', url)
        res = requests.get(url, **params)
        res.encoding = encoding
        text = res.text
        self.to_cache(url, text)
        return text
    def extend(self, url):
        if url.startswith('/'):
            return baseurl(self.prev_url) + url
        return url
    def hash(self, text):
        return hashlib.sha256(text.encode('utf-8')).hexdigest()
    def cache_file(self, url):
        return join(self.cache_path, self.hash(url) + '.html')
    def check_cache(self, url):
        return os.path.exists(self.cache_file(url))
    def to_cache(self, url, text):
        with open(self.cache_file(url), 'w', encoding='utf-8') as f:
            f.write(text)
    def from_cache(self, url):
        with open(self.cache_file(url), 'r', encoding='utf-8') as f:
            text = f.read()
        return text
    def download(self, url, path):
        url = self.extend(url)
        self.prev_url = url
        if not os.path.exists(path):
            os.makedirs(path)
        filename = join(path, basename(url))
        if os.path.exists(filename):
            return
        print('download a file')
        res = requests.get(url, stream=True)
        if res.status_code == 200:
            with open(filename, 'wb') as f:
                f.write(res.content)
        else:
            print('Response status code:', res.status_code)