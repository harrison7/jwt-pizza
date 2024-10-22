import { test, expect } from 'playwright-test-coverage';

test('create franchise', async ({ page }) => {
  await page.route('*/**/api/franchise', async (route) => {
    if (route.request().method() === 'POST') {
      const createReq = { 
        name: "joe", admins: [{email: "mama@jwt.com"}]
      };
      const createRes = { 
        name: 'joe', admins: [{ email: 'mama@jwt.com', id: 4, name: 'pizza franchisee' }], id: 1  
      };

      expect(route.request().postDataJSON()).toMatchObject(createReq);
      await route.fulfill({ json: createRes });
    }
  });

  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByPlaceholder('franchise name').click();
  await page.getByPlaceholder('franchise name').fill('joe');
  await page.getByPlaceholder('franchisee admin email').click();
  await page.getByPlaceholder('franchisee admin email').fill('mama@jwt.com');
  await page.getByRole('button', { name: 'Create' }).click();
});

test('create store', async ({ page }) => {
  await page.route('*/**/api/order/menu', async (route) => {
    const menuRes = [
      { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
      { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: menuRes });
  });

  await page.route('*/**/api/franchise', async (route) => {
    const franchiseRes = [
      {
        id: 2,
        name: 'LotaPizza',
        stores: [
          { id: 4, name: 'Lehi' },
          { id: 5, name: 'Springville' },
          { id: 6, name: 'American Fork' },
        ],
      },
      { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
      { id: 4, name: 'topSpot', stores: [] },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: franchiseRes });
  });

  await page.route('*/**/api/order', async (route) => {
    const orderReq = {
      items: [
        { menuId: 1, description: 'Veggie', price: 0.0038 },
        { menuId: 2, description: 'Pepperoni', price: 0.0042 },
      ],
      storeId: '4',
      franchiseId: 2,
    };
    const orderRes = {
      order: {
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
        ],
        storeId: '4',
        franchiseId: 2,
        id: 23,
      },
      jwt: 'eyJpYXQ',
    };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(orderReq);
    await route.fulfill({ json: orderRes });
  });
  await page.route('*/**/api/franchise/1/store', async (route) => {
    const createReq = { 
      franchiseId: 1, name:"SLC"
    };
    const createRes = { id: 2, franchiseId: 1, name: 'SLC' }
    
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(createReq);
    await route.fulfill({ json: createRes });
  });

  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByPlaceholder('franchise name').click();
  await page.getByPlaceholder('franchise name').fill('joe');
  // await page.getByPlaceholder('franchisee admin email').click();
  // await page.getByPlaceholder('franchisee admin email').fill('mama@jwt.com');
  // await page.getByRole('button', { name: 'Create' }).click();
});