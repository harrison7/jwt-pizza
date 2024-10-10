import { test, expect } from 'playwright-test-coverage';

test('register and logout', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
    const registerReq = { name: 'Kai Chen', email: 'd@jwt.com', password: 'a' };
    const registerRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(registerReq);
    await route.fulfill({ json: registerRes });

    // const logoutReq = { token: 'abcdef' };
    // const logoutRes = { message: 'logout successful' };
    // expect(route.request().method()).toBe('DELETE');
    // expect(route.request().postDataJSON()).toMatchObject(logoutReq);
    // await route.fulfill({ json: logoutRes });
  });

  await page.goto('/');
  await expect(page.getByText('The web\'s best pizza', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByPlaceholder('Full name').fill('Kai Chen');
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('a');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('The web\'s best pizza', { exact: true })).toBeVisible();
//   await page.getByRole('link', { name: 'Logout' }).click();
});