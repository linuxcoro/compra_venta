import requests
import os
req = 'https://api.mlab.com/api/1/databases/linuxcoro/collections/articles?apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i'
r = requests.get(req)
if r.status_code == 200:
  decoded = r.json()
  for x in decoded:
    if len(x['descripcion']) == 0:
      os.system('node insertar2.js ' + x['des'].split('/')[-1] + ' ' + x['hash'])
      #os.system('python3 ima.py'+ ' ' + x['hash'])
      os.system('python ima.py'+ ' ' + x['hash'])
