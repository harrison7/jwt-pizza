import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group('Login and order - https://pizza.elementary-game.click/', function () {
    // Homepage
    response = http.get('https://pizza.elementary-game.click/', {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.5',
        'cache-control': 'max-age=0',
        'if-modified-since': 'Wed, 30 Oct 2024 02:06:12 GMT',
        'if-none-match': '"9d1051f95741539a54ebf3cf305bbf1f"',
        priority: 'u=0, i',
        'sec-ch-ua': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(8.2)

    const vars = {};

    // Login
    response = http.put(
      'https://pizza-service.elementary-game.click/api/auth',
      '{"email":"a@jwt.com","password":"admin"}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.5',
          'content-type': 'application/json',
          origin: 'https://pizza.elementary-game.click',
          priority: 'u=1, i',
          'sec-ch-ua': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'sec-gpc': '1',
        },
      }
    )
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Login was *not* 200');
    }
    vars.authToken = response.json().token;

    sleep(2.4)

    // Get menu
    response = http.get('https://pizza-service.elementary-game.click/api/order/menu', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.5',
        'content-type': 'application/json',
        'if-none-match': 'W/"1fc-cgG/aqJmHhElGCplQPSmgl2Gwk0"',
        authorization: `Bearer ${vars.authToken}`,
        origin: 'https://pizza.elementary-game.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sec-gpc': '1',
      },
    })

    // Get franchise
    response = http.get('https://pizza-service.elementary-game.click/api/franchise', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.5',
        'content-type': 'application/json',
        'if-none-match': 'W/"40-EPPawbPn0KtYVCL5qBynMCqA1xo"',
        authorization: `Bearer ${vars.authToken}`,
        origin: 'https://pizza.elementary-game.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sec-gpc': '1',
      },
    })
    sleep(5)

    // Purchase pizza
    response = http.post(
      'https://pizza-service.elementary-game.click/api/order',
      '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.5',
          'content-type': 'application/json',
          authorization: `Bearer ${vars.authToken}`,
          origin: 'https://pizza.elementary-game.click',
          priority: 'u=1, i',
          'sec-ch-ua': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'sec-gpc': '1',
        },
      }
    )
    sleep(1.8)

    // Verify pizza
    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      '{"jwt":"eyJpYXQiOjE3MzM5NjA5OTIsImV4cCI6MTczNDA0NzM5MiwiaXNzIjoiY3MzMjkuY2xpY2siLCJhbGciOiJSUzI1NiIsImtpZCI6IjE0bk5YT21jaWt6emlWZWNIcWE1UmMzOENPM1BVSmJuT2MzazJJdEtDZlEifQ.eyJ2ZW5kb3IiOnsiaWQiOiJoY2FzcGVyMSIsIm5hbWUiOiJIYXJyaXNvbiBDYXNwZXIifSwiZGluZXIiOnsiaWQiOjEsIm5hbWUiOiLluLjnlKjlkI3lrZciLCJlbWFpbCI6ImFAand0LmNvbSJ9LCJvcmRlciI6eyJpdGVtcyI6W3sibWVudUlkIjoxLCJkZXNjcmlwdGlvbiI6IlZlZ2dpZSIsInByaWNlIjowLjAwMzh9XSwic3RvcmVJZCI6IjEiLCJmcmFuY2hpc2VJZCI6MSwiaWQiOjQ3fX0.sdzgkLWrMrLdis57t4T4daiTMmPWjRB8d_d2nQp5F2s7It3cQlp-QghvtMlw1_wxIdWJa55PK0EMc9TPNGH0WLOpcim27peGPzaHTofBmPIOMIWZdIPNLVvll5q-3jlFI3zvkPxMjDNtJ6bKIBjA0xYOBBVdSwvFqUcWBO1tWD6HSD8Nr6YzJIpEVzpxk_lL6fXcb06SDMGE5z5rtaFBiooR6Q7iARGC2gD8LPnVbKPQA6D6LPb7nz_6c0XvPwGVIFMh1gM10UiXAfyMld9RnDia33lvP0klkesVv1Ly9nmEMQmojCg9snyypcE9ErMswoUttBnCqjB-VBHpx9AHUDqYDVFR-LJVjWllZ4ns12f6wnCKtCjt-jX51ThH3wHobMoWDKcaT9mIaIkg8Y16BgdLDC-wzeNnvzL6OlhPYHan6d7qGS0eIZVKC08QSp3F3TnLEZR1-LHE0xmDdHTXX3rXN5-YKAUFnXIfu_vxVlo7TmV3aYDl8kS33WdfSh10TIlWZLYbZBk6xwsHcvUakU83QIQ2vED9MsWM5iyJoV6l0wCpnbcAZJMXvmhQ6VxJxK01vP3V6h8e_i1RAxN4dM_pMI2TewDm7nPEbEpSmojik6mN4lvDOlOYlw8N_sqjdRxOnQ_z9iDoEAb7njgJjuduJdCzFseZ9zp6tW5BOZY"}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.5',
          'content-type': 'application/json',
          authorization: `Bearer ${vars.authToken}`,
          origin: 'https://pizza.elementary-game.click',
          priority: 'u=1, i',
          'sec-ch-ua': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'sec-gpc': '1',
        },
      }
    )
  })
}