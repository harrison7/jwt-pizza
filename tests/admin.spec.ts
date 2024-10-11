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
  await page.route('*/**/api/franchise', async (route) => {
    if (route.request().method() === 'GET') {
      const createRes = [{ id: 1, name: 'pizzaPocket', stores: [{ id: 1, name: 'SLC' }] }]
      expect(route.request().method()).toBe('GET');
      // expect(route.request().postDataJSON()).toMatchObject(createReq);
      await route.fulfill({ json: createRes });
    }
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